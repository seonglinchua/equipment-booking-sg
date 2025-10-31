# Utils Directory

This directory contains utility functions and helpers.

## Planned Utilities

### `storage.js`
localStorage helper functions with error handling.

```javascript
export const storage = {
  // Get item from localStorage
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  // Set item in localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  },

  // Remove item from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  // Clear all localStorage
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};
```

**localStorage Keys:**
- `equipment_booking_auth` - Current user session
- `equipment_booking_users` - All registered users
- `equipment_booking_equipment` - Equipment inventory
- `equipment_booking_bookings` - All bookings

---

### `dateHelpers.js`
Date formatting and validation utilities.

```javascript
// Format date to readable string
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format datetime to readable string
export function formatDateTime(date) {
  return new Date(date).toLocaleString('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Check if date is in the future
export function isFutureDate(date) {
  return new Date(date) > new Date();
}

// Check if date range is valid
export function isValidDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end && isFutureDate(start);
}

// Calculate duration in days
export function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
```

---

### `validation.js`
Form validation helpers.

```javascript
// Validate email format
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate password strength
export function validatePassword(password) {
  return password.length >= 6;
}

// Validate required field
export function validateRequired(value) {
  return value && value.trim().length > 0;
}

// Validate max length
export function validateMaxLength(value, maxLength) {
  return value.length <= maxLength;
}
```

---

### `mockData.js`
Mock data for development (Phase 1).

```javascript
export const mockEquipment = [
  {
    id: 1,
    name: 'Projector 4K',
    description: 'High-quality 4K projector for presentations',
    category: 'Audio/Visual',
    quantity: 3,
    available: 2,
    condition: 'Good',
    imageUrl: 'https://via.placeholder.com/400x300?text=Projector',
  },
  {
    id: 2,
    name: 'MacBook Pro',
    description: 'M1 MacBook Pro for development and design',
    category: 'Computers',
    quantity: 5,
    available: 3,
    condition: 'Excellent',
    imageUrl: 'https://via.placeholder.com/400x300?text=MacBook',
  },
  {
    id: 3,
    name: 'DSLR Camera',
    description: 'Canon EOS 90D with lens kit',
    category: 'Photography',
    quantity: 2,
    available: 1,
    condition: 'Good',
    imageUrl: 'https://via.placeholder.com/400x300?text=Camera',
  },
];

export const mockCategories = [
  'Audio/Visual',
  'Computers',
  'Photography',
  'Laboratory',
  'Sports',
  'Music',
];
```

---

## Usage

```jsx
// Storage
import { storage } from '../utils/storage';
const user = storage.get('equipment_booking_auth');

// Date helpers
import { formatDate, isValidDateRange } from '../utils/dateHelpers';
const formattedDate = formatDate(booking.startDate);

// Validation
import { validateEmail, validatePassword } from '../utils/validation';
const isValid = validateEmail(email) && validatePassword(password);

// Mock data
import { mockEquipment, mockCategories } from '../utils/mockData';
```

## Reference

- [Main README](../../../README.md)
