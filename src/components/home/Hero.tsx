
import SearchBar from '@/components/common/SearchBar';

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center py-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg" 
          alt="Beautiful beach in Phuket, Thailand" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-900/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Where do you want to go?
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Find the best deals on boat tickets and plan your next adventure
          </p>
        </div>
        
        {/* Search Container with more vertical space for the expanded calendar */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <SearchBar hideOnNonHomePage={true} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
