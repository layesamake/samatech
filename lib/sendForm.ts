// lib/sendForm.ts
// Envoie un formulaire à /api/quote. Renvoie un message d'erreur, ou null si tout s'est bien passé.
export async function sendForm(form: HTMLFormElement): Promise<string | null> {
  try {
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (response.ok) return null;

    const result = await response.json().catch(() => ({}));
    return result.error || "L'envoi a échoué. Merci de réessayer.";
  } catch {
    return 'Connexion impossible. Vérifiez votre réseau et réessayez.';
  }
}
