
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
        
        {/* Trust & Safety Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-ocean-600 text-sm font-semibold tracking-wider uppercase">Trust & Safety</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                  Your Safety is Our Top Priority
                </h2>
                <p className="text-gray-600 mb-8">
                  We've built SailShare with your safety and peace of mind as our foundation. Our comprehensive verification process and safety features ensure a worry-free experience.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-ocean-50 text-ocean-600 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Verified Boat Owners</h3>
                      <p className="text-gray-600">
                        All boat owners undergo a thorough verification process before listing on our platform.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-ocean-50 text-ocean-600 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smile className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Secure Bookings</h3>
                      <p className="text-gray-600">
                        Our booking system is encrypted and payments are secure, protecting your personal and financial information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-ocean-50 text-ocean-600 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">24/7 Support</h3>
                      <p className="text-gray-600">
                        Our dedicated support team is available around the clock to assist with any questions or concerns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1574013408350-026ab5deff61?q=80&w=1974&auto=format&fit=crop" 
                    alt="People enjoying a boat trip" 
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white glass rounded-xl p-4 shadow-lg max-w-xs animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">All bookings are verified</h4>
                      <p className="text-xs text-gray-600 mt-1">We ensure both you and the boat owner are verified before any trip.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
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
