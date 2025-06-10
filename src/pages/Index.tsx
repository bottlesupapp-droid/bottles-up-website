
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PopularEvents from '@/components/PopularEvents';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <PopularEvents />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
