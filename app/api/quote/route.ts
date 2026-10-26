// app/api/quote/route.ts
import nodemailer from 'nodemailer';

const SERVICES: Record<string, string> = {
  web: 'Création Web',
  app: 'Application Mobile/Web',
  automation: 'Automatisation de Processus',
  training: 'Formation',
  other: 'Autre',
  contact: 'Message de contact',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limite simple par IP : 5 demandes par tranche de 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function field(data: Record<string, unknown>, key: string, max: number) {
  const value = data[key];
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  // Champ invisible : seuls les robots le remplissent
  if (field(data, 'website', 200)) {
    return Response.json({ ok: true });
  }

  const name = field(data, 'name', 120);
  const email = field(data, 'email', 200);
  const company = field(data, 'company', 120);
  const service = field(data, 'service', 40);
  const message = field(data, 'message', 5000);

  if (!name || !EMAIL_RE.test(email) || !SERVICES[service] || !message) {
    return Response.json(
      { error: 'Merci de remplir correctement les champs obligatoires.' },
      { status: 400 },
    );
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'inconnue';
  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Trop de demandes. Merci de réessayer dans quelques minutes.' },
      { status: 429 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('Formulaire de devis : SMTP_USER / SMTP_PASS non configurés');
    return Response.json(
      { error: "L'envoi est momentanément indisponible. Contactez-nous par e-mail." },
      { status: 500 },
    );
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.hostinger.com',
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ['Nom', name],
    ['E-mail', email],
    ['Entreprise', company || '—'],
    ['Service', SERVICES[service]],
  ];

  try {
    await transporter.sendMail({
      from: `"Site Samatech" <${SMTP_USER}>`,
      to: QUOTE_TO || SMTP_USER,
      replyTo: { name, address: email },
      subject:
        service === 'contact'
          ? `Message de contact — ${name}`
          : `Demande de devis : ${SERVICES[service]} — ${name}`,
      text: [...rows.map(([k, v]) => `${k} : ${v}`), '', message].join('\n'),
      html:
        '<table cellpadding="4">' +
        rows
          .map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`)
          .join('') +
        '</table>' +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch (error) {
    console.error('Formulaire de devis : échec de l’envoi', error);
    return Response.json(
      { error: "L'envoi a échoué. Merci de réessayer ou de nous écrire directement." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
