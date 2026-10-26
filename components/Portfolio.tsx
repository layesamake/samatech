// components/Portfolio.tsx
'use client';

import { useState } from 'react';
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio';
import PortfolioCard from './PortfolioCard';
import PortfolioFilters from './PortfolioFilters';

type FilterType = 'application' | 'website' | 'training' | 'automation' | 'all';

export default function Portfolio() {
  const [selectedType, setSelectedType] = useState<FilterType>('all');

  const filteredItems = selectedType === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.type === selectedType);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
        <p className="text-gray-600 mb-8">Découvrez nos réalisations pour des clients à travers le monde</p>

        <PortfolioFilters selectedType={selectedType} onSelect={setSelectedType} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredItems.map(item => (
            <PortfolioCard key={item.id} item={item} />
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
