
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedBoats from '@/components/home/FeaturedBoats';
import { Anchor, ShieldCheck, Smile, MessageSquare, Search, Calendar } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Boats Section */}
        <FeaturedBoats />
        
        {/* CTA Section */}
        <section className="relative py-24 bg-ocean-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=2074&auto=format&fit=crop" 
              alt="Ocean background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Set Sail on Your Next Adventure?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of happy boaters and experience the water like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/boats" className="btn-primary">Find Your Boat</a>
                <a href="/list-your-boat" className="btn-secondary">List Your Boat</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
