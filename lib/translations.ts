// lib/translations.ts
export type Language = 'fr' | 'en';

export const translations: Record<Language, Record<string, any>> = {
  fr: {
    // Navigation
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'À propos',
      contact: 'Contact',
      contactCTA: 'Contactez-nous',
    },
    // Hero
    hero: {
      title: 'Solutions Informatiques Complètes pour Votre Entreprise',
      subtitle: 'Samatech, basée à Thiès au Sénégal, vous propose les meilleures solutions en création web, hébergement, développement d\'applications et automatisation de processus.',
      cta: 'Commencer Maintenant',
    },
    // Services
    services: {
      title: 'Nos Services',
      items: {
        webCreation: 'Création Web',
        webCreationDesc: 'Conception et développement de sites web modernes et responsifs',
        domain: 'Nom de Domaine',
        domainDesc: 'Enregistrement et gestion de noms de domaine',
        hosting: 'Hébergement Web',
        hostingDesc: 'Solutions d\'hébergement fiables et performantes',
        apps: 'Applications Web & Mobile',
        appsDesc: 'Développement d\'applications web et mobiles sur mesure',
        automation: 'Automatisation de Processus',
        automationDesc: 'Automatisation intelligente des processus métier',
        training: 'Formation',
        trainingDesc: 'Formation en informatique et développement web',
      },
    },
    // Portfolio
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Découvrez nos réalisations pour des clients à travers le monde',
      filters: {
        all: 'Tous',
        applications: 'Applications',
        websites: 'Sites Web',
        trainings: 'Formations',
        automations: 'Automatisations',
      },
      noResults: 'Aucun projet trouvé pour ce filtre',
      viewProject: 'Voir le projet →',
    },
    // Clients Map
    clientsMap: {
      title: 'Nos Clients à Travers le Monde',
      subtitle: 'Présents dans plusieurs pays d\'Afrique et d\'Europe',
      projects: 'projets',
      mapComing: 'Carte interactive détaillée à venir 🗺️',
    },
    // Quote Form
    quote: {
      title: 'Demander un Devis',
      subtitle: 'Décrivez votre projet et nous vous recontacterons rapidement',
      form: {
        fullName: 'Nom complet *',
        fullNamePlaceholder: 'Votre nom',
        email: 'Email *',
        emailPlaceholder: 'votre@email.com',
        company: 'Entreprise',
        companyPlaceholder: 'Votre entreprise',
        service: 'Type de service *',
        serviceSelect: 'Sélectionner...',
        web: 'Création Web',
        app: 'Application Mobile/Web',
        automation: 'Automatisation de Processus',
        trainingForm: 'Formation',
        other: 'Autre',
        projectDetails: 'Détails du projet *',
        projectPlaceholder: 'Décrivez votre projet, vos besoins, votre budget...',
        submit: 'Envoyer ma demande',
        submitting: 'Envoi en cours...',
        required: '* Champs obligatoires',
      },
      success: {
        title: 'Merci ! Votre demande a été envoyée.',
        message: 'Nous vous recontacterons dans les 24 heures.',
      },
    },
    // Contact
    contact: {
      title: 'Nous Contacter',
      address: 'Adresse',
      addressValue: 'Thiès, Quartier Mbambara\nRue MB36, Villa Numéro 33\nSénégal',
      email: 'Email',
      phone: 'Téléphone',
      phoneValue: 'En cours de mise à jour',
      messageLabel: 'Votre message',
      send: 'Envoyer',
    },
    // Footer
    footer: {
      description: 'Solutions informatiques complètes pour votre entreprise au Sénégal.',
      services: 'Services',
      legal: 'Légal',
      mentions: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d\'utilisation',
      copyright: '© 2026 Samatech. Tous droits réservés.',
    },
  },
  en: {
    // Navigation
    nav: {
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
      contactCTA: 'Contact Us',
    },
    // Hero
    hero: {
      title: 'Complete IT Solutions for Your Business',
      subtitle: 'Samatech, based in Thiès, Senegal, offers you the best solutions in web creation, hosting, application development, and process automation.',
      cta: 'Get Started',
    },
    // Services
    services: {
      title: 'Our Services',
      items: {
        webCreation: 'Web Creation',
        webCreationDesc: 'Design and development of modern and responsive websites',
        domain: 'Domain Name',
        domainDesc: 'Domain name registration and management',
        hosting: 'Web Hosting',
        hostingDesc: 'Reliable and high-performance hosting solutions',
        apps: 'Web & Mobile Applications',
        appsDesc: 'Custom web and mobile application development',
        automation: 'Process Automation',
        automationDesc: 'Intelligent business process automation',
        training: 'Training',
        trainingDesc: 'Training in IT and web development',
      },
    },
    // Portfolio
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Discover our projects for clients around the world',
      filters: {
        all: 'All',
        applications: 'Applications',
        websites: 'Websites',
        trainings: 'Trainings',
        automations: 'Automations',
      },
      noResults: 'No projects found for this filter',
      viewProject: 'View project →',
    },
    // Clients Map
    clientsMap: {
      title: 'Our Clients Around the World',
      subtitle: 'Present in several countries in Africa and Europe',
      projects: 'projects',
      mapComing: 'Interactive detailed map coming soon 🗺️',
    },
    // Quote Form
    quote: {
      title: 'Request a Quote',
      subtitle: 'Describe your project and we\'ll get back to you quickly',
      form: {
        fullName: 'Full Name *',
        fullNamePlaceholder: 'Your name',
        email: 'Email *',
        emailPlaceholder: 'your@email.com',
        company: 'Company',
        companyPlaceholder: 'Your company',
        service: 'Service Type *',
        serviceSelect: 'Select...',
        web: 'Web Creation',
        app: 'Mobile/Web Application',
        automation: 'Process Automation',
        trainingForm: 'Training',
        other: 'Other',
        projectDetails: 'Project Details *',
        projectPlaceholder: 'Describe your project, your needs, your budget...',
        submit: 'Send my request',
        submitting: 'Sending...',
        required: '* Required fields',
      },
      success: {
        title: 'Thank you! Your request has been sent.',
        message: 'We will get back to you within 24 hours.',
      },
    },
    // Contact
    contact: {
      title: 'Contact Us',
      address: 'Address',
      addressValue: 'Thiès, Mbambara District\nStreet MB36, Villa Number 33\nSenegal',
      email: 'Email',
      phone: 'Phone',
      phoneValue: 'Coming soon',
      messageLabel: 'Your message',
      send: 'Send',
    },
    // Footer
    footer: {
      description: 'Complete IT solutions for your business in Senegal.',
      services: 'Services',
      legal: 'Legal',
      mentions: 'Legal Notice',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      copyright: '© 2026 Samatech. All rights reserved.',
    },
  },
};

export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
