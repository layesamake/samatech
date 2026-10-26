// components/ClientsMap.tsx
import Link from 'next/link';
import { groupByLocation, type Realisation } from '@/lib/realisations';
import ClientsMapView from './ClientsMapView';

export default function ClientsMap({ realisations, lang }: { realisations: Realisation[]; lang: string }) {
  const locations = groupByLocation(realisations);
  const countries = new Set(realisations.map(r => r.countryCode)).size;

  return (
    <section id="clients-map" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Clients à Travers le Monde</h2>
        <p className="text-gray-600 mb-8">
          {realisations.length} réalisations dans {countries} pays, de Kafountine à Guangzhou.
          Cliquez sur un marqueur pour voir les projets de chaque ville.
        </p>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          <div className="h-[420px] md:h-[520px] rounded-lg overflow-hidden shadow relative z-0">
            <ClientsMapView locations={locations} lang={lang} className="h-full w-full" />
          </div>

          <ul className="space-y-3 lg:max-h-[520px] lg:overflow-y-auto">
            {locations.map(location => (
              <li key={location.key} className="bg-gray-50 rounded-lg p-4">
                <p className="font-bold text-gray-900">
                  {location.city}
                  <span className="font-normal text-gray-500"> · {location.country}</span>
                </p>
                <ul className="mt-1 text-sm">
                  {location.projects.map(project => (
                    <li key={project.slug}>
                      <Link
                        href={`/${lang}/realisations/${project.slug}`}
                        className="text-blue-600 hover:underline"
                      >
                        {project.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
