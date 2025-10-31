import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';
import { formatDateReadable, getStatusColor, getStatusText } from '../utils/dateHelpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';

export default function AdminDashboard() {
  const { user } = useAuth();
  const {
    getAllBookings,
    getPendingBookings,
    getActiveBookings,
    approveBooking,
    rejectBooking,
    checkoutBooking,
    returnBooking,
    isLoading,
  } = useBooking();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-red-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
          </div>
        </Card>
      </div>
    );
  }

  const allBookings = getAllBookings();
  const pendingBookings = getPendingBookings();
  const activeBookings = getActiveBookings();
  const approvedBookings = allBookings.filter(b => b.status === 'approved');

  // Get bookings for active tab
  const getTabBookings = () => {
    switch (activeTab) {
      case 'pending':
        return pendingBookings;
      case 'approved':
        return approvedBookings;
      case 'active':
        return activeBookings;
      case 'all':
        return allBookings;
      default:
        return [];
    }
  };

  const tabBookings = getTabBookings().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleApprove = async (bookingId) => {
    setSuccessMessage('');
    setErrorMessage('');

    const result = await approveBooking(bookingId);
    if (result.success) {
      setSuccessMessage('Booking approved successfully');
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleRejectClick = (booking) => {
    setSelectedBooking(booking);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    const result = await rejectBooking(selectedBooking.id, rejectionReason);
    if (result.success) {
      setSuccessMessage('Booking rejected');
      setShowRejectModal(false);
      setSelectedBooking(null);
      setRejectionReason('');
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleCheckoutClick = (booking) => {
    setSelectedBooking(booking);
    setShowCheckoutModal(true);
  };

  const handleCheckoutConfirm = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    const result = await checkoutBooking(selectedBooking.id);
    if (result.success) {
      setSuccessMessage('Equipment checked out successfully');
      setShowCheckoutModal(false);
      setSelectedBooking(null);
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleReturnClick = (booking) => {
    setSelectedBooking(booking);
    setShowReturnModal(true);
  };

  const handleReturnConfirm = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    const result = await returnBooking(selectedBooking.id);
    if (result.success) {
      setSuccessMessage('Equipment returned successfully');
      setShowReturnModal(false);
      setSelectedBooking(null);
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage bookings and equipment</p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} className="mb-6" />
        )}
        {errorMessage && (
          <Alert type="error" message={errorMessage} onClose={() => setErrorMessage('')} className="mb-6" />
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Pending Approval</p>
                <p className="text-3xl font-bold text-yellow-900">{pendingBookings.length}</p>
              </div>
              <div className="p-3 bg-yellow-200 rounded-full">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Approved</p>
                <p className="text-3xl font-bold text-green-900">{approvedBookings.length}</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Active (Checked Out)</p>
                <p className="text-3xl font-bold text-blue-900">{activeBookings.length}</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{allBookings.length}</p>
              </div>
              <div className="p-3 bg-gray-200 rounded-full">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { value: 'pending', label: `Pending (${pendingBookings.length})` },
            { value: 'approved', label: `Approved (${approvedBookings.length})` },
            { value: 'active', label: `Active (${activeBookings.length})` },
            { value: 'all', label: 'All Bookings' },
          ].map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Bookings List */}
        {tabBookings.length === 0 ? (
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
              <p className="text-gray-600">There are no {activeTab} bookings at the moment.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {tabBookings.map((booking) => (
              <Card key={booking.id} hover>
                <div className="flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <strong>User:</strong> {booking.userName} ({booking.userEmail})
                        </div>
                        <div>
                          <strong>Dates:</strong> {formatDateReadable(booking.startDate)} - {formatDateReadable(booking.endDate)}
                        </div>
                        <div>
                          <strong>Quantity:</strong> {booking.quantity}
                        </div>
                        <div>
                          <strong>Created:</strong> {formatDateReadable(booking.createdAt)}
                        </div>
                        {booking.checkedOutAt && (
                          <div>
                            <strong>Checked Out:</strong> {formatDateReadable(booking.checkedOutAt)}
                          </div>
                        )}
                        {booking.returnedAt && (
                          <div>
                            <strong>Returned:</strong> {formatDateReadable(booking.returnedAt)}
                          </div>
                        )}
                      </div>

                      {booking.purpose && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <strong>Purpose:</strong> {booking.purpose}
                          </p>
                        </div>
                      )}

                      {booking.rejectionReason && (
                        <div className="mt-3">
                          <Alert type="error" message={`Rejection reason: ${booking.rejectionReason}`} className="mb-0" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(booking.id)}
                          disabled={isLoading}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRejectClick(booking)}
                          disabled={isLoading}
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    {booking.status === 'approved' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleCheckoutClick(booking)}
                        disabled={isLoading}
                      >
                        Check Out Equipment
                      </Button>
                    )}

                    {booking.status === 'active' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleReturnClick(booking)}
                        disabled={isLoading}
                      >
                        Mark as Returned
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Reject Modal */}
        <Modal
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          title="Reject Booking"
          size="md"
        >
          <div className="mb-6">
            {selectedBooking && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-900 mb-1">{selectedBooking.equipmentName}</p>
                <p className="text-sm text-gray-600">
                  User: {selectedBooking.userName}
                </p>
              </div>
            )}

            <Input
              label="Reason for Rejection"
              type="text"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              helperText="Optional: Provide a reason for the user"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRejectModal(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleRejectConfirm}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Rejecting...' : 'Reject Booking'}
            </Button>
          </div>
        </Modal>

        {/* Checkout Modal */}
        <Modal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          title="Check Out Equipment"
          size="sm"
        >
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Confirm equipment checkout?
            </p>
            {selectedBooking && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900 mb-1">{selectedBooking.equipmentName}</p>
                <p className="text-sm text-gray-600 mb-1">
                  User: {selectedBooking.userName}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {selectedBooking.quantity} units
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCheckoutModal(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCheckoutConfirm}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Checkout'}
            </Button>
          </div>
        </Modal>

        {/* Return Modal */}
        <Modal
          isOpen={showReturnModal}
          onClose={() => setShowReturnModal(false)}
          title="Return Equipment"
          size="sm"
        >
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Confirm equipment return?
            </p>
            {selectedBooking && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900 mb-1">{selectedBooking.equipmentName}</p>
                <p className="text-sm text-gray-600 mb-1">
                  User: {selectedBooking.userName}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {selectedBooking.quantity} units
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowReturnModal(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleReturnConfirm}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Return'}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
