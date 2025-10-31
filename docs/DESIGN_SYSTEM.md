# Equipment Booking System - Design System

Complete UI/UX guidelines for Claude Code to maintain consistency across all components.

---

## 🎨 Color Palette

### Primary Colors
```
Blue (Primary Action)
  Light: #3B82F6 (blue-500)
  Normal: #2563EB (blue-600)
  Dark: #1D4ED8 (blue-700)
  Hover: #1E40AF (blue-800)

Green (Success/Available)
  Light: #10B981 (green-500)
  Normal: #059669 (green-600)
  Dark: #047857 (green-700)

Red (Danger/Reject)
  Light: #EF4444 (red-500)
  Normal: #DC2626 (red-600)
  Dark: #B91C1C (red-700)

Yellow (Warning/Pending)
  Light: #FBBF24 (amber-400)
  Normal: #F59E0B (amber-500)
  Dark: #D97706 (amber-600)

Gray (Neutral)
  50: #F9FAFB
  100: #F3F4F6
  200: #E5E7EB
  300: #D1D5DB
  400: #9CA3AF
  500: #6B7280
  600: #4B5563
  700: #374151
  800: #1F2937
  900: #111827
```

### Color Usage
```
Buttons:        Primary blue (blue-600)
Success:        Green (green-600)
Danger:         Red (red-600)
Warning:        Yellow (amber-500)
Info:           Blue (blue-500)
Background:     Gray-50
Card:           White (gray-0)
Text Primary:   Gray-900
Text Secondary: Gray-600
Borders:        Gray-200
Hover:          Gray-100
```

---

## 📝 Typography

### Font Family
```
Font Stack: 'Inter', 'Segoe UI', 'Roboto', sans-serif
(Already available via Tailwind defaults)
```

### Type Scale
```
Heading 1 (Page Title)
  Size: 32px (text-4xl)
  Weight: 700 (bold)
  Line Height: 40px (leading-10)
  Letter Spacing: -0.5px
  Example: "Equipment Booking System"

Heading 2 (Section Title)
  Size: 24px (text-2xl)
  Weight: 700 (bold)
  Line Height: 32px (leading-8)
  Example: "My Bookings"

Heading 3 (Card Title)
  Size: 20px (text-xl)
  Weight: 600 (semibold)
  Line Height: 28px (leading-7)
  Example: "Projector 4K"

Body Large
  Size: 16px (text-base)
  Weight: 400 (normal)
  Line Height: 24px (leading-6)
  Usage: Body text, descriptions

Body Normal
  Size: 14px (text-sm)
  Weight: 400 (normal)
  Line Height: 20px (leading-5)
  Usage: Secondary text, labels

Body Small
  Size: 12px (text-xs)
  Weight: 400 (normal)
  Line Height: 16px (leading-4)
  Usage: Captions, helper text

Code
  Font: 'Courier New', monospace
  Size: 13px (text-sm)
  Family: font-mono
```

### Tailwind Classes
```jsx
<h1 className="text-4xl font-bold leading-10 text-gray-900">Page Title</h1>
<h2 className="text-2xl font-bold leading-8 text-gray-900">Section Title</h2>
<h3 className="text-xl font-semibold leading-7 text-gray-900">Card Title</h3>
<p className="text-base leading-6 text-gray-900">Body text</p>
<p className="text-sm leading-5 text-gray-600">Secondary text</p>
<p className="text-xs leading-4 text-gray-500">Helper text</p>
```

---

## 🎯 Spacing System

### Base Unit: 4px
```
xs:   4px  (1 unit)
sm:   8px  (2 units)
md:   16px (4 units)
lg:   24px (6 units)
xl:   32px (8 units)
2xl:  48px (12 units)
3xl:  64px (16 units)
```

### Tailwind Mapping
```
p-1 = 4px    (small padding)
p-2 = 8px    (default padding)
p-3 = 12px
p-4 = 16px   (most common padding)
p-6 = 24px   (large padding)
p-8 = 32px   (extra large padding)

m-1 = 4px
m-2 = 8px
m-3 = 12px
m-4 = 16px   (most common margin)
m-6 = 24px
m-8 = 32px

gap-2 = 8px    (tight gap)
gap-4 = 16px   (normal gap)
gap-6 = 24px   (loose gap)
```

### Usage Rules
```
Page padding:       p-6 or p-8
Card padding:       p-4 or p-6
Button padding:     px-4 py-2
Form field spacing: gap-4 or space-y-4
Grid gaps:          gap-4 (16px)
Section margin:     mb-8 or my-12
```

---

## 🔘 Component Library

### Buttons

#### Primary Button (Main Action)
```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
  Book Equipment
</button>
```

#### Secondary Button (Alternative Action)
```jsx
<button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors">
  Cancel
</button>
```

#### Success Button (Confirm/Save)
```jsx
<button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
  Approve
</button>
```

#### Danger Button (Destructive)
```jsx
<button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
  Delete
</button>
```

#### Small Button
```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
  View
</button>
```

#### Button States
```jsx
// Disabled
<button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg font-medium">
  Disabled
</button>

// Loading
<button disabled className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
  <span className="inline-block animate-spin mr-2">⟳</span>
  Loading...
</button>

// Full Width
<button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
  Full Width Button
</button>
```

---

### Input Fields

#### Text Input
```jsx
<input
  type="text"
  placeholder="Enter equipment name"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
```

#### Email Input
```jsx
<input
  type="email"
  placeholder="your@email.com"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
```

#### Password Input
```jsx
<input
  type="password"
  placeholder="••••••••"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
```

#### Date Input
```jsx
<input
  type="datetime-local"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
```

#### Textarea
```jsx
<textarea
  placeholder="Enter booking purpose..."
  rows="4"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
/>
```

#### Select Dropdown
```jsx
<select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
  <option>Select category</option>
  <option>Audio/Visual</option>
  <option>Laboratory</option>
  <option>Sports</option>
</select>
```

#### Input with Label
```jsx
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-gray-700">Equipment Name</label>
  <input
    type="text"
    placeholder="Enter name"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
  <p className="text-xs text-gray-500">Maximum 50 characters</p>
</div>
```

#### Input with Error
```jsx
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-gray-700">Email</label>
  <input
    type="email"
    className="w-full px-4 py-2 border-2 border-red-500 rounded-lg"
  />
  <p className="text-xs text-red-600">Please enter a valid email</p>
</div>
```

---

### Cards

#### Standard Card
```jsx
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-xl font-semibold text-gray-900 mb-4">Card Title</h3>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

#### Hoverable Card
```jsx
<div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer">
  <h3 className="text-xl font-semibold text-gray-900 mb-4">Equipment Name</h3>
  <p className="text-gray-600 mb-4">Description</p>
</div>
```

#### Equipment Card (Common Pattern)
```jsx
<div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
  {/* Image */}
  <img src={image} alt="name" className="w-full h-48 object-cover" />

  {/* Content */}
  <div className="p-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Equipment Name</h3>
    <p className="text-sm text-gray-600 mb-4">Short description</p>

    {/* Meta */}
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm font-semibold text-blue-600">3 Available</span>
      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Good</span>
    </div>

    {/* Actions */}
    <div className="flex gap-2">
      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        View
      </button>
      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
        Book
      </button>
    </div>
  </div>
</div>
```

---

### Forms

#### Form Layout
```jsx
<form className="flex flex-col gap-6">
  {/* Form Group */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Field Label</label>
    <input type="text" placeholder="..." className="..." />
    <p className="text-xs text-gray-500">Helper text</p>
  </div>

  {/* Form Group */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Another Field</label>
    <input type="text" placeholder="..." className="..." />
  </div>

  {/* Buttons */}
  <div className="flex gap-3 pt-4">
    <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
      Submit
    </button>
    <button type="reset" className="flex-1 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium">
      Reset
    </button>
  </div>
</form>
```

---

### Badges & Tags

#### Status Badge - Pending
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
  Pending
</span>
```

#### Status Badge - Approved
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Approved
</span>
```

#### Status Badge - Rejected
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
  Rejected
</span>
```

#### Category Badge
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  Audio/Visual
</span>
```

---

### Alerts & Notifications

#### Success Alert
```jsx
<div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
  <div className="flex gap-3">
    <span className="text-2xl">✓</span>
    <div>
      <h3 className="font-semibold text-green-900">Success!</h3>
      <p className="text-sm text-green-700 mt-1">Booking created successfully</p>
    </div>
  </div>
</div>
```

#### Error Alert
```jsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
  <div className="flex gap-3">
    <span className="text-2xl">✕</span>
    <div>
      <h3 className="font-semibold text-red-900">Error</h3>
      <p className="text-sm text-red-700 mt-1">Equipment not available for selected time</p>
    </div>
  </div>
</div>
```

#### Warning Alert
```jsx
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
  <div className="flex gap-3">
    <span className="text-2xl">⚠</span>
    <div>
      <h3 className="font-semibold text-yellow-900">Warning</h3>
      <p className="text-sm text-yellow-700 mt-1">Booking ends soon, please return equipment</p>
    </div>
  </div>
</div>
```

#### Info Alert
```jsx
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
  <div className="flex gap-3">
    <span className="text-2xl">ℹ</span>
    <div>
      <h3 className="font-semibold text-blue-900">Info</h3>
      <p className="text-sm text-blue-700 mt-1">This equipment requires staff approval</p>
    </div>
  </div>
</div>
```

---

### Modal/Dialog Pattern
```jsx
{/* Overlay */}
{isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />}

{/* Modal */}
{isOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Modal Title</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-600">Modal content here</p>
      </div>

      {/* Footer */}
      <div className="flex gap-3 p-6 border-t border-gray-200">
        <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
```

---

### Loading States

#### Loading Spinner
```jsx
<div className="flex items-center justify-center p-8">
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
</div>
```

#### Skeleton Loader (Card)
```jsx
<div className="bg-white rounded-lg p-4 animate-pulse">
  <div className="h-48 bg-gray-200 rounded mb-4"></div>
  <div className="h-6 bg-gray-200 rounded mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
</div>
```

#### Loading Button
```jsx
<button disabled className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
  <span className="inline-block animate-spin mr-2">⟳</span>
  Loading...
</button>
```

---

### Empty States

#### Empty Equipment
```jsx
<div className="text-center py-12">
  <div className="text-4xl mb-4">📦</div>
  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Equipment Found</h3>
  <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
    Clear Filters
  </button>
</div>
```

#### Empty Bookings
```jsx
<div className="text-center py-12">
  <div className="text-4xl mb-4">📅</div>
  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
  <p className="text-gray-600 mb-6">Start by browsing available equipment</p>
  <a href="/equipment" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">
    Browse Equipment
  </a>
</div>
```

---

## 📱 Layout Patterns

### Page Layout
```jsx
<div className="min-h-screen bg-gray-50">
  {/* Navbar (fixed or sticky) */}
  <nav className="bg-white shadow sticky top-0 z-10">
    {/* navbar content */}
  </nav>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 py-8">
    {/* Page content */}
  </main>

  {/* Footer (optional) */}
  <footer className="bg-gray-900 text-white mt-12">
    {/* footer content */}
  </footer>
</div>
```

### Two Column Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Sidebar */}
  <aside className="md:col-span-1">
    {/* Filters or navigation */}
  </aside>

  {/* Main Content */}
  <main className="md:col-span-2">
    {/* Page content */}
  </main>
</div>
```

### Grid Layouts
```jsx
// 3 columns on desktop, 2 on tablet, 1 on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {equipment.map(item => <EquipmentCard key={item.id} equipment={item} />)}
</div>

// 4 columns on desktop, 2 on tablet, 1 on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

---

## 🎭 Component Patterns

### List Item with Actions
```jsx
<div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 hover:bg-gray-50">
  <div className="flex-1">
    <h3 className="font-medium text-gray-900">Item Title</h3>
    <p className="text-sm text-gray-600">Item description</p>
  </div>
  <div className="flex gap-2 ml-4">
    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
      Edit
    </button>
    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
      Delete
    </button>
  </div>
</div>
```

### Status Row
```jsx
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
  <div>
    <p className="text-sm text-gray-600">Equipment Name</p>
    <p className="font-semibold text-gray-900">Projector 4K</p>
  </div>
  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
    Available
  </span>
</div>
```

### Stats Card
```jsx
<div className="bg-white rounded-lg shadow p-6">
  <p className="text-sm font-medium text-gray-600 mb-2">Total Bookings</p>
  <p className="text-3xl font-bold text-gray-900 mb-4">42</p>
  <p className="text-sm text-green-600">↑ 12% from last month</p>
</div>
```

---

## ⌨️ Keyboard & Interaction

### Focus States
```jsx
// Button focus (all interactive elements)
className="... focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

// Link focus
className="... focus:outline-none underline decoration-2"
```

### Hover States
```jsx
// Button
className="bg-blue-600 hover:bg-blue-700 transition-colors"

// Card
className="... hover:shadow-lg transition-shadow"

// Link
className="text-blue-600 hover:text-blue-700 hover:underline"
```

### Active/Selected States
```jsx
// Tab or navigation item
className={`px-4 py-2 font-medium ${isActive ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}

// Radio/Checkbox
className="w-4 h-4 accent-blue-600 cursor-pointer"
```

---

## 📊 Data Display

### Table
```jsx
<table className="w-full">
  <thead className="bg-gray-100 border-b border-gray-200">
    <tr>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-3 text-sm text-gray-900">Item</td>
      <td className="px-6 py-3 text-sm text-gray-600">Pending</td>
      <td className="px-6 py-3 text-sm text-blue-600 cursor-pointer hover:underline">Edit</td>
    </tr>
  </tbody>
</table>
```

### List
```jsx
<ul className="space-y-2">
  {items.map(item => (
    <li key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50">
      <input type="checkbox" className="w-4 h-4 accent-blue-600" />
      <span className="flex-1 text-gray-900">{item.name}</span>
      <span className="text-xs text-gray-500">{item.date}</span>
    </li>
  ))}
</ul>
```

---

## 🎨 Responsive Design

### Breakpoints
```
Mobile:   < 640px    (default)
Tablet:   640px+     (md:)
Desktop:  1024px+    (lg:)
Large:    1280px+    (xl:)
XL:       1536px+    (2xl:)
```

### Responsive Patterns

#### Stack to Side-by-Side
```jsx
<div className="flex flex-col md:flex-row gap-6">
  <div className="w-full md:w-1/2">Left</div>
  <div className="w-full md:w-1/2">Right</div>
</div>
```

#### Hide on Mobile
```jsx
<div className="hidden md:block">Desktop only</div>
```

#### Show Different on Mobile
```jsx
<div className="text-sm md:text-base">Responsive text</div>
```

#### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

#### Responsive Padding
```jsx
<div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
  Content
</div>
```

---

## 🎯 User Flows & Interactions

### Login Flow
1. User arrives at /login
2. Empty form with email/password fields
3. Click login → loading state
4. On success → redirect to /dashboard
5. On error → show red alert at top

### Booking Flow
1. User browses equipment
2. Clicks "Book Now"
3. Opens booking form modal
4. Fills date, time, purpose
5. Checks "Confirm Booking" button
6. Shows loading state
7. Success confirmation message
8. Returns to equipment list

### Admin Approval Flow
1. Admin goes to /admin
2. Sees pending bookings list
3. Each booking shows: user, equipment, date, purpose
4. Click "Approve" or "Reject"
5. Optional comment modal
6. Confirms action
7. List updates immediately

---

## ✅ Validation & Error Handling

### Form Validation
```
Email: Must be valid format
Password: Min 6 characters
Name: Required, max 50 chars
Date: Must be in future
Time: Must be available
```

### Error Display
```
- Show error message below field (red text)
- Red border on input field
- Form doesn't submit
- Focus first error field
```

### Success Display
```
- Show green alert at top
- Auto-dismiss after 5 seconds
- OR show success modal
- Navigate on confirm
```

---

## 🔔 Notifications

### Toast Notifications (Simple)
```jsx
<div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-4 rounded-lg shadow-lg">
  Booking created successfully!
</div>
```

### Alert Notifications (Important)
```jsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
  <p className="text-red-700 font-medium">Error creating booking</p>
  <p className="text-red-600 text-sm mt-1">Equipment not available</p>
</div>
```

---

## 🎬 Animations & Transitions

### Smooth Transitions
```jsx
// Hover effects
className="... transition-all duration-200 hover:shadow-lg"

// Button click
className="... active:scale-95 transition-transform"

// Fade in/out
className="... opacity-0 animate-fade-in"
```

### Loading Animation
```jsx
<div className="inline-block animate-spin">⟳</div>
```

### Smooth State Changes
```jsx
className={`... transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}
```

---

## ♿ Accessibility

### ARIA Labels
```jsx
<button aria-label="Close modal" onClick={onClose}>✕</button>
<input aria-label="Equipment search" />
<div role="alert">Error message</div>
```

### Semantic HTML
```jsx
<header>Navbar</header>
<main>Page content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>

<button>Action</button>  // NOT <div onClick>
<a href="/path">Link</a> // NOT <div onClick>
```

### Color Contrast
```
Text: Min 4.5:1 contrast ratio
Large text: Min 3:1 ratio
Use colors + icons (don't rely on color only)
```

### Focus Management
```jsx
// Focus visible on interactive elements
className="... focus:outline-none focus:ring-2 focus:ring-blue-500"

// Skip to main content link
<a href="#main-content" className="sr-only">
  Skip to main content
</a>
```

---

## 📐 Component Size Reference

### Button Heights
- Small button: px-3 py-1 text-sm
- Normal button: px-4 py-2 text-base
- Large button: px-6 py-3 text-lg

### Input Heights
- All inputs: px-4 py-2 (consistent with buttons)

### Card Widths
- Full width on mobile
- Half width on tablet
- 1/3 width on desktop

### Spacing
- Between sections: mb-8 or mb-12
- Between elements: mb-4 or mb-6
- Tight spacing: mb-2

---

## 🎨 Dark Mode (Optional Future)

Reserved for future dark mode implementation.
For now, stick to light theme.

---

## 📋 Design System Checklist for Claude Code

Before building a component, verify:
- [ ] Using correct button style for action type
- [ ] Proper spacing (p-4, gap-4, etc.)
- [ ] Correct color scheme (blue/green/red/yellow)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Proper form field styling
- [ ] Loading states handled
- [ ] Error states shown in red
- [ ] Success states shown in green
- [ ] Hover/focus states included
- [ ] Tailwind classes only (no CSS)
- [ ] Accessible (labels, ARIA, semantic HTML)
- [ ] Consistent with existing components

---

## 🚀 Implementation Tips for Claude Code

### When Building Components:
1. Use existing patterns from this guide
2. Keep styling consistent across pages
3. Reuse component patterns
4. Test on mobile (responsive)
5. Include error/loading states
6. Match spacing and sizing
7. Use proper typography scale
8. Include proper color coding
9. Make interactive elements obvious
10. Test accessibility

### Common Mistakes to Avoid:
- Mixing different button styles on same page
- Inconsistent spacing (gap-2 vs gap-6 randomly)
- Using colors outside palette
- Not handling loading/error states
- Forms without proper validation display
- Non-responsive layouts
- Poor contrast/readability
- Missing focus states
- Cluttered layouts
- Oversized elements

### Do's:
- Use consistent spacing (4px base unit)
- Follow color palette strictly
- Include all interactive states
- Test mobile responsiveness
- Reuse component patterns
- Show loading states
- Display errors clearly
- Use proper typography
- Include hover/focus effects
- Keep layouts clean

---

## 📚 Reference Quick Links

### Component Patterns
- [Buttons](#buttons) - Primary, secondary, success, danger, small
- [Input Fields](#input-fields) - Text, email, password, date, textarea, select
- [Cards](#cards) - Standard, hoverable, equipment card
- [Forms](#forms) - Form layout with validation
- [Badges](#badges--tags) - Status badges (pending, approved, rejected)
- [Alerts](#alerts--notifications) - Success, error, warning, info
- [Modals](#modaldialog-pattern) - Dialog pattern
- [Loading States](#loading-states) - Spinner, skeleton loader
- [Empty States](#empty-states) - Empty equipment, empty bookings

### Layout Patterns
- [Page Layout](#page-layout) - Standard page structure
- [Two Column Layout](#two-column-layout) - Sidebar + main content
- [Grid Layouts](#grid-layouts) - Responsive grids

### Guidelines
- [Color Palette](#color-palette) - All colors and usage
- [Typography](#typography) - Font sizes and weights
- [Spacing](#spacing-system) - Padding and margin rules
- [Responsive Design](#responsive-design) - Breakpoints and patterns
- [Accessibility](#accessibility) - ARIA labels and semantic HTML

---

**Last Updated:** 2025-10-31
**Version:** 1.0.0
**Maintained By:** Equipment Booking SG Team
