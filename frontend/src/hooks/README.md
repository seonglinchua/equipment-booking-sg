# Hooks Directory

This directory contains custom React hooks for accessing context and reusable logic.

## Planned Hooks

### `useAuth.js`
Access authentication context.

```jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Returns:**
- `user` - Current user object or null
- `isAuthenticated` - Boolean
- `isLoading` - Boolean
- `login(email, password)` - Login function
- `register(email, password, name, role)` - Register function
- `logout()` - Logout function

---

### `useEquipment.js`
Access equipment context.

```jsx
import { useContext } from 'react';
import { EquipmentContext } from '../context/EquipmentContext';

export function useEquipment() {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment must be used within EquipmentProvider');
  }
  return context;
}
```

**Returns:**
- `equipment` - Array of equipment items
- `categories` - Array of categories
- `getEquipmentById(id)` - Get single item
- `searchEquipment(query)` - Search function
- `filterByCategory(category)` - Filter function
- `addEquipment(data)` - Add new equipment (admin)
- `updateEquipment(id, data)` - Update equipment (admin)

---

### `useBooking.js`
Access booking context.

```jsx
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
```

**Returns:**
- `bookings` - Array of all bookings
- `userBookings` - Current user's bookings
- `pendingApprovals` - Bookings needing approval (admin)
- `createBooking(equipmentId, startDate, endDate, purpose)` - Create booking
- `cancelBooking(bookingId)` - Cancel booking
- `approveBooking(bookingId)` - Approve booking (admin)
- `rejectBooking(bookingId, reason)` - Reject booking (admin)
- `checkoutEquipment(bookingId)` - Mark as checked out (admin)
- `returnEquipment(bookingId)` - Mark as returned (admin)

---

## Usage in Components

```jsx
import { useAuth } from '../hooks/useAuth';
import { useEquipment } from '../hooks/useEquipment';
import { useBooking } from '../hooks/useBooking';

export default function MyBookings() {
  const { user } = useAuth();
  const { getEquipmentById } = useEquipment();
  const { userBookings, cancelBooking } = useBooking();

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      alert('Booking cancelled successfully');
    } catch (error) {
      alert('Failed to cancel booking');
    }
  };

  return (
    <div>
      {userBookings.map(booking => (
        <div key={booking.id}>
          <h3>{getEquipmentById(booking.equipmentId).name}</h3>
          <button onClick={() => handleCancel(booking.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}
```

## Reference

- [Context README](../context/README.md)
- [Main README](../../../README.md)
