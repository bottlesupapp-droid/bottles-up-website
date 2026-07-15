import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopularEvents from '@/components/PopularEvents';
import HowItWorks from '@/components/HowItWorks';
import EmailCollection from '@/components/EmailCollection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <Features />
      <PopularEvents />
      <HowItWorks />
      <EmailCollection />
      <Footer />
    </div>
  );
};

export default Index;
