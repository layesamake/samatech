import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import ClientsMap from '@/components/ClientsMap';
import QuoteForm from '@/components/QuoteForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Samatech - Solutions Informatiques au Sénégal',
  description: 'Services informatiques complets : création web, hébergement, développement d\'applications, automatisation et formation.',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <ClientsMap />
      <QuoteForm />
      <Contact />
      <Footer />
    </main>
  );
}
