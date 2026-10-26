# 🚀 Instructions Finales de Déploiement - Samatech

## État du déploiement

✅ **Fichiers uploadés sur Hostinger** :
- `samatech-minimal.tar.gz` (36 MB) - Application Next.js compilée
- `deploy.sh` - Script d'extraction et configuration

## Prochaines étapes

### 1️⃣ Connexion SSH à Hostinger

```bash
ssh u966150428.samatech.cloud@157.173.217.160
```

Ou via SFTP :
```bash
sftp u966150428.samatech.cloud@157.173.217.160
```

### 2️⃣ Navigation vers le dossier d'installation

```bash
cd /home/samatech/public_html/
```

### 3️⃣ Rendre le script exécutable et le lancer

```bash
chmod +x deploy.sh
./deploy.sh
```

Ce script va :
- ✓ Extraire l'archive `samatech-minimal.tar.gz`
- ✓ Installer les dépendances NPM
- ✓ Créer le fichier `.env.production`
- ✓ Compiler/vérifier la build
- ✓ Nettoyer les fichiers temporaires

### 4️⃣ Démarrer l'application

**Option A - Démarrage simple** :
```bash
npm run start
```

**Option B - Avec PM2 (recommandé - pour persistence)** :
```bash
npm install -g pm2
pm2 start "npm run start" --name samatech
pm2 startup
pm2 save
```

### 5️⃣ Vérifier le déploiement

- Ouvrir : https://samatech.cloud
- Ou en français : https://samatech.cloud/fr
- Ou en anglais : https://samatech.cloud/en

## ⚙️ Configuration Hostinger

### Domaines

Assure-toi que les domaines sont configurés :

1. **samatech.cloud** → `/home/samatech/public_html/`
2. **admin.samatech.cloud** → WordPress (existant)

### Variables d'environnement

Le fichier `.env.production` est créé automatiquement par le script `deploy.sh` avec :

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.samatech.cloud/graphql
NEXT_PUBLIC_APP_URL=https://samatech.cloud
NODE_ENV=production
```

### Port Node.js

Hostinger CloudStartup gère automatiquement les ports. Next.js écoute par défaut le port 3000, mais le serveur web fait le reverse proxy.

## 🔒 SSL/HTTPS

Assure-toi que Let's Encrypt est activé pour les deux domaines dans le panel Hostinger.

## 📋 Checklist finale

- [ ] Fichiers uploadés via FTP
- [ ] SSH/SFTP accessible
- [ ] Script `deploy.sh` exécuté
- [ ] Application démarrée (PM2 ou `npm start`)
- [ ] https://samatech.cloud accessible
- [ ] Navigation FR/EN fonctionnelle
- [ ] Formulaire devis testable
- [ ] Portfolio et Services visibles

## 🆘 Troubleshooting

**Port 3000 déjà utilisé** :
```bash
npm run start -- -p 3001
```

**Permission denied sur deploy.sh** :
```bash
chmod +x deploy.sh
```

**Dépendances manquantes** :
```bash
npm install --production
```

**Réinitialiser le déploiement** :
```bash
rm -rf .next/ node_modules/ .env.production
./deploy.sh
```

---

**Dépôt GitHub** : https://github.com/layesamake/samatech
**Branche** : main

Questions ? Contact : sam@samatech.cloud
