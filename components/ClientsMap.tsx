// components/ClientsMap.tsx
'use client';

export default function ClientsMap() {
  // Données des pays des clients (à enrichir)
  const clientCountries = [
    { country: 'Sénégal', code: 'SN', count: 15 },
    { country: 'Maroc', code: 'MA', count: 8 },
    { country: 'Côte d\'Ivoire', code: 'CI', count: 5 },
    { country: 'Burkina Faso', code: 'BF', count: 3 },
    { country: 'Mali', code: 'ML', count: 2 },
    { country: 'Belgique', code: 'BE', count: 4 },
    { country: 'France', code: 'FR', count: 6 },
  ];

  return (
    <section id="clients-map" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Clients à Travers le Monde</h2>
        <p className="text-gray-600 mb-12">Présents dans plusieurs pays d'Afrique et d'Europe</p>

        {/* Grille des pays */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {clientCountries.map(client => (
            <div
              key={client.code}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="font-bold text-gray-900 mb-1">{client.country}</h3>
              <p className="text-sm text-blue-600 font-semibold">{client.count} projets</p>
            </div>
          ))}
        </div>

        {/* Alternative SVG map (future) */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Carte interactive détaillée à venir 🗺️</p>
        </div>
      </div>
    </section>
  );
}
