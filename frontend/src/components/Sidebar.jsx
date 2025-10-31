import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Sidebar({ isCollapsed = false, setIsCollapsed = () => {} }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsSidebarOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Navigation items configuration
  const navSections = [
    {
      title: 'Main',
      visible: isAuthenticated,
      items: [
        { path: '/', label: 'Home', icon: '🏠' }
      ]
    },
    {
      title: 'Bookings',
      visible: isAuthenticated,
      items: [
        { path: '/equipment', label: 'Equipment', icon: '📦' },
        { path: '/bookings', label: 'My Bookings', icon: '📋' }
      ]
    },
    {
      title: 'Account',
      visible: isAuthenticated,
      items: [
        { path: '/profile', label: 'Profile', icon: '👤' }
      ]
    },
    {
      title: 'Admin',
      visible: isAuthenticated && user?.role === 'admin',
      items: [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/equipment', label: 'Equipment', icon: '⚙️' },
        { path: '/admin/users', label: 'Users', icon: '👥' }
      ]
    }
  ];

  const publicNavItems = [
    { path: '/login', label: 'Sign In', icon: '🔑' },
    { path: '/register', label: 'Get Started', icon: '🚀' }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-all duration-300 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          md:translate-x-0
        `}
      >
        {/* Logo and Toggle */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!isCollapsed && (
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              onClick={closeSidebar}
            >
              <span className="text-2xl">📦</span>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Equipment</h1>
                <p className="text-xs text-gray-500">Booking SG</p>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link
              to="/"
              className="mx-auto hover:opacity-80 transition-opacity"
              onClick={closeSidebar}
            >
              <span className="text-2xl">📦</span>
            </Link>
          )}
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:block text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {isAuthenticated ? (
            <div className="space-y-6">
              {navSections.map((section) =>
                section.visible && (
                  <div key={section.title}>
                    {!isCollapsed && (
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeSidebar}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors
                            ${isActivePath(item.path)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                            }
                            ${isCollapsed ? 'justify-center' : ''}
                          `}
                          title={isCollapsed ? item.label : ''}
                        >
                          <span className="text-xl">{item.icon}</span>
                          {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors
                    ${isActivePath(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item.label : ''}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* User Section */}
        {isAuthenticated && (
          <div className="p-4 border-t border-gray-200">
            {!isCollapsed ? (
              <>
                <div className="mb-3 px-3 py-2 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  <p className="text-xs text-blue-600 capitalize mt-1">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-900 p-2 rounded-lg transition-colors"
                title="Logout"
              >
                <span className="text-xl">🚪</span>
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
