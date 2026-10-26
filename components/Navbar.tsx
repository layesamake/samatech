import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ lang = 'fr' }: { lang?: string }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Samatech"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="font-bold text-xl text-gray-900">Samatech</span>
        </Link>

        <div className="hidden md:flex gap-8">
          <Link href={`/${lang}#services`} className="text-gray-600 hover:text-gray-900">
            Services
          </Link>
          <Link href={`/${lang}#portfolio`} className="text-gray-600 hover:text-gray-900">
            Réalisations
          </Link>
          <Link href={`/${lang}#clients-map`} className="text-gray-600 hover:text-gray-900">
            Nos clients
          </Link>
          <Link href={`/${lang}#contact`} className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>

        <Link
          href="mailto:contact@samatech.cloud"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Contactez-nous
        </Link>
      </div>
    </nav>
  );
}
