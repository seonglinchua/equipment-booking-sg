# Pages Directory

This directory contains all page-level components for the Equipment Booking System.

## Planned Pages

### Authentication
- `LoginPage.jsx` - User login form
- `RegisterPage.jsx` - User registration with role selection

### Equipment
- `EquipmentCatalog.jsx` - Browse and search equipment
- `EquipmentDetail.jsx` - View single equipment details

### Bookings
- `BookingForm.jsx` - Create new booking
- `MyBookings.jsx` - View user's bookings
- `BookingDetail.jsx` - View single booking details

### Admin
- `AdminDashboard.jsx` - Admin overview and pending approvals
- `AdminEquipment.jsx` - Manage equipment inventory
- `AdminUsers.jsx` - User management (optional)

### Other
- `Dashboard.jsx` - User dashboard/home page
- `NotFound.jsx` - 404 error page

## Design Guidelines

All pages must follow the [Design System](../../../docs/DESIGN_SYSTEM.md):

### Page Layout Structure
```jsx
<div className="min-h-screen bg-gray-50">
  <Navbar />

  <main className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">Page Title</h1>

    {/* Page content */}
  </main>

  <Footer />
</div>
```

### Key Guidelines
- Use `max-w-7xl mx-auto px-4 py-8` for main content container
- Include proper page titles (h1)
- Handle loading states
- Show error messages
- Make pages responsive
- Include proper navigation

## Context Usage

Pages should use React Context hooks for state management:

```jsx
import { useAuth } from '../hooks/useAuth';
import { useEquipment } from '../hooks/useEquipment';
import { useBooking } from '../hooks/useBooking';

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBooking();

  // Component logic
}
```

## Reference

- [Design System](../../../docs/DESIGN_SYSTEM.md)
- [Main README](../../../README.md)
