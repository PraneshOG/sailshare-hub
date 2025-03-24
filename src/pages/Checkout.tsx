
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Clock, Users, QrCode } from 'lucide-react';
import QRCodeGenerator from '@/components/checkout/QRCodeGenerator';

interface BookingDetails {
  boatId: string;
  boatName: string;
  boatImage: string;
  date: string;
  time: string;
  duration: number;
  guestCount: number;
  price: number;
  totalPrice: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (location.state) {
      setBookingDetails(location.state as BookingDetails);
    } else {
      navigate('/boats');
    }
  }, [location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate booking process
    setTimeout(() => {
      // Generate a random ticket ID
      const randomTicketId = 'SB-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(randomTicketId);
      setIsCompleted(true);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking information found</h2>
            <p className="text-gray-600 mb-6">Please select a boat to begin the booking process.</p>
            <Button 
              variant="default" 
              className="bg-ocean-600 hover:bg-ocean-700"
              onClick={() => navigate('/boats')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Boats
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {!isCompleted ? (
            <>
              <div className="mb-6">
                <button 
                  onClick={() => navigate(-1)} 
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-ocean-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">Complete Your Booking</h1>
                <p className="text-gray-600">Enter your details to confirm your reservation</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Booking Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Your email address"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Contact phone number"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                        <textarea 
                          id="specialRequests"
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Any special requirements or notes for your booking"
                          className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent focus:outline-none transition-all"
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-3 rounded-lg transition-all"
                      >
                        Complete Booking
                      </Button>
                    </form>
                  </div>
                </div>
                
                {/* Booking Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
                    
                    <div className="mb-4">
                      <img 
                        src={bookingDetails.boatImage} 
                        alt={bookingDetails.boatName}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{bookingDetails.boatName}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4 text-ocean-600" />
                        <span>{formatDate(bookingDetails.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="h-4 w-4 text-ocean-600" />
                        <span>{bookingDetails.time} • {bookingDetails.duration} {bookingDetails.duration === 1 ? 'hour' : 'hours'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="h-4 w-4 text-ocean-600" />
                        <span>{bookingDetails.guestCount} {bookingDetails.guestCount === 1 ? 'guest' : 'guests'}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">₹{bookingDetails.price} × {bookingDetails.duration} hours</span>
                        <span className="font-medium">₹{bookingDetails.price * bookingDetails.duration}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Cleaning fee</span>
                        <span className="font-medium">₹50</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Service fee</span>
                        <span className="font-medium">₹30</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3 mt-3">
                        <span>Total</span>
                        <span>₹{bookingDetails.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="bg-white rounded-xl shadow-md p-8 max-w-lg w-full text-center">
                <div className="mb-6 text-green-500 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">Your booking has been successfully completed.</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Details</h3>
                  <p className="text-gray-700 mb-1"><strong>Boat:</strong> {bookingDetails.boatName}</p>
                  <p className="text-gray-700 mb-1"><strong>Date:</strong> {formatDate(bookingDetails.date)}</p>
                  <p className="text-gray-700 mb-1"><strong>Time:</strong> {bookingDetails.time}</p>
                  <p className="text-gray-700 mb-1"><strong>Duration:</strong> {bookingDetails.duration} {bookingDetails.duration === 1 ? 'hour' : 'hours'}</p>
                  <p className="text-gray-700 mb-1"><strong>Guests:</strong> {bookingDetails.guestCount}</p>
                  <p className="text-gray-700"><strong>Ticket ID:</strong> {ticketId}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center justify-center gap-2">
                    <QrCode className="h-5 w-5 text-ocean-600" />
                    Your Ticket QR Code
                  </h3>
                  <div className="flex justify-center">
                    <QRCodeGenerator 
                      value={JSON.stringify({
                        ticketId,
                        boatName: bookingDetails.boatName,
                        date: bookingDetails.date,
                        time: bookingDetails.time,
                        guestCount: bookingDetails.guestCount,
                        bookedBy: formData.fullName,
                        email: formData.email
                      })}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Present this QR code when you arrive at the location.
                  </p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => navigate('/')}
                    variant="default"
                    className="bg-ocean-600 hover:bg-ocean-700"
                  >
                    Back to Home
                  </Button>
                  <Button 
                    onClick={() => window.print()}
                    variant="outline"
                  >
                    Print Ticket
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
