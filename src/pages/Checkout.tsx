
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MainSidebar from '@/components/layout/MainSidebar';
import QRCodeGenerator from '@/components/checkout/QRCodeGenerator';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

// Define interfaces for guest data
interface GuestData {
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [guestData, setGuestData] = useState<GuestData>({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use location.state to get boat data and booking details
  const { boat, bookingDetails } = location.state || { boat: null, bookingDetails: null };
  
  if (!boat || !bookingDetails) {
    // Redirect if no boat data
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 items-center justify-center text-white p-6">
        <h1 className="text-2xl font-bold mb-4">No booking information</h1>
        <p className="mb-6">Please select a boat and booking details first.</p>
        <Button onClick={() => navigate('/boats/boat-01')} variant="outline" className="bg-white/10 hover:bg-white/20">
          Return to Boat Selection
        </Button>
      </div>
    );
  }
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!guestData.name || !guestData.email || !guestData.phone) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // Phone validation - simple check for now
    if (guestData.phone.length < 8) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }
    
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGuestData(prev => ({ ...prev, [name]: value }));
  };

  return (
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
                  <div className={`flex-1 text-center ${step >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>1</div>
                    Guest Details
                  </div>
                  <div className={`flex-1 text-center ${step >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>2</div>
                    Confirmation
                  </div>
                </div>
                
                {/* Boat Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <img 
                      src={boat.images[0]} 
                      alt={boat.name} 
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{boat.name}</h3>
                      <p className="text-gray-600">{boat.location}</p>
                      <p className="text-gray-600">Date: {format(bookingDetails.date, 'PPP')}</p>
                      <p className="text-gray-600">Guests: {bookingDetails.guestCount}</p>
                      <p className="text-gray-800 font-medium mt-1">${boat.price_per_hour} per hour</p>
                    </div>
                  </div>
                </div>
                
                {/* Form Steps */}
                {step === 1 && (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={guestData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            value={guestData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={guestData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <Textarea 
                          id="specialRequests" 
                          name="specialRequests"
                          value={guestData.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Any special requests or notes for your booking"
                          rows={4}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Continue to Confirmation
                    </Button>
                  </form>
                )}
                
                {step === 2 && (
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Booking Confirmed!</h2>
                    <p className="mb-6 text-gray-600">Thank you for your booking. Your reservation details are below.</p>
                    
                    <div className="mb-6">
                      <QRCodeGenerator 
                        value={JSON.stringify({
                          boat: boat.name,
                          guest: guestData.name,
                          email: guestData.email,
                          phone: guestData.phone,
                          date: bookingDetails.date,
                          guests: bookingDetails.guestCount
                        })}
                        size={200}
                      />
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                      <h3 className="font-semibold text-green-800 mb-2">Booking Information</h3>
                      <p><span className="font-medium">Boat:</span> {boat.name}</p>
                      <p><span className="font-medium">Date:</span> {format(bookingDetails.date, 'PPP')}</p>
                      <p><span className="font-medium">Guests:</span> {bookingDetails.guestCount}</p>
                      <p><span className="font-medium">Cost:</span> ${boat.price_per_hour} per hour</p>
                      
                      <h3 className="font-semibold text-green-800 mt-4 mb-2">Guest Information</h3>
                      <p><span className="font-medium">Name:</span> {guestData.name}</p>
                      <p><span className="font-medium">Email:</span> {guestData.email}</p>
                      <p><span className="font-medium">Phone:</span> {guestData.phone}</p>
                      {guestData.specialRequests && (
                        <p><span className="font-medium">Special Requests:</span> {guestData.specialRequests}</p>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => navigate('/')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
                    >
                      Return to Home
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
