'use client';

import { useState } from 'react';
import { sendForm } from '@/lib/sendForm';

export default function Contact() {
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
    <section id="contact" className="py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nous Contacter</h2>

        <div className="bg-gray-50 rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600">
                Thiès, Quartier Mbambara<br />
                Rue MB36, Villa Numéro 33<br />
                Sénégal
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:contact@samatech.cloud" className="text-blue-600 hover:underline">
                  contact@samatech.cloud
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600">
                En cours de mise à jour
              </p>
            </div>

            {submitted ? (
              <p className="mt-8 bg-green-50 text-green-800 rounded p-4 text-center font-semibold">
                Merci ! Votre message a été envoyé.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input type="hidden" name="service" value="contact" />
                {/* Piège à robots : invisible pour les visiteurs */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  aria-label="Votre nom"
                  placeholder="Votre nom"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  required
                  aria-label="Votre email"
                  placeholder="Votre email"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <textarea
                  name="message"
                  required
                  aria-label="Votre message"
                  placeholder="Votre message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                {error && (
                  <p role="alert" className="bg-red-50 text-red-700 rounded px-4 py-3 text-sm">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
