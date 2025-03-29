
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ExclusiveDeals from '@/components/home/ExclusiveDeals';
import MainSidebar from '@/components/layout/MainSidebar';
import { boat } from '@/data/singleBoat';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleExploreBoat = () => {
    navigate(`/boats/${boat.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 w-full">
      <Navbar />
      
      <div className="flex flex-1 w-full">
        <MainSidebar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />
          
          {/* Featured Boat Section */}
          <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Featured Boat</h2>
              
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img 
                      src={boat.images[0]} 
                      alt={boat.name} 
                      className="h-64 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="p-6 md:w-3/5">
                    <h3 className="text-2xl font-bold text-gray-800">{boat.name}</h3>
                    <p className="text-gray-600 mb-4">{boat.location}</p>
                    
                    <p className="text-gray-700 mb-6">{boat.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {boat.features.slice(0, 4).map((feature, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">${boat.price_per_hour}</p>
                        <p className="text-gray-600">per hour</p>
                      </div>
                      
                      <button 
                        onClick={handleExploreBoat}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Exclusive Deals Section */}
          <ExclusiveDeals />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
