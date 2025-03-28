
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedBoats from '@/components/home/FeaturedBoats';
import ExclusiveDeals from '@/components/home/ExclusiveDeals';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Exclusive Deals Section */}
        <ExclusiveDeals />
        
        {/* Featured Boats Section */}
        <FeaturedBoats />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
