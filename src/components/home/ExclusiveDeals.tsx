import { useEffect, useState } from 'react';
import { fetchDeals, Deal } from '@/integrations/supabase/services';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExclusiveDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      setIsLoading(true);
      try {
        const dealsData = await fetchDeals();
        
        const updatedDeals = dealsData.map(deal => ({
          ...deal,
          image_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60"
        }));
        
        setDeals(updatedDeals);
      } catch (error) {
        console.error("Error loading deals:", error);
        setDeals([
          {
            id: "fallback-1",
            title: "Luxury Yacht Weekend",
            description: "3-day yacht experience with captain and crew included",
            original_price: 45000,
            discounted_price: 35000,
            location: "Phi Phi Islands",
            image_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60",
            valid_until: "2024-12-31",
            created_at: new Date().toISOString()
          },
          {
            id: "fallback-2",
            title: "Island Hopping Adventure",
            description: "Full day speedboat tour to 5 amazing islands",
            original_price: 12000,
            discounted_price: 8500,
            location: "Krabi",
            image_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60",
            valid_until: "2024-11-30",
            created_at: new Date().toISOString()
          },
          {
            id: "fallback-3",
            title: "Sunset Sailing Experience",
            description: "Romantic evening sail with dinner and drinks included",
            original_price: 15000,
            discounted_price: 10000,
            location: "Koh Samui",
            image_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60",
            valid_until: "2024-10-15",
            created_at: new Date().toISOString()
          },
          {
            id: "fallback-4",
            title: "Fishing Day Trip",
            description: "Full day fishing adventure with all equipment and lunch",
            original_price: 18000,
            discounted_price: 12000,
            location: "Phuket",
            image_url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&auto=format&fit=crop&q=60",
            valid_until: "2024-09-30",
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeals();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-indigo-900/60 to-purple-900/60 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Exclusive Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-indigo-800/40 rounded-xl p-4 h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-indigo-900/60 to-purple-900/60 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Exclusive Deals</h2>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all hover:transform hover:scale-105">
              <div className="relative h-40">
                <img 
                  src={deal.image_url} 
                  alt={deal.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg">
                  {Math.round((1 - deal.discounted_price / deal.original_price) * 100)}% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{deal.title}</h3>
                <p className="text-gray-300 text-sm">{deal.location}</p>
                <div className="mt-2">
                  <span className="text-gray-400 line-through">฿{deal.original_price.toLocaleString()}</span>
                  <span className="text-red-400 font-bold text-lg ml-2">฿{deal.discounted_price.toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm text-gray-300 line-clamp-2">{deal.description}</p>
                <div className="mt-4">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    View Deal
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveDeals;
