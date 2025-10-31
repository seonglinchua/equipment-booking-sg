import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. This area is restricted to administrators only.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block transition-colors"
            >
              Go Home
            </a>
            <a
              href="/equipment"
              className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-300 inline-block transition-colors"
            >
              Browse Equipment
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Current role: <span className="font-medium capitalize">{user?.role}</span>
          </p>
        </div>
      </div>
    );
  }

  return children;
}
