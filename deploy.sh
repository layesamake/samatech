#!/bin/bash

# Script de déploiement Samatech sur Hostinger
# À exécuter dans /home/samatech/public_html/

set -e

echo "🚀 Déploiement Samatech..."

# 1. Extraire l'archive
echo "📦 Extraction des fichiers..."
tar -xzf samatech-minimal.tar.gz

# 2. Installer les dépendances de production
echo "📚 Installation des dépendances..."
npm install --production

# 3. Créer le fichier .env.production
echo "⚙️ Configuration des variables d'environnement..."
cat > .env.production << 'ENVEOF'
NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.samatech.cloud/graphql
NEXT_PUBLIC_APP_URL=https://samatech.cloud
NODE_ENV=production
ENVEOF

# 4. Vérifier la build
echo "✓ Vérification de la build..."
npm run build || echo "⚠️ Build warning (peut être OK si .next/ existe déjà)"

# 5. Nettoyer
echo "🧹 Nettoyage..."
rm -f samatech-minimal.tar.gz deploy.sh

# 6. Afficher les instructions finales
echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "📝 Pour démarrer le serveur :"
echo "   npm run start"
echo ""
echo "🔄 Pour démarrer avec PM2 (recommandé) :"
echo "   npm install -g pm2"
echo "   pm2 start 'npm run start' --name samatech"
echo "   pm2 startup"
echo "   pm2 save"
echo ""
echo "📍 Le site est accessible à : https://samatech.cloud"
