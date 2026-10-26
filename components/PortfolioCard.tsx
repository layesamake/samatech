// components/PortfolioCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolio';

const typeLabels = {
  application: 'Application',
  website: 'Site Web',
  training: 'Formation',
  automation: 'Automatisation',
};

const typeColors = {
  application: 'bg-blue-100 text-blue-800',
  website: 'bg-green-100 text-green-800',
  training: 'bg-purple-100 text-purple-800',
  automation: 'bg-orange-100 text-orange-800',
};

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {/* Image */}
      {item.screenshots.length > 0 && (
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <Image
            src={item.screenshots[0].url}
            alt={item.screenshots[0].alt}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Contenu */}
      <div className="p-4">
        {/* Type & Pays */}
        <div className="flex gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${typeColors[item.type]}`}>
            {typeLabels[item.type]}
          </span>
          <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded">
            🌍 {item.country}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

        {/* Technos */}
        {item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.technologies.slice(0, 2).map(tech => (
              <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {tech}
              </span>
            ))}
            {item.technologies.length > 2 && (
              <span className="text-xs text-gray-500">+{item.technologies.length - 2}</span>
            )}
          </div>
        )}

        {/* Lien */}
        {item.link && (
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            Voir le projet →
          </Link>
        )}
      </div>
    </article>
  );
}
