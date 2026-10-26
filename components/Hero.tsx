import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Solutions Informatiques Complètes pour Votre Entreprise
          </h1>
          <p className="text-lg text-blue-100 mb-8">
            Samatech, basée à Thiès au Sénégal, vous propose les meilleures solutions en création web, hébergement, développement d'applications et automatisation de processus.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded font-semibold hover:bg-blue-50 transition">
            Commencer Maintenant
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/elephant.png"
            alt="Samatech Mascot"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
