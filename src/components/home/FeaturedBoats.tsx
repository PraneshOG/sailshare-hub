
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
      setFeaturedBoats(getFeaturedBoats());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="featured-boats" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-ocean-600 text-sm font-semibold tracking-wider uppercase">Featured</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">Discover Premium Boats</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl p-4 h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBoats.map((boat) => (
              <BoatCard key={boat.id} boat={boat} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/boats">
            <Button 
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-2 px-6 rounded-lg transition-all inline-flex items-center gap-2"
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
