import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Equipment Booking System
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Singapore Education Institutions
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Phase 1: Frontend + localStorage
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-600 text-sm">
                Role-based access control for students, teachers, and administrators
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Equipment Catalog
              </h3>
              <p className="text-gray-600 text-sm">
                Browse and book from a wide range of educational equipment
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Booking
              </h3>
              <p className="text-gray-600 text-sm">
                Schedule equipment reservations with real-time availability
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              🚀 Tech Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-600 mb-3">
                  ✅ Phase 1 (Current)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• React 18 + Vite</li>
                  <li>• React Router v6</li>
                  <li>• Tailwind CSS</li>
                  <li>• localStorage for state</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  📅 Phase 2 (Planned)
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Node.js/Express backend</li>
                  <li>• MongoDB/PostgreSQL</li>
                  <li>• JWT authentication</li>
                  <li>• RESTful API</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            You're logged in as <span className="font-medium capitalize">{user?.role}</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📦</div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Available Equipment</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📅</div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">My Bookings</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">✓</div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/equipment"
              className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">📦</div>
              <p className="text-sm font-semibold text-gray-900">Browse Equipment</p>
            </Link>

            <Link
              to="/bookings"
              className="flex flex-col items-center p-6 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="text-3xl mb-2">📅</div>
              <p className="text-sm font-semibold text-gray-900">My Bookings</p>
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="text-3xl mb-2">⚙️</div>
                <p className="text-sm font-semibold text-gray-900">Admin Panel</p>
              </Link>
            )}

            <div className="flex flex-col items-center p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <div className="text-3xl mb-2">👤</div>
              <p className="text-sm font-semibold text-gray-900">My Profile</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-4">
            <span className="text-blue-600 text-2xl">ℹ</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Demo Mode Active</h3>
              <p className="text-sm text-blue-700 mb-3">
                This is Phase 1 of the Equipment Booking System. All data is stored locally in your browser's localStorage.
                Future features include backend integration, real-time notifications, and advanced reporting.
              </p>
              <div className="flex gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Authentication
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  ⏳ Equipment Catalog
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  ⏳ Booking System
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
