import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Users, QrCode } from 'lucide-react';
import QRCodeGenerator from '@/components/checkout/QRCodeGenerator';
import GuestDetailsForm from '@/components/checkout/GuestDetailsForm';
import { useToast } from '@/components/ui/use-toast';
import Auth from './Auth';

interface GuestDetail {
  name: string;
  age: string;
  idType: string;
  idNumber: string;
  photoFile?: File;
  photoUrl?: string;
}

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
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [guestDetails, setGuestDetails] = useState<GuestDetail[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (location.state) {
      setBookingDetails(location.state as BookingDetails);
    } else {
      navigate('/boats');
    }
  }, [location, navigate]);

  const handleGuestDetailsChange = (details: GuestDetail[]) => {
    setGuestDetails(details);
  };

  const uploadGuestPhotos = async (guestDetails: GuestDetail[], bookingId: string) => {
    const photoUploads = guestDetails.map(async (guest, index) => {
      if (guest.photoFile) {
        const fileExt = guest.photoFile.name.split('.').pop();
        const fileName = `${bookingId}_guest_${index}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('guest_photos')
          .upload(fileName, guest.photoFile);

        if (error) {
          console.error('Error uploading photo:', error);
          return null;
        }

        return data.path;
      }
      return null;
    });

    return Promise.all(photoUploads);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your booking.",
        variant: "destructive"
      });
      return;
    }

    if (!bookingDetails) return;
    
    const allGuestsValid = guestDetails.length === bookingDetails.guestCount &&
      guestDetails.every(guest => 
        guest.name.trim() !== '' && 
        guest.age.trim() !== '' && 
        guest.idNumber.trim() !== '' &&
        guest.photoFile
      );
    
    if (!allGuestsValid) {
      toast({
        title: "Missing information",
        description: "Please complete all guest details including photo verification.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Insert booking
      const randomTicketId = 'SB-' + Math.floor(100000 + Math.random() * 900000);
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          boat_id: bookingDetails.boatId,
          boat_name: bookingDetails.boatName,
          date: bookingDetails.date,
          time: bookingDetails.time,
          duration: bookingDetails.duration,
          guest_count: bookingDetails.guestCount,
          total_price: bookingDetails.totalPrice,
          ticket_id: randomTicketId
        })
        .select('id')
        .single();

      if (bookingError) throw bookingError;

      // Upload guest photos
      const photoPaths = await uploadGuestPhotos(guestDetails, bookingData.id);

      // Insert guest details with photo paths
      const guestInserts = guestDetails.map((guest, index) => ({
        booking_id: bookingData.id,
        name: guest.name,
        age: guest.age,
        id_type: guest.idType,
        id_number: guest.idNumber,
        photo_path: photoPaths[index]
      }));

      const { error: guestsError } = await supabase
        .from('booking_guests')
        .insert(guestInserts);

      if (guestsError) throw guestsError;

      setTicketId(randomTicketId);
      setIsCompleted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Booking submission error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (!user) {
    return <Auth />;
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
                <p className="text-gray-600">
                  Enter guest details and upload verification documents
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Booking Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Guest Information</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <GuestDetailsForm 
                        guestCount={bookingDetails?.guestCount || 0} 
                        onGuestDetailsChange={handleGuestDetailsChange}
                      />
                      
                      <Button 
                        type="submit"
                        className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-medium py-3 rounded-lg transition-all"
                        disabled={guestDetails.length !== bookingDetails?.guestCount}
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
                        <span className="text-gray-600">₹{bookingDetails.price.toLocaleString('en-IN')} × {bookingDetails.duration} hours</span>
                        <span className="font-medium">₹{(bookingDetails.price * bookingDetails.duration).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Cleaning fee</span>
                        <span className="font-medium">₹500</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Service fee</span>
                        <span className="font-medium">₹300</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3 mt-3">
                        <span>Total</span>
                        <span>₹{bookingDetails.totalPrice.toLocaleString('en-IN')}</span>
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
                        guests: guestDetails.map(g => ({
                          name: g.name,
                          age: g.age,
                          idType: g.idType
                        }))
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
