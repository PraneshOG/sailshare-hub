
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GuestDetailsForm from '@/components/checkout/GuestDetailsForm';
import QRCodeGenerator from '@/components/checkout/QRCodeGenerator';
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from '@/components/layout/MainSidebar';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use location.state to get boat data
  const { boat } = location.state || { boat: null };
  
  if (!boat) {
    // Redirect if no boat data
    return <div>No boat selected. Please select a boat first.</div>;
  }
  
  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep(2);
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 w-full">
        <Navbar />
        
        <div className="flex flex-1 w-full">
          <MainSidebar />
          
          <main className="flex-grow p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
                  
                  {/* Progress Steps */}
                  <div className="flex mb-8">
                    <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
                      Guest Details
                    </div>
                    <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
                      Confirmation
                    </div>
                  </div>
                  
                  {/* Boat Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                      <img 
                        src={boat.imageUrl} 
                        alt={boat.name} 
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{boat.name}</h3>
                        <p className="text-gray-600">{boat.location}</p>
                        <p className="text-gray-800 font-medium mt-1">${boat.pricePerDay} per day</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Form Steps */}
                  {step === 1 && (
                    <GuestDetailsForm onSubmit={handleFormSubmit} />
                  )}
                  
                  {step === 2 && formData && (
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-4">Booking Confirmed!</h2>
                      <p className="mb-6 text-gray-600">Thank you for your booking. Your reservation details are below.</p>
                      
                      <div className="mb-6">
                        <QRCodeGenerator data={JSON.stringify({
                          boat: boat.name,
                          guest: formData.name,
                          email: formData.email,
                          phone: formData.phone,
                          date: new Date().toISOString()
                        })} />
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-green-800 mb-2">Guest Information</h3>
                        <p><span className="font-medium">Name:</span> {formData.name}</p>
                        <p><span className="font-medium">Email:</span> {formData.email}</p>
                        <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                        {formData.specialRequests && (
                          <p><span className="font-medium">Special Requests:</span> {formData.specialRequests}</p>
                        )}
                      </div>
                      
                      <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                      >
                        Return to Home
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Checkout;
