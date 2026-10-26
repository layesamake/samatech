import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientsMapView from '@/components/ClientsMapView';
import {
  categoryColors,
  categoryLabels,
  getRealisation,
  getRealisations,
  groupByLocation,
  statusLabels,
} from '@/lib/realisations';

export const revalidate = 3600;

type Params = Promise<{ lang: string; slug: string }>;

export async function generateStaticParams() {
  const realisations = await getRealisations();
  return realisations.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const realisation = await getRealisation(slug);
  if (!realisation) return {};

  return {
    title: `${realisation.client} — ${realisation.title} | Samatech`,
    description: realisation.summary,
    openGraph: realisation.image ? { images: [realisation.image] } : undefined,
  };
}

export default async function RealisationPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const realisations = await getRealisations();
  const index = realisations.findIndex(r => r.slug === slug);
  if (index === -1) notFound();

  const realisation = realisations[index];
  const next = realisations[(index + 1) % realisations.length];
  const location = groupByLocation([realisation]);

  return (
    <main className="min-h-screen">
      <Navbar lang={lang} />

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <nav aria-label="Fil d’Ariane" className="text-sm text-blue-100 mb-6">
            <Link href={`/${lang}`} className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}#portfolio`} className="hover:text-white">Réalisations</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{realisation.client}</span>
          </nav>

          <p className="font-semibold text-blue-100 mb-2">{realisation.client}</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl">{realisation.title}</h1>
          <p className="text-lg text-blue-100 max-w-3xl mb-8">{realisation.summary}</p>

          <div className="flex flex-wrap gap-3">
            {realisation.url && (
              <a
                href={realisation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-blue-50 transition"
              >
                {realisation.status === 'version-de-travail' ? 'Voir la version de travail ↗' : 'Visiter le site ↗'}
              </a>
            )}
            <Link
              href={`/${lang}#quote`}
              className="border border-white px-6 py-3 rounded font-semibold hover:bg-white/10 transition"
            >
              Demander un devis similaire
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_320px] gap-10">
          <div>
            {realisation.image && (
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-lg mb-10 bg-gray-100">
                <Image
                  src={realisation.image}
                  alt={`Page d’accueil du projet ${realisation.client}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Le projet</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed mb-10">
              {realisation.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fonctionnalités</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
              {realisation.features.map(feature => (
                <li key={feature} className="flex gap-3 bg-gray-50 rounded-lg p-4 text-gray-700">
                  <span className="text-blue-600 font-bold" aria-hidden="true">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <dl className="bg-gray-50 rounded-lg p-6 space-y-4 text-sm">
              <div>
                <dt className="text-gray-500">Client</dt>
                <dd className="font-semibold text-gray-900">{realisation.client}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Secteur</dt>
                <dd className="font-semibold text-gray-900">{realisation.sector}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Type de projet</dt>
                <dd>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded ${categoryColors[realisation.category]}`}>
                    {categoryLabels[realisation.category]}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Statut</dt>
                <dd className="font-semibold text-gray-900">{statusLabels[realisation.status]}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Localisation</dt>
                <dd className="font-semibold text-gray-900">{realisation.city}, {realisation.country}</dd>
              </div>
              {realisation.url && (
                <div>
                  <dt className="text-gray-500">Adresse du site</dt>
                  <dd>
                    <a href={realisation.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline break-all">
                      {realisation.url.replace(/^https?:\/\//, '')}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-gray-500 mb-2">Technologies</dt>
                <dd className="flex flex-wrap gap-2">
                  {realisation.technologies.map(tech => (
                    <span key={tech} className="text-xs bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="h-64 rounded-lg overflow-hidden shadow relative z-0">
              <ClientsMapView locations={location} lang={lang} zoom={5} className="h-full w-full" />
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row gap-4 justify-between">
          <Link href={`/${lang}#portfolio`} className="text-blue-600 font-semibold hover:underline">
            ← Toutes les réalisations
          </Link>
          <Link href={`/${lang}/realisations/${next.slug}`} className="text-blue-600 font-semibold hover:underline text-right">
            Projet suivant : {next.client} →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
