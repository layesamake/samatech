export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nous Contacter</h2>

        <div className="bg-gray-50 rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600">
                Thiès, Quartier Mbambara<br />
                Rue MB36, Villa Numéro 33<br />
                Sénégal
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:contact@samatech.cloud" className="text-blue-600 hover:underline">
                  contact@samatech.cloud
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600">
                En cours de mise à jour
              </p>
            </div>

            <form className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Votre message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
