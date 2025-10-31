import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking';
import { useAuth } from '../hooks/useAuth';
import { formatDateReadable, daysBetween, getStatusColor, getStatusText } from '../utils/dateHelpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';

export default function MyBookings() {
  const { user } = useAuth();
  const { getUserBookings, cancelBooking, isLoading } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const userBookings = getUserBookings(user?.id);

  // Filter bookings based on status
  const filteredBookings = userBookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['pending', 'approved', 'active'].includes(booking.status);
    if (filter === 'completed') return ['completed', 'cancelled', 'rejected'].includes(booking.status);
    return booking.status === filter;
  });

  // Sort bookings by creation date (newest first)
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    const result = await cancelBooking(selectedBooking.id);

    if (result.success) {
      setSuccessMessage('Booking cancelled successfully');
      setShowCancelModal(false);
      setSelectedBooking(null);
    } else {
      setErrorMessage(result.error);
    }
  };

  const canCancelBooking = (booking) => {
    return ['pending', 'approved'].includes(booking.status);
  };

  if (isLoading && userBookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your equipment bookings</p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} className="mb-6" />
        )}
        {errorMessage && (
          <Alert type="error" message={errorMessage} onClose={() => setErrorMessage('')} className="mb-6" />
        )}

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'completed', label: 'Completed' },
          ].map((tab) => (
            <Button
              key={tab.value}
              variant={filter === tab.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Bookings List */}
        {sortedBookings.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {filter !== 'all'
                  ? `You don't have any ${filter} bookings.`
                  : "You haven't made any bookings yet."}
              </p>
              <Link to="/equipment">
                <Button>Browse Equipment</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedBookings.map((booking) => (
              <Card key={booking.id} hover className="transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.equipmentName}
                      </h3>
                      <Badge variant={getStatusColor(booking.status).includes('yellow') ? 'warning' :
                                     getStatusColor(booking.status).includes('green') ? 'success' :
                                     getStatusColor(booking.status).includes('red') ? 'danger' :
                                     getStatusColor(booking.status).includes('blue') ? 'info' : 'default'}>
                        {getStatusText(booking.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                          {formatDateReadable(booking.startDate)} - {formatDateReadable(booking.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {daysBetween(booking.startDate, booking.endDate) + 1} days
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span>Quantity: {booking.quantity}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Created: {formatDateReadable(booking.createdAt)}</span>
                      </div>
                    </div>

                    {booking.purpose && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">
                          <strong>Purpose:</strong> {booking.purpose}
                        </p>
                      </div>
                    )}

                    {booking.rejectionReason && (
                      <div className="mt-2">
                        <Alert
                          type="error"
                          message={`Rejection reason: ${booking.rejectionReason}`}
                          className="mb-0"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:ml-4">
                    {canCancelBooking(booking) && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelClick(booking)}
                        disabled={isLoading}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        <Modal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          title="Cancel Booking"
          size="sm"
        >
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this booking?
            </p>
            {selectedBooking && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">{selectedBooking.equipmentName}</p>
                <p className="text-sm text-gray-600">
                  {formatDateReadable(selectedBooking.startDate)} - {formatDateReadable(selectedBooking.endDate)}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCancelModal(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              onClick={handleCancelConfirm}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Cancelling...' : 'Yes, Cancel'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
