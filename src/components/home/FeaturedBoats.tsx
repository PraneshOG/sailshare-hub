
import { useEffect, useState } from 'react';
import { fetchBoats, Boat } from '@/integrations/supabase/services';
import BoatCard from '@/components/boats/BoatCard';

const FeaturedBoats = () => {
  const [featuredBoat, setFeaturedBoat] = useState<Boat | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBoats = async () => {
      setIsLoading(true);
      const boats = await fetchBoats();
      
      // Take only the first boat
      if (boats.length > 0) {
        setFeaturedBoat(boats[0]);
      }
      setIsLoading(false);
    };

    loadBoats();
  }, []);

  // We're hiding this component completely as requested by user
  return null;
};

export default FeaturedBoats;
