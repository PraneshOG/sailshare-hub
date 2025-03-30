
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Users, QrCode, User } from 'lucide-react';
import QRCodeGenerator from '@/components/checkout/QRCodeGenerator';
import GuestDetailsForm from '@/components/checkout/GuestDetailsForm';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Auth from './Auth';
import { JourneyDetails } from '@/integrations/supabase/services';
import { format } from 'date-fns';

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
  boatImage?: string;
  guestCount: number;
  totalPrice: number;
  tripType: string;
  departure: JourneyDetails;
  return?: JourneyDetails | null;
  cleaningFee: number;
  serviceFee: number;
  journeyPrice: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [guestDetails, setGuestDetails] = useState<GuestDetail[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [departureTicketId, setDepartureTicketId] = useState('');
  const [returnTicketId, setReturnTicketId] = useState('');
  const [guestPhotos, setGuestPhotos] = useState<string[]>([]);

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

        // Get the public URL for the uploaded photo
        const { data: { publicUrl } } = supabase.storage
          .from('guest_photos')
          .getPublicUrl(fileName);

        return publicUrl;
      }
      return null;
    });

    const photoUrls = await Promise.all(photoUploads);
    setGuestPhotos(photoUrls.filter(url => url !== null) as string[]);
    return photoUrls;
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
      // Create departure ticket ID
      const departureRandomTicketId = 'SB-' + Math.floor(100000 + Math.random() * 900000);
      
      // Insert departure booking
      const { data: departureBookingData, error: departureBookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          boat_id: bookingDetails.boatId,
          boat_name: "Journey Ferry",
          date: bookingDetails.departure.date,
          time: bookingDetails.departure.time,
          duration: bookingDetails.departure.duration,
          guest_count: bookingDetails.guestCount,
          total_price: bookingDetails.journeyPrice + (bookingDetails.tripType === 'one-way' ? bookingDetails.cleaningFee + bookingDetails.serviceFee : 0),
          ticket_id: departureRandomTicketId
        })
        .select('id')
        .single();

      if (departureBookingError) {
        console.error('Departure booking error:', departureBookingError);
        throw departureBookingError;
      }

      // Upload guest photos
      const photoPaths = await uploadGuestPhotos(guestDetails, departureBookingData.id);

      // Insert guest details with photo paths for departure booking
      const departureGuestInserts = guestDetails.map((guest, index) => ({
        booking_id: departureBookingData.id,
        name: guest.name,
        age: guest.age,
        id_type: guest.idType,
        id_number: guest.idNumber,
        photo_path: photoPaths[index]
      }));

      const { error: departureGuestsError } = await supabase
        .from('booking_guests')
        .insert(departureGuestInserts);

      if (departureGuestsError) {
        console.error('Departure guests error:', departureGuestsError);
        throw departureGuestsError;
      }

      setDepartureTicketId(departureRandomTicketId);

      // Handle return booking if it's a round trip
      if (bookingDetails.tripType === 'round-trip' && bookingDetails.return) {
        // Create return ticket ID
        const returnRandomTicketId = 'SB-' + Math.floor(100000 + Math.random() * 900000);
        
        // Insert return booking
        const { data: returnBookingData, error: returnBookingError } = await supabase
          .from('bookings')
          .insert({
            user_id: user.id,
            boat_id: bookingDetails.boatId,
            boat_name: "Journey Ferry",
            date: bookingDetails.return.date,
            time: bookingDetails.return.time,
            duration: bookingDetails.return.duration,
            guest_count: bookingDetails.guestCount,
            total_price: bookingDetails.journeyPrice + bookingDetails.cleaningFee + bookingDetails.serviceFee,
            ticket_id: returnRandomTicketId
          })
          .select('id')
          .single();

        if (returnBookingError) {
          console.error('Return booking error:', returnBookingError);
          throw returnBookingError;
        }

        // Insert guest details with photo paths for return booking
        const returnGuestInserts = guestDetails.map((guest, index) => ({
          booking_id: returnBookingData.id,
          name: guest.name,
          age: guest.age,
          id_type: guest.idType,
          id_number: guest.idNumber,
          photo_path: photoPaths[index]
        }));

        const { error: returnGuestsError } = await supabase
          .from('booking_guests')
          .insert(returnGuestInserts);

        if (returnGuestsError) {
          console.error('Return guests error:', returnGuestsError);
          throw returnGuestsError;
        }

        setReturnTicketId(returnRandomTicketId);
      }

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
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Journey Summary</h2>
                    
                    {bookingDetails && (
                      <>
                        {/* Departure Journey */}
                        <div className="mb-4">
                          <h3 className="font-medium text-gray-700">Departure Journey</h3>
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="h-4 w-4 text-ocean-600" />
                              <span>{formatDate(bookingDetails.departure.date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="h-4 w-4 text-ocean-600" />
                              <span>{bookingDetails.departure.time} • {bookingDetails.departure.duration} {bookingDetails.departure.duration === 1 ? 'hour' : 'hours'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Users className="h-4 w-4 text-ocean-600" />
                              <span>{bookingDetails.guestCount} {bookingDetails.guestCount === 1 ? 'guest' : 'guests'}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Return Journey if applicable */}
                        {bookingDetails.tripType === 'round-trip' && bookingDetails.return && (
                          <div className="mb-4 pt-3 border-t border-gray-100">
                            <h3 className="font-medium text-gray-700">Return Journey</h3>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center gap-2 text-gray-700">
                                <Calendar className="h-4 w-4 text-ocean-600" />
                                <span>{formatDate(bookingDetails.return.date)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <Clock className="h-4 w-4 text-ocean-600" />
                                <span>{bookingDetails.return.time} • {bookingDetails.return.duration} {bookingDetails.return.duration === 1 ? 'hour' : 'hours'}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Journey price</span>
                        <span className="font-medium">
                          ฿{bookingDetails ? bookingDetails.journeyPrice.toLocaleString('en-IN') : '0'}
                        </span>
                      </div>
                      
                      {bookingDetails?.tripType === 'round-trip' && bookingDetails.return && (
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Return journey</span>
                          <span className="font-medium">
                            ฿{bookingDetails.journeyPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Cleaning fee</span>
                        <span className="font-medium">฿{bookingDetails?.cleaningFee.toLocaleString('en-IN') || '500'}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Service fee</span>
                        <span className="font-medium">฿{bookingDetails?.serviceFee.toLocaleString('en-IN') || '300'}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-3 mt-3">
                        <span>Total</span>
                        <span>฿{bookingDetails?.totalPrice.toLocaleString('en-IN') || '0'}</span>
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
                <p className="text-gray-600 mb-6">Your journey{bookingDetails?.tripType === 'round-trip' ? 's have' : ' has'} been successfully booked.</p>
                
                {/* Departure Journey Ticket */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Departure Journey</h3>
                  {bookingDetails?.departure && (
                    <>
                      <p className="text-gray-700 mb-1"><strong>From:</strong> {bookingDetails.departure.from}</p>
                      <p className="text-gray-700 mb-1"><strong>To:</strong> {bookingDetails.departure.to}</p>
                      <p className="text-gray-700 mb-1"><strong>Date:</strong> {formatDate(bookingDetails.departure.date)}</p>
                      <p className="text-gray-700 mb-1"><strong>Time:</strong> {bookingDetails.departure.time}</p>
                      <p className="text-gray-700 mb-1"><strong>Duration:</strong> {bookingDetails.departure.duration} {bookingDetails.departure.duration === 1 ? 'hour' : 'hours'}</p>
                      <p className="text-gray-700 mb-1"><strong>Guests:</strong> {bookingDetails.guestCount}</p>
                      <p className="text-gray-700"><strong>Ticket ID:</strong> {departureTicketId}</p>
                    </>
                  )}
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Departure QR Code</h4>
                    <div className="flex justify-center">
                      <QRCodeGenerator 
                        value={JSON.stringify({
                          ticketId: departureTicketId,
                          type: 'departure',
                          date: bookingDetails?.departure.date,
                          time: bookingDetails?.departure.time,
                          from: bookingDetails?.departure.from,
                          to: bookingDetails?.departure.to,
                          guestCount: bookingDetails?.guestCount,
                          guests: guestDetails.map(g => ({
                            name: g.name,
                            age: g.age,
                            idType: g.idType
                          }))
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Return Journey Ticket - Only show if it's a round trip */}
                {bookingDetails?.tripType === 'round-trip' && bookingDetails.return && returnTicketId && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Return Journey</h3>
                    <p className="text-gray-700 mb-1"><strong>From:</strong> {bookingDetails.return.from}</p>
                    <p className="text-gray-700 mb-1"><strong>To:</strong> {bookingDetails.return.to}</p>
                    <p className="text-gray-700 mb-1"><strong>Date:</strong> {formatDate(bookingDetails.return.date)}</p>
                    <p className="text-gray-700 mb-1"><strong>Time:</strong> {bookingDetails.return.time}</p>
                    <p className="text-gray-700 mb-1"><strong>Duration:</strong> {bookingDetails.return.duration} {bookingDetails.return.duration === 1 ? 'hour' : 'hours'}</p>
                    <p className="text-gray-700 mb-1"><strong>Guests:</strong> {bookingDetails.guestCount}</p>
                    <p className="text-gray-700"><strong>Ticket ID:</strong> {returnTicketId}</p>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Return QR Code</h4>
                      <div className="flex justify-center">
                        <QRCodeGenerator 
                          value={JSON.stringify({
                            ticketId: returnTicketId,
                            type: 'return',
                            date: bookingDetails.return.date,
                            time: bookingDetails.return.time,
                            from: bookingDetails.return.from,
                            to: bookingDetails.return.to,
                            guestCount: bookingDetails.guestCount,
                            guests: guestDetails.map(g => ({
                              name: g.name,
                              age: g.age,
                              idType: g.idType
                            }))
                          })}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center justify-center gap-2">
                    <User className="h-5 w-5 text-ocean-600" />
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {guestDetails.map((guest, index) => (
                      <div key={index} className="bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center">
                        <div className="mb-2">
                          <Avatar className="h-16 w-16">
                            {guest.photoUrl || guestPhotos[index] ? (
                              <AvatarImage src={guest.photoUrl || guestPhotos[index]} alt={guest.name} />
                            ) : (
                              <AvatarFallback className="bg-ocean-100 text-ocean-600">
                                {guest.name.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{guest.name}</p>
                          <p className="text-sm text-gray-500">Age: {guest.age}</p>
                          <p className="text-xs text-gray-400">{guest.idType}: {guest.idNumber}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                    Print Tickets
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
