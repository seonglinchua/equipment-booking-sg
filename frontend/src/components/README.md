# Components Directory

This directory contains all reusable React components for the Equipment Booking System.

## Structure

```
components/
├── common/          # Shared UI components (buttons, cards, inputs, etc.)
├── equipment/       # Equipment-specific components
└── booking/         # Booking-specific components
```

## Design System

**IMPORTANT:** All components must follow the [Design System Guidelines](../../../docs/DESIGN_SYSTEM.md).

### Key Guidelines:
- Use Tailwind CSS classes only (no custom CSS)
- Follow the color palette (blue-600 for primary, green-600 for success, etc.)
- Use proper spacing (p-4, gap-4, mb-6)
- Include loading and error states
- Make components responsive
- Include proper accessibility attributes

## Component Structure

```jsx
// Example component following design system
export default function Button({ children, variant = 'primary', onClick, disabled }) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} px-4 py-2 rounded-lg font-medium transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
}
```

## Creating New Components

1. Check if a similar component exists in `common/`
2. Follow the design system patterns
3. Keep components under 200 lines
4. Use PropTypes or TypeScript for type safety
5. Add proper documentation

## Common Components to Create

- `Button.jsx` - Reusable button with variants
- `Card.jsx` - Standard card layout
- `Input.jsx` - Form input with validation
- `Badge.jsx` - Status badges
- `Alert.jsx` - Notification alerts
- `Modal.jsx` - Dialog/modal component
- `Navbar.jsx` - Navigation bar
- `LoadingSpinner.jsx` - Loading state indicator

## Reference

See [Design System](../../../docs/DESIGN_SYSTEM.md) for complete component patterns and examples.
