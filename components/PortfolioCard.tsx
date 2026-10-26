// components/PortfolioCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { categoryColors, categoryLabels, statusLabels, type Realisation } from '@/lib/realisations';

export default function PortfolioCard({ item, lang }: { item: Realisation; lang: string }) {
  const href = `/${lang}/realisations/${item.slug}`;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col">
      {/* Image */}
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        {item.image ? (
          <Image
            src={item.image}
            alt={`Aperçu du projet ${item.client}`}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-xl font-bold text-white">
            {item.client}
          </span>
        )}
      </Link>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-1">
        {/* Type & Pays */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${categoryColors[item.category]}`}>
            {categoryLabels[item.category]}
          </span>
          <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded">
            {item.city}, {item.country}
          </span>
          {item.status !== 'en-ligne' && (
            <span className="px-2 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded">
              {statusLabels[item.status]}
            </span>
          )}
        </div>

        {/* Titre */}
        <p className="text-sm font-semibold text-blue-600">{item.client}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.summary}</p>

        {/* Lien */}
        <Link href={href} className="mt-auto inline-block text-blue-600 hover:text-blue-800 font-semibold text-sm">
          Voir la fiche du projet →
        </Link>
      </div>
    </article>
  );
}
