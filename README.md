# Equipment Booking System - Singapore Education Institutions

A web-based equipment booking system for Singapore education institutions, built with React and localStorage for Phase 1, with plans to add a backend in Phase 2.

## 🚀 Project Status

**Phase 1: Frontend + localStorage** (Current)
- React 18 + Vite
- React Router v6
- Tailwind CSS
- localStorage for state persistence
- No backend dependencies

**Phase 2: Backend Integration** (Planned)
- Node.js/Express backend
- MongoDB/PostgreSQL database
- JWT authentication
- RESTful API

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Data Flow](#data-flow)
- [Mock Data](#mock-data)
- [Implementation Style Guide](#implementation-style-guide)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing Your Work](#testing-your-work)
- [Development Workflow](#development-workflow)

---

## 🛠 Tech Stack

### Frontend (Phase 1)
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Client-side data persistence

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 🏗 Architecture Overview

### How Data Flows

```
User Interaction
      ↓
UI Component
      ↓
Context Hook (useAuth, useEquipment, useBooking)
      ↓
Context Updates State + localStorage
      ↓
Component Re-renders with New Data
      ↓
Data Persists Across Page Refreshes
```

### State Management Pattern

1. **User interacts with UI** - Clicks button, submits form, etc.
2. **Component calls context hook** - `useAuth()`, `useEquipment()`, `useBooking()`
3. **Context updates state & localStorage** - Saves to both in-memory state and localStorage
4. **Component re-renders with new data** - React updates UI
5. **Data persists across page refreshes** - localStorage ensures data survives browser restarts

---

## 📦 Mock Data

Since we're in Phase 1 without a backend, all data is mocked:

### Equipment
- 3 sample items defined in `EquipmentContext`
- Example: Laptops, Projectors, Cameras
- Each has: id, name, description, quantity, category, image

### Users
- Auto-created on login/register
- Stored in localStorage under `equipment_booking_users` key
- Contains: id, email, password (hashed client-side), role (student/teacher/admin)

### Bookings
- Created in-memory when user makes a booking
- Persisted to localStorage under `equipment_booking_bookings` key
- Contains: id, equipmentId, userId, startDate, endDate, status, etc.

---

## 📝 Implementation Style Guide

### Component Guidelines

✅ **DO:**
- Use functional components only (no class components)
- Use React hooks for state management
- Keep components under 300 lines
- Create reusable components where possible
- Use Tailwind CSS for all styling
- Add prop validation with PropTypes or TypeScript (if adopted)

❌ **DON'T:**
- Don't use class components
- Don't exceed 300 lines per component
- Don't use inline styles (use Tailwind)
- Don't create duplicate components

### Code Style

```jsx
// ✅ Good Example
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      {/* Form content */}
    </form>
  );
}
```

### Naming Conventions

- **Components**: PascalCase (`LoginPage.jsx`, `EquipmentCard.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.js`, `useBooking.js`)
- **Contexts**: PascalCase with 'Context' suffix (`AuthContext.jsx`)
- **Utils**: camelCase (`storage.js`, `dateHelpers.js`)

---

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ and npm installed
- Git installed

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/equipment-booking-sg.git
cd equipment-booking-sg

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

---

## 📁 Project Structure

```
equipment-booking-sg/
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── common/          # Common components (Button, Card, etc.)
│   │   │   ├── equipment/       # Equipment-specific components
│   │   │   └── booking/         # Booking-specific components
│   │   ├── pages/               # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── EquipmentCatalog.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/             # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── EquipmentContext.jsx
│   │   │   └── BookingContext.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useEquipment.js
│   │   │   └── useBooking.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── storage.js       # localStorage helpers
│   │   │   └── dateHelpers.js   # Date formatting utilities
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # App entry point
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

---

## 🧪 Testing Your Work

### Manual Testing Checklist

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Navigate to http://localhost:5173**

3. **Test User Registration**
   - Go to Register page
   - Fill out form (email, password, role)
   - Submit and verify user is created
   - Check localStorage: F12 → Application → Local Storage → `equipment_booking_users`

4. **Test Login**
   - Use registered credentials
   - Verify redirect to dashboard/home
   - Check auth state persists on refresh

5. **Test Equipment Browsing**
   - Navigate to Equipment Catalog
   - Verify 3 sample items display
   - Test search/filter functionality

6. **Test Booking Creation**
   - Select an equipment item
   - Fill out booking form (dates, quantity)
   - Submit and verify booking created
   - Check localStorage: `equipment_booking_bookings`

7. **Test My Bookings**
   - Navigate to My Bookings page
   - Verify your bookings display
   - Test cancel booking functionality

8. **Test Admin Dashboard** (if role = admin)
   - Navigate to Admin Dashboard
   - Verify pending approvals display
   - Test approve/reject functionality
   - Test checkout/return functionality

9. **Test Data Persistence**
   - Refresh the page (F5)
   - Verify all data persists
   - Close browser and reopen
   - Verify data still exists

### localStorage Keys

The app uses these localStorage keys:

```javascript
'equipment_booking_users'      // User accounts
'equipment_booking_bookings'   // All bookings
'equipment_booking_auth'       // Current authenticated user
'equipment_booking_equipment'  // Equipment inventory (optional)
```

---

## ✅ Step-by-Step Setup Summary

| Step | Action | Estimated Time |
|------|--------|----------------|
| 1 | Create `frontend/package.json` with dependencies | 2 min |
| 2 | Create `utils/storage.js` for localStorage helpers | 5 min |
| 3 | Create `context/AuthContext.jsx` for authentication | 5 min |
| 4 | Create `context/EquipmentContext.jsx` for equipment data | 5 min |
| 5 | Create `context/BookingContext.jsx` for bookings | 5 min |
| 6 | Update `App.jsx` with routes and providers | 5 min |
| 7 | Create custom hooks (`useAuth`, `useEquipment`, `useBooking`) | 5 min |
| 8 | Create page component templates (6 pages) | 5 min |
| 9 | Install dependencies (`npm install`) and test | 10 min |
| 10 | Commit and push to GitHub | 2 min |
| **TOTAL** | **Ready for Development** | **≈ 50 min** |

---

## 🎯 Development Workflow

### Working with Claude Code

Example prompt for Claude Code to build the frontend:

```
"Build all frontend pages for equipment booking system using React, React Router,
and localStorage for state management. Use existing contexts (AuthContext,
EquipmentContext, BookingContext) for state.

Create these pages:
1. Login - email/password form with validation
2. Register - signup form with role selection (student/teacher/admin)
3. Equipment catalog - grid of equipment with search/filter
4. Booking form - date picker and booking creation with validation
5. My Bookings - list of user's bookings with cancel option
6. Admin Dashboard - pending approvals and checkout/return functionality

Use Tailwind CSS for styling. Mock data for equipment and users is already in contexts.
Data should persist in localStorage. Follow the implementation style guide."
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add login page component"

# Push to remote
git push -u origin feature/your-feature-name

# Create pull request on GitHub
```

### Commit Message Convention

Follow conventional commits:

```
feat: add new feature
fix: fix a bug
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code restructuring
test: adding tests
chore: updating build tasks, package manager configs, etc.
```

---

## 🔧 Common Tasks

### Adding a New Page

1. Create component in `src/pages/YourPage.jsx`
2. Add route in `App.jsx`
3. Create any required context/hooks
4. Style with Tailwind CSS
5. Test functionality and data persistence

### Adding localStorage Data

```javascript
// Use the storage utility
import { storage } from '../utils/storage';

// Save data
storage.set('your_key', yourData);

// Get data
const data = storage.get('your_key');

// Remove data
storage.remove('your_key');

// Clear all
storage.clear();
```

### Using Context Hooks

```javascript
// In your component
import { useAuth } from '../hooks/useAuth';
import { useEquipment } from '../hooks/useEquipment';
import { useBooking } from '../hooks/useBooking';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { equipment, getEquipmentById } = useEquipment();
  const { bookings, createBooking, cancelBooking } = useBooking();

  // Use the context data and methods
}
```

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [localStorage MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Happy Coding! 🚀**
