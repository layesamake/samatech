export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Samatech</h3>
            <p className="text-gray-400">
              Solutions informatiques complètes pour votre entreprise au Sénégal.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Création Web</a></li>
              <li><a href="#" className="hover:text-white">Hébergement</a></li>
              <li><a href="#" className="hover:text-white">Applications</a></li>
              <li><a href="#" className="hover:text-white">Automatisation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Légal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Mentions légales</a></li>
              <li><a href="#" className="hover:text-white">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white">Conditions d'utilisation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Samatech. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
