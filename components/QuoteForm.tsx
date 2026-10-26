// components/QuoteForm.tsx
'use client';

import { useState } from 'react';
import { sendForm } from '@/lib/sendForm';

export default function QuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const sendError = await sendForm(e.currentTarget);
    if (sendError) {
      setError(sendError);
    } else {
      setSubmitted(true);
    }
    setIsLoading(false);
  };

  return (
    <section id="quote" className="py-16 md:py-24 bg-blue-600 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Demander un Devis</h2>
        <p className="text-blue-100 mb-8">Décrivez votre projet et nous vous recontacterons rapidement</p>

        {submitted ? (
          <div className="bg-blue-700 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">✓</div>
            <p className="font-semibold mb-2">Merci ! Votre demande a été envoyée.</p>
            <p className="text-blue-100">Nous vous recontacterons dans les 24 heures.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Piège à robots : invisible pour les visiteurs */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Site web</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded text-gray-900"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded text-gray-900"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Entreprise
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full px-4 py-3 rounded text-gray-900"
                placeholder="Votre entreprise"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium mb-1">
                Type de service *
              </label>
              <select
                id="service"
                name="service"
                required
                className="w-full px-4 py-3 rounded text-gray-900"
              >
                <option value="">Sélectionner...</option>
                <option value="web">Création Web</option>
                <option value="app">Application Mobile/Web</option>
                <option value="automation">Automatisation de Processus</option>
                <option value="training">Formation</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Détails du projet *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded text-gray-900"
                placeholder="Décrivez votre projet, vos besoins, votre budget..."
              />
            </div>

            {error && (
              <p role="alert" className="bg-red-50 text-red-700 rounded px-4 py-3 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-600 font-bold py-3 rounded hover:bg-blue-50 transition disabled:opacity-50"
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>

            <p className="text-sm text-blue-100 text-center">
              * Champs obligatoires
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
