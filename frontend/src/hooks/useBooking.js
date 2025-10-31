import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }

  return context;
}
