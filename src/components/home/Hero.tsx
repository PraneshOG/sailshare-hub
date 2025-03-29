
import SearchBar from '@/components/common/SearchBar';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Where do you want to go?
          </h1>
          
          {/* Colored Box Container */}
          <div className="bg-blue-100/60 backdrop-blur-md p-6 rounded-xl shadow-lg">
            {/* Search Box */}
            <SearchBar hideOnNonHomePage={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
