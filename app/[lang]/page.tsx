import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import ClientsMap from '@/components/ClientsMap';
import QuoteForm from '@/components/QuoteForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getRealisations } from '@/lib/realisations';

export const revalidate = 3600;

export const metadata = {
  title: 'Samatech - Solutions Informatiques au Sénégal',
  description: 'Services informatiques complets : création web, hébergement, développement d\'applications, automatisation et formation.',
};

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const realisations = await getRealisations();

  return (
    <main className="min-h-screen">
      <Navbar lang={lang} />
      <Hero />
      <Services />
      <Portfolio realisations={realisations} lang={lang} />
      <ClientsMap realisations={realisations} lang={lang} />
      <QuoteForm />
      <Contact />
      <Footer />
    </main>
  );
}
