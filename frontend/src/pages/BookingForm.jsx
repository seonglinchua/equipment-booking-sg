import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEquipment } from '../hooks/useEquipment';
import { useBooking } from '../hooks/useBooking';
import { formatDateForInput, formatDateReadable, daysBetween, getMinBookingDate, getMaxBookingDate } from '../utils/dateHelpers';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Badge from '../components/common/Badge';

export default function BookingForm() {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const { getEquipmentById } = useEquipment();
  const { createBooking, checkAvailability, isLoading } = useBooking();

  const equipment = getEquipmentById(equipmentId);

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    quantity: 1,
    purpose: '',
  });

  const [errors, setErrors] = useState({});
  const [availabilityInfo, setAvailabilityInfo] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!equipment) {
      navigate('/equipment');
    }
  }, [equipment, navigate]);

  // Check availability when dates or quantity change
  useEffect(() => {
    if (formData.startDate && formData.endDate && formData.quantity) {
      const result = checkAvailability(
        equipmentId,
        formData.startDate,
        formData.endDate,
        parseInt(formData.quantity)
      );
      setAvailabilityInfo(result);
    }
  }, [formData.startDate, formData.endDate, formData.quantity, equipmentId, checkAvailability]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }

    if (formData.quantity > equipment?.quantity) {
      newErrors.quantity = `Maximum ${equipment.quantity} units available`;
    }

    if (!formData.purpose || formData.purpose.trim().length < 10) {
      newErrors.purpose = 'Please provide a purpose (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    if (availabilityInfo && !availabilityInfo.available) {
      setErrorMessage(availabilityInfo.error);
      return;
    }

    const result = await createBooking({
      equipmentId: equipmentId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      quantity: parseInt(formData.quantity),
      purpose: formData.purpose,
    });

    if (result.success) {
      setSuccessMessage('Booking request submitted successfully! Awaiting admin approval.');
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } else {
      setErrorMessage(result.error);
    }
  };

  if (!equipment) {
    return null;
  }

  const duration = formData.startDate && formData.endDate
    ? daysBetween(formData.startDate, formData.endDate) + 1
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/equipment')}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Catalog
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book Equipment</h1>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <Alert type="success" message={successMessage} className="mb-6" />
        )}
        {errorMessage && (
          <Alert type="error" message={errorMessage} onClose={() => setErrorMessage('')} className="mb-6" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equipment Details */}
          <div className="lg:col-span-1">
            <Card>
              <img
                src={equipment.imageUrl}
                alt={equipment.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{equipment.name}</h2>
              <Badge variant="primary" className="mb-4">{equipment.category}</Badge>
              <p className="text-sm text-gray-600 mb-4">{equipment.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Units:</span>
                  <span className="font-medium">{equipment.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium text-green-600">{equipment.available}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 mr-2">Location:</span>
                  <span className="font-medium text-right">{equipment.location}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    min={getMinBookingDate()}
                    max={getMaxBookingDate()}
                    required
                    error={errors.startDate}
                  />

                  <Input
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={formData.startDate || getMinBookingDate()}
                    max={getMaxBookingDate()}
                    required
                    error={errors.endDate}
                  />
                </div>

                {duration > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Duration:</strong> {duration} {duration === 1 ? 'day' : 'days'}
                      {formData.startDate && formData.endDate && (
                        <span className="ml-2">
                          ({formatDateReadable(formData.startDate)} - {formatDateReadable(formData.endDate)})
                        </span>
                      )}
                    </p>
                  </div>
                )}

                <Input
                  label="Quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min={1}
                  max={equipment.quantity}
                  required
                  error={errors.quantity}
                  helperText={`Maximum ${equipment.quantity} units available`}
                />

                {/* Availability Check */}
                {availabilityInfo && (
                  <div className={`mb-4 p-3 rounded-lg ${availabilityInfo.available ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className={`text-sm ${availabilityInfo.available ? 'text-green-800' : 'text-red-800'}`}>
                      {availabilityInfo.available ? (
                        <>
                          <strong>Available:</strong> {availabilityInfo.availableQuantity} units available for your selected dates
                        </>
                      ) : (
                        <>
                          <strong>Not Available:</strong> {availabilityInfo.error}
                        </>
                      )}
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Booking <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Please describe how you plan to use this equipment..."
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.purpose ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>}
                </div>

                <Alert
                  type="info"
                  message="Your booking request will be reviewed by an administrator. You will be notified once approved."
                  className="mb-6"
                />

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/equipment')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || (availabilityInfo && !availabilityInfo.available)}
                    className="flex-1"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Booking Request'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
