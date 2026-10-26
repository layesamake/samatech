// lib/realisations.ts
import localRealisations from '@/data/realisations.json';

export type RealisationCategory = 'application' | 'website' | 'saas';
export type RealisationStatus = 'en-ligne' | 'version-de-travail' | 'en-cours';

export interface Realisation {
  slug: string;
  client: string;
  title: string;
  category: RealisationCategory;
  status: RealisationStatus;
  url: string | null;
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lng: number;
  sector: string;
  summary: string;
  description: string[];
  features: string[];
  technologies: string[];
  image: string | null;
}

export const categoryLabels: Record<RealisationCategory, string> = {
  application: 'Application web',
  website: 'Site web',
  saas: 'Logiciel SaaS',
};

export const categoryColors: Record<RealisationCategory, string> = {
  application: 'bg-blue-100 text-blue-800',
  website: 'bg-green-100 text-green-800',
  saas: 'bg-purple-100 text-purple-800',
};

export const statusLabels: Record<RealisationStatus, string> = {
  'en-ligne': 'En ligne',
  'version-de-travail': 'Version de travail',
  'en-cours': 'En cours de réalisation',
};

// Le site se met à jour au plus tard une heure après une modification dans le CMS
export const REVALIDATE_SECONDS = 3600;

function isRealisation(value: unknown): value is Realisation {
  const r = value as Realisation;
  return (
    !!r &&
    typeof r.slug === 'string' &&
    typeof r.title === 'string' &&
    typeof r.lat === 'number' &&
    typeof r.lng === 'number' &&
    Array.isArray(r.description) &&
    Array.isArray(r.features) &&
    Array.isArray(r.technologies)
  );
}

// Lit les réalisations publiées dans le CMS (extension « Samatech — Réalisations »).
// Sans CMS configuré, ou s'il ne répond pas, les fiches du dépôt sont utilisées.
export async function getRealisations(): Promise<Realisation[]> {
  const cmsUrl = process.env.CMS_URL?.replace(/\/+$/, '');
  if (cmsUrl) {
    try {
      const response = await fetch(`${cmsUrl}/wp-json/samatech/v1/realisations`, {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(10000),
      });
      if (response.ok) {
        const data: unknown = await response.json();
        if (Array.isArray(data) && data.length > 0 && data.every(isRealisation)) {
          return data;
        }
      }
      console.error(`CMS : réponse inattendue (${response.status}), fiches locales utilisées`);
    } catch (error) {
      console.error('CMS indisponible, fiches locales utilisées', error);
    }
  }
  return localRealisations as Realisation[];
}

export async function getRealisation(slug: string) {
  const all = await getRealisations();
  return all.find(r => r.slug === slug) ?? null;
}

export interface MapLocation {
  key: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  // label : nom du client, ou titre du projet quand le client a plusieurs projets dans la ville
  projects: (Pick<Realisation, 'slug' | 'client' | 'title' | 'category'> & { label: string })[];
}

// Regroupe les réalisations par ville pour la carte (un marqueur par ville)
export function groupByLocation(realisations: Realisation[]): MapLocation[] {
  const groups = new Map<string, MapLocation>();
  for (const r of realisations) {
    const key = `${r.city}-${r.countryCode}`;
    const group = groups.get(key) ?? {
      key,
      city: r.city,
      country: r.country,
      lat: r.lat,
      lng: r.lng,
      projects: [],
    };
    group.projects.push({ slug: r.slug, client: r.client, title: r.title, category: r.category, label: r.client });
    groups.set(key, group);
  }
  for (const group of groups.values()) {
    for (const project of group.projects) {
      if (group.projects.filter(p => p.client === project.client).length > 1) {
        project.label = project.title;
      }
    }
  }
  return [...groups.values()];
}
