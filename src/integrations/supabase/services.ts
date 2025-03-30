
import { supabase } from './client';

export type Boat = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  price_per_hour: number;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  created_at: string;
}

export type Deal = {
  id: string;
  title: string;
  description: string;
  original_price: number;
  discounted_price: number;
  location: string;
  image_url: string;
  valid_until: string;
  created_at: string;
}

export type BookingGuest = {
  id: string;
  booking_id: string;
  name: string;
  age: string;
  id_type: string;
  id_number: string;
  photo_path: string | null;
  created_at: string;
}

// Journey details type with complete information
export type JourneyDetails = {
  date: string;
  time: string;
  from: string;
  to: string;
  price: number;
  duration: number;
  departureTime?: string;
  arrivalTime?: string;
}

export async function fetchBoats() {
  const { data, error } = await supabase
    .from('boats')
    .select('*');
  
  if (error) {
    console.error('Error fetching boats:', error);
    return [];
  }
  
  return data as Boat[];
}

export async function fetchDeals() {
  const { data, error } = await supabase
    .from('deals')
    .select('*');
  
  if (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
  
  return data as Deal[];
}

export async function fetchBookingWithGuests(bookingId: string) {
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();
  
  if (bookingError) {
    console.error('Error fetching booking:', bookingError);
    return null;
  }
  
  const { data: guests, error: guestsError } = await supabase
    .from('booking_guests')
    .select('*')
    .eq('booking_id', bookingId);
  
  if (guestsError) {
    console.error('Error fetching booking guests:', guestsError);
    return { ...booking, guests: [] };
  }
  
  return { ...booking, guests };
}
