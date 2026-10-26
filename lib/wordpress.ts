// lib/wordpress.ts
export async function fetchWordPressData(query: string, variables?: Record<string, any>) {
  const url = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!url) {
    console.error('NEXT_PUBLIC_WORDPRESS_API_URL not configured');
    return null;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('WordPress fetch error:', error);
    return null;
  }
}

// Typage pour les services
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

// Services locaux si WordPress n'est pas dispo
export const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Création Web',
    description: 'Conception et développement de sites web modernes et responsifs',
    icon: '🌐',
  },
  {
    id: '2',
    title: 'Nom de Domaine',
    description: 'Enregistrement et gestion de noms de domaine',
    icon: '🔗',
  },
  {
    id: '3',
    title: 'Hébergement Web',
    description: 'Solutions d\'hébergement fiables et performantes',
    icon: '🖥️',
  },
  {
    id: '4',
    title: 'Applications Web & Mobile',
    description: 'Développement d\'applications web et mobiles sur mesure',
    icon: '📱',
  },
  {
    id: '5',
    title: 'Automatisation de Processus',
    description: 'Automatisation intelligente des processus métier',
    icon: '⚙️',
  },
  {
    id: '6',
    title: 'Formation',
    description: 'Formation en informatique et développement web',
    icon: '📚',
  },
];
