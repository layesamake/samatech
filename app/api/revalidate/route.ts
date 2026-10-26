// app/api/revalidate/route.ts
// Appelée par l'extension WordPress après chaque modification d'une réalisation :
// le site affiche les changements tout de suite au lieu d'attendre la mise à jour horaire.
import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'node:crypto';

function sameSecret(received: string, expected: string) {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  const received = request.headers.get('x-revalidate-secret') ?? '';

  if (!expected || !sameSecret(received, expected)) {
    return Response.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  revalidatePath('/', 'layout');
  return Response.json({ ok: true, revalidated: new Date().toISOString() });
}
