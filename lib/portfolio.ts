// lib/portfolio.ts
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'application' | 'website' | 'training' | 'automation';
  technologies: string[];
  link?: string;
  country: string;
  countryCode: string;
  screenshots: {
    url: string;
    alt: string;
  }[];
  featured?: boolean;
}

// Données d'exemple (à remplacer par WordPress GraphQL)
export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'App Mobile Commerce',
    description: 'Application mobile e-commerce pour une boutique en ligne sénégalaise',
    type: 'application',
    technologies: ['React Native', 'Firebase'],
    country: 'Sénégal',
    countryCode: 'SN',
    link: 'https://example.com',
    screenshots: [
      { url: '/portfolio/app-1.png', alt: 'Accueil' },
      { url: '/portfolio/app-2.png', alt: 'Panier' },
    ],
    featured: true,
  },
  {
    id: '2',
    title: 'Site Institutionnel',
    description: 'Site web pour une entreprise au Maroc',
    type: 'website',
    technologies: ['Next.js', 'Tailwind CSS'],
    country: 'Maroc',
    countryCode: 'MA',
    link: 'https://example.com',
    screenshots: [
      { url: '/portfolio/site-1.png', alt: 'Accueil' },
    ],
  },
];
