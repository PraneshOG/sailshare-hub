
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MainSidebar from '@/components/layout/MainSidebar';
import { boats } from '@/data/boats';

const BoatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const boat = boats.find(b => b.id === id);
  
  if (!boat) {
    return <div>Boat not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 w-full">
      <Navbar />
      
      <div className="flex flex-1 w-full">
        <MainSidebar />
        
        <main className="flex-grow p-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={boat.images[0]} 
                    alt={boat.name} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-1/2">
                  <h1 className="text-3xl font-bold text-gray-800">{boat.name}</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-700">{boat.rating} reviews</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-700">{boat.location}</span>
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">About this boat</h2>
                    <p className="mt-2 text-gray-600">{boat.description}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800">Features</h2>
                    <ul className="mt-2 grid grid-cols-2 gap-2">
                      <li className="text-gray-600">Type: {boat.type}</li>
                      <li className="text-gray-600">Capacity: {boat.capacity} people</li>
                      <li className="text-gray-600">Features: {boat.features.length} available</li>
                      <li className="text-gray-600">Location: {boat.location}</li>
                    </ul>
                  </div>
                  
                  <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">${boat.price_per_hour}</span>
                        <span className="text-gray-600"> / hour</span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default BoatDetail;
