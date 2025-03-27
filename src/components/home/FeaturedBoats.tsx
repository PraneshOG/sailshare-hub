
import { useEffect, useState } from 'react';
import { getFeaturedBoats } from '@/data/boats';
import { Boat } from '@/data/boats';
import BoatCard from '@/components/boats/BoatCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedBoats = () => {
  const [featuredBoats, setFeaturedBoats] = useState<Boat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      const boats = getFeaturedBoats();
      // Convert prices to Thai Baht (example conversion)
      const convertedBoats = boats.map(boat => ({
        ...boat,
        price: boat.price * 35 // Approximate USD to THB conversion
      }));
      setFeaturedBoats(convertedBoats);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="featured-boats" className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-red-500 text-sm font-semibold tracking-wider uppercase">Featured</span>
            <h2 className="text-3xl font-bold text-white mt-1">Discover Premium Boats in Phuket</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-purple-800 border-purple-700 text-white hover:bg-purple-700"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-purple-800 border-purple-700 text-white hover:bg-purple-700"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-purple-800/40 rounded-xl p-4 h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBoats.map((boat) => (
              <BoatCard key={boat.id} boat={boat} currencySymbol="฿" />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/boats">
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-all inline-flex items-center gap-2"
            >
              View All Boats
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBoats;
