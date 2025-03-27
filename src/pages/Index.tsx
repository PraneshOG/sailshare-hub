
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
        
        {/* CTA Section */}
        <section className="relative py-24 bg-indigo-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2074&auto=format&fit=crop" 
              alt="Ocean background in Phuket" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Explore Phuket's Waters?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of happy boaters and experience Thai waters like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/boats" className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-md active:scale-95">Find Your Boat</a>
                <a href="/list-your-boat" className="px-6 py-3 bg-white hover:bg-gray-50 text-indigo-800 rounded-lg font-medium border border-gray-200 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md active:scale-95">List Your Boat</a>
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
