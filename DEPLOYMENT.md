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

#### Formulaires de devis et de contact

Les deux formulaires envoient un e-mail via `/api/quote` (SMTP Hostinger). Sans `SMTP_USER` et `SMTP_PASS`, le visiteur voit un message d'erreur et rien n'est envoyé.

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=devis@samatech.cloud   # boîte mail Hostinger qui envoie
SMTP_PASS=********               # mot de passe de cette boîte
QUOTE_TO=contact@samatech.cloud  # destinataire des demandes (par défaut : SMTP_USER)
```

Redéployer après avoir ajouté ou modifié ces variables.

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
