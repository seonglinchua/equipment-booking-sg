import { createContext, useState, useEffect, useContext } from 'react';
import { bookingStorage } from '../utils/storage';
import { validateDateRange, dateRangesOverlap } from '../utils/dateHelpers';
import { AuthContext } from './AuthContext';
import { EquipmentContext } from './EquipmentContext';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  const { getEquipmentById, updateAvailability } = useContext(EquipmentContext);

  // Initialize bookings from localStorage
  useEffect(() => {
    const storedBookings = bookingStorage.getAll();
    setBookings(storedBookings);
    setIsLoading(false);
  }, []);

  // Get all bookings
  const getAllBookings = () => {
    return bookings;
  };

  // Get booking by ID
  const getBookingById = (id) => {
    return bookings.find(booking => booking.id === id);
  };

  // Get user's bookings
  const getUserBookings = (userId = null) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return [];
    return bookings.filter(booking => booking.userId === targetUserId);
  };

  // Get bookings by equipment ID
  const getEquipmentBookings = (equipmentId) => {
    return bookings.filter(booking => booking.equipmentId === equipmentId);
  };

  // Get bookings by status
  const getBookingsByStatus = (status) => {
    return bookings.filter(booking => booking.status === status);
  };

  // Get pending bookings (for admin)
  const getPendingBookings = () => {
    return bookings.filter(booking => booking.status === 'pending');
  };

  // Get active bookings (checked out)
  const getActiveBookings = () => {
    return bookings.filter(booking => booking.status === 'active');
  };

  // Check if equipment is available for date range
  const checkAvailability = (equipmentId, startDate, endDate, quantity, excludeBookingId = null) => {
    const equipment = getEquipmentById(equipmentId);
    if (!equipment) {
      return { available: false, error: 'Equipment not found' };
    }

    if (quantity > equipment.quantity) {
      return { available: false, error: `Only ${equipment.quantity} units available in total` };
    }

    // Get all bookings for this equipment that overlap with the requested dates
    const overlappingBookings = bookings.filter(booking => {
      if (booking.equipmentId !== equipmentId) return false;
      if (booking.id === excludeBookingId) return false; // Exclude current booking when editing
      if (booking.status === 'cancelled' || booking.status === 'rejected') return false;

      return dateRangesOverlap(startDate, endDate, booking.startDate, booking.endDate);
    });

    // Calculate how many units are booked during this period
    const bookedQuantity = overlappingBookings.reduce((sum, booking) => sum + booking.quantity, 0);
    const availableQuantity = equipment.quantity - bookedQuantity;

    if (quantity > availableQuantity) {
      return {
        available: false,
        error: `Only ${availableQuantity} units available for this date range`,
        availableQuantity
      };
    }

    return { available: true, availableQuantity };
  };

  // Create new booking
  const createBooking = async (bookingData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('You must be logged in to make a booking');
      }

      // Validate required fields
      if (!bookingData.equipmentId || !bookingData.startDate || !bookingData.endDate || !bookingData.quantity) {
        throw new Error('All fields are required');
      }

      // Validate date range
      const dateValidation = validateDateRange(bookingData.startDate, bookingData.endDate);
      if (!dateValidation.valid) {
        throw new Error(dateValidation.error);
      }

      // Check availability
      const availability = checkAvailability(
        bookingData.equipmentId,
        bookingData.startDate,
        bookingData.endDate,
        bookingData.quantity
      );

      if (!availability.available) {
        throw new Error(availability.error);
      }

      // Get equipment details
      const equipment = getEquipmentById(bookingData.equipmentId);
      if (!equipment) {
        throw new Error('Equipment not found');
      }

      // Create booking
      const newBooking = bookingStorage.add({
        ...bookingData,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        equipmentName: equipment.name,
        status: 'pending', // Always start as pending, requires admin approval
      });

      setBookings(prev => [...prev, newBooking]);
      setIsLoading(false);
      return { success: true, booking: newBooking };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Update booking
  const updateBooking = async (bookingId, updates) => {
    setIsLoading(true);
    setError(null);

    try {
      const booking = getBookingById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      // If updating dates/quantity, check availability
      if (updates.startDate || updates.endDate || updates.quantity) {
        const startDate = updates.startDate || booking.startDate;
        const endDate = updates.endDate || booking.endDate;
        const quantity = updates.quantity || booking.quantity;

        const availability = checkAvailability(
          booking.equipmentId,
          startDate,
          endDate,
          quantity,
          bookingId // Exclude current booking from check
        );

        if (!availability.available) {
          throw new Error(availability.error);
        }
      }

      const updated = bookingStorage.update(bookingId, updates);
      if (!updated) {
        throw new Error('Failed to update booking');
      }

      setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
      setIsLoading(false);
      return { success: true, booking: updated };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Cancel booking (user)
  const cancelBooking = async (bookingId) => {
    setIsLoading(true);
    setError(null);

    try {
      const booking = getBookingById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      // Check if user owns this booking or is admin
      if (booking.userId !== user?.id && user?.role !== 'admin') {
        throw new Error('You can only cancel your own bookings');
      }

      // Cannot cancel active or completed bookings
      if (booking.status === 'active') {
        throw new Error('Cannot cancel an active booking. Please return the equipment first.');
      }

      if (booking.status === 'completed') {
        throw new Error('Cannot cancel a completed booking');
      }

      const updated = bookingStorage.cancel(bookingId);
      setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
      setIsLoading(false);
      return { success: true, booking: updated };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Approve booking (admin)
  const approveBooking = async (bookingId) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user?.role !== 'admin') {
        throw new Error('Only admins can approve bookings');
      }

      const booking = getBookingById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status !== 'pending') {
        throw new Error('Only pending bookings can be approved');
      }

      const updated = bookingStorage.approve(bookingId);
      setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
      setIsLoading(false);
      return { success: true, booking: updated };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Reject booking (admin)
  const rejectBooking = async (bookingId, reason = '') => {
    setIsLoading(true);
    setError(null);

    try {
      if (user?.role !== 'admin') {
        throw new Error('Only admins can reject bookings');
      }

      const booking = getBookingById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status !== 'pending') {
        throw new Error('Only pending bookings can be rejected');
      }

      const updated = bookingStorage.reject(bookingId, reason);
      setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
      setIsLoading(false);
      return { success: true, booking: updated };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Checkout equipment (admin)
  const checkoutBooking = async (bookingId) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user?.role !== 'admin') {
        throw new Error('Only admins can checkout equipment');
      }

      const booking = getBookingById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status !== 'approved') {
        throw new Error('Only approved bookings can be checked out');
      }

      // Update equipment availability
      const availabilityResult = updateAvailability(booking.equipmentId, -booking.quantity);
      if (!availabilityResult.success) {
        throw new Error(availabilityResult.error);
      }

      const updated = bookingStorage.checkout(bookingId);
      setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
      setIsLoading(false);
      return { success: true, booking: updated };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Return equipment (admin)
  const returnBooking = async (bookingId) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user?.role !== 'admin') {
        throw new Error('Only admins can process returns');
      }

      const booking = getBookingById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.status !== 'active') {
        throw new Error('Only active bookings can be returned');
      }

      // Update equipment availability
      const availabilityResult = updateAvailability(booking.equipmentId, booking.quantity);
      if (!availabilityResult.success) {
        throw new Error(availabilityResult.error);
      }

      const updated = bookingStorage.return(bookingId);
      setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
      setIsLoading(false);
      return { success: true, booking: updated };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Delete booking (admin only)
  const deleteBooking = async (bookingId) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user?.role !== 'admin') {
        throw new Error('Only admins can delete bookings');
      }

      bookingStorage.delete(bookingId);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const value = {
    bookings,
    isLoading,
    error,
    getAllBookings,
    getBookingById,
    getUserBookings,
    getEquipmentBookings,
    getBookingsByStatus,
    getPendingBookings,
    getActiveBookings,
    checkAvailability,
    createBooking,
    updateBooking,
    cancelBooking,
    approveBooking,
    rejectBooking,
    checkoutBooking,
    returnBooking,
    deleteBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
