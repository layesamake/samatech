// components/Portfolio.tsx
'use client';

import { useState } from 'react';
import type { Realisation, RealisationCategory } from '@/lib/realisations';
import PortfolioCard from './PortfolioCard';
import PortfolioFilters from './PortfolioFilters';

type FilterType = RealisationCategory | 'all';

export default function Portfolio({ realisations, lang }: { realisations: Realisation[]; lang: string }) {
  const [selectedType, setSelectedType] = useState<FilterType>('all');

  const filteredItems = selectedType === 'all'
    ? realisations
    : realisations.filter(item => item.category === selectedType);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Réalisations</h2>
        <p className="text-gray-600 mb-8">
          Sites web, applications et logiciels conçus pour nos clients en Afrique, en Europe et en Asie
        </p>

        <PortfolioFilters selectedType={selectedType} onSelect={setSelectedType} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredItems.map(item => (
            <PortfolioCard key={item.slug} item={item} lang={lang} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun projet trouvé pour ce filtre</p>
          </div>
        )}
      </div>
    </section>
  );
}
