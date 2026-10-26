# Déploiement Samatech

## Architecture

```
┌─────────────────┐
│  samatech.cloud │  (Next.js Frontend)
│  (Public Site)  │  Hostinger CloudStartup
└────────┬────────┘
         │
         │ GraphQL
         │
┌────────▼──────────────┐
│ admin.samatech.cloud  │  (WordPress Headless CMS)
│ (Content Management)  │  
└───────────────────────┘
```

## Configuration Hostinger

### Domaines

1. **samatech.cloud** → Frontend Next.js (public)
2. **admin.samatech.cloud** → WordPress (réservé à l'administration)

### Variables d'Environnement Hostinger

Ajouter dans le panneau de contrôle Hostinger ou dans un fichier `.env` :

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.samatech.cloud/graphql
NEXT_PUBLIC_APP_URL=https://samatech.cloud
NODE_ENV=production
```

### SSL/TLS

Activer HTTPS pour les deux domaines via Let's Encrypt (automatique sur Hostinger).

## Déploiement Initial

1. Clone du dépôt GitHub
2. Installation : `npm install --production`
3. Build : `npm run build`
4. Téléversement du dossier `.next` et `public` vers le document root

## Déploiement Continu (Git-Based)

Configurer GitHub Actions ou un webhook Hostinger pour deployer automatiquement après chaque push sur `main`.

## Vérification

- GET https://samatech.cloud → Page d'accueil Next.js
- GET https://admin.samatech.cloud → Panneau WordPress
- GET https://samatech.cloud/api/health → Santé de l'app (optionnel)
