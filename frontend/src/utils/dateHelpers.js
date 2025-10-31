// Date utility functions for Equipment Booking System

// Format date to YYYY-MM-DD for input fields
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date to readable format (e.g., "Jan 1, 2024")
export const formatDateReadable = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-SG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format date with time (e.g., "Jan 1, 2024 at 10:30 AM")
export const formatDateTimeReadable = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-SG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get today's date in YYYY-MM-DD format
export const getTodayFormatted = () => {
  return formatDateForInput(new Date());
};

// Check if a date is in the past
export const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
};

// Check if a date is today
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

// Check if a date is in the future
export const isFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate > today;
};

// Calculate days between two dates
export const daysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Check if date range is valid (start <= end)
export const isValidDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return false;
  return new Date(startDate) <= new Date(endDate);
};

// Check if two date ranges overlap
export const dateRangesOverlap = (start1, end1, start2, end2) => {
  const s1 = new Date(start1);
  const e1 = new Date(end1);
  const s2 = new Date(start2);
  const e2 = new Date(end2);
  return s1 <= e2 && s2 <= e1;
};

// Add days to a date
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Get minimum date for booking (today or tomorrow)
export const getMinBookingDate = () => {
  return getTodayFormatted();
};

// Get maximum date for booking (e.g., 90 days from now)
export const getMaxBookingDate = (daysAhead = 90) => {
  return formatDateForInput(addDays(new Date(), daysAhead));
};

// Format duration (e.g., "3 days", "1 day")
export const formatDuration = (days) => {
  if (days === 1) return '1 day';
  return `${days} days`;
};

// Get status badge color based on booking status
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Get status display text
export const getStatusText = (status) => {
  const texts = {
    pending: 'Pending Approval',
    approved: 'Approved',
    rejected: 'Rejected',
    active: 'Active (Checked Out)',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return texts[status] || status;
};

// Validate date input
export const validateDate = (date, fieldName = 'Date') => {
  if (!date) {
    return { valid: false, error: `${fieldName} is required` };
  }

  if (isPastDate(date)) {
    return { valid: false, error: `${fieldName} cannot be in the past` };
  }

  return { valid: true, error: null };
};

// Validate date range
export const validateDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return { valid: false, error: 'Start date and end date are required' };
  }

  if (!isValidDateRange(startDate, endDate)) {
    return { valid: false, error: 'End date must be after start date' };
  }

  if (isPastDate(startDate)) {
    return { valid: false, error: 'Start date cannot be in the past' };
  }

  return { valid: true, error: null };
};
