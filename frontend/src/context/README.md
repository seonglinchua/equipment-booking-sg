# Context Directory

This directory contains all React Context providers for global state management.

## Planned Contexts

### `AuthContext.jsx`
Manages authentication state and user data.

**State:**
- Current user (id, email, role)
- isAuthenticated
- isLoading

**Methods:**
- `login(email, password)`
- `register(email, password, name, role)`
- `logout()`

**localStorage key:** `equipment_booking_auth`

---

### `EquipmentContext.jsx`
Manages equipment inventory data.

**State:**
- Equipment list
- Categories
- Search/filter state

**Methods:**
- `getEquipmentById(id)`
- `searchEquipment(query)`
- `filterByCategory(category)`
- `addEquipment(data)` (admin)
- `updateEquipment(id, data)` (admin)

**localStorage key:** `equipment_booking_equipment`

---

### `BookingContext.jsx`
Manages booking data and operations.

**State:**
- All bookings
- User's bookings
- Pending approvals (admin)

**Methods:**
- `createBooking(equipmentId, startDate, endDate, purpose)`
- `cancelBooking(bookingId)`
- `approveBooking(bookingId)` (admin)
- `rejectBooking(bookingId, reason)` (admin)
- `checkoutEquipment(bookingId)` (admin)
- `returnEquipment(bookingId)` (admin)

**localStorage key:** `equipment_booking_bookings`

---

## Context Pattern

```jsx
import { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = storage.get('equipment_booking_auth');
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Login logic
    const user = { id: 1, email, role: 'student' };
    setUser(user);
    storage.set('equipment_booking_auth', user);
  };

  const logout = () => {
    setUser(null);
    storage.remove('equipment_booking_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Usage in App.jsx

```jsx
import { AuthProvider } from './context/AuthContext';
import { EquipmentProvider } from './context/EquipmentContext';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <AuthProvider>
      <EquipmentProvider>
        <BookingProvider>
          <RouterProvider router={router} />
        </BookingProvider>
      </EquipmentProvider>
    </AuthProvider>
  );
}
```

## Reference

- [Main README](../../../README.md)
- [localStorage Pattern](../utils/README.md)
