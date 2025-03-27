
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedBoats from '@/components/home/FeaturedBoats';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Boats Section */}
        <FeaturedBoats />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
