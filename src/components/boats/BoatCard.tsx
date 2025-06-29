
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Boat } from '@/data/boats';
import { Heart } from 'lucide-react';

interface BoatCardProps {
  boat: Boat;
  currencySymbol?: string;
}

const BoatCard: React.FC<BoatCardProps> = ({ boat, currencySymbol = '฿' }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % boat.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + boat.images.length) % boat.images.length);
  };

  return (
    <Link to={`/boats/${boat.id}`} className="block">
      <div className="bg-indigo-900/70 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full card-hover border border-purple-700/30">
        {/* Image with controls */}
        <div className="relative h-56">
          <img 
            src={boat.images[currentImageIndex]} 
            alt={boat.name} 
            className="w-full h-full object-cover transition-all duration-500 ease-in-out"
          />
          
          {/* Navigation dots */}
          {boat.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {boat.images.map((_, index) => (
                <button 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Navigation arrows */}
          {boat.images.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-sm opacity-70 hover:opacity-100 transition-opacity"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-sm opacity-70 hover:opacity-100 transition-opacity"
                onClick={nextImage}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Type Label */}
          <div className="absolute top-3 left-3 bg-blue-500/80 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium text-white">
            {boat.type}
          </div>
          
          {/* Favorite Button */}
          <button 
            className={`absolute top-3 right-3 bg-white/70 backdrop-blur-sm rounded-full p-1.5 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Simplified Content - Only Name and Price */}
        <div className="p-4 text-white">
          <h3 className="text-lg font-semibold text-white">{boat.name}</h3>
          <div className="mt-2 pt-2 border-t border-purple-700/30 flex items-center">
            <p className="text-lg font-bold text-white">{currencySymbol}{boat.price_per_hour}<span className="text-sm font-medium text-blue-200">/hour</span></p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoatCard;
