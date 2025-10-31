import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Alert from '../components/common/Alert';
import Badge from '../components/common/Badge';
import { formatDateReadable } from '../utils/dateHelpers';

export default function ProfilePage() {
  const { user, updateUser, changePassword } = useAuth();
  const { getUserBookings } = useBooking();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Profile form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Get user's booking statistics
  const userBookings = getUserBookings(user?.id);
  const pendingCount = userBookings.filter(b => b.status === 'pending').length;
  const activeCount = userBookings.filter(b => ['approved', 'active'].includes(b.status)).length;
  const completedCount = userBookings.filter(b => b.status === 'completed').length;
  const totalCount = userBookings.length;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return;
    }

    const result = await updateUser({
      ...user,
      name: formData.name.trim(),
      email: formData.email.trim(),
    });

    if (result.success) {
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
    } else {
      setErrorMessage(result.error || 'Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setErrorMessage('All password fields are required');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }

    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);

    if (result.success) {
      setSuccessMessage('Password changed successfully');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } else {
      setErrorMessage(result.error || 'Failed to change password');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
    });
    setErrorMessage('');
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your activity</p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} className="mb-6" />
        )}
        {errorMessage && (
          <Alert type="error" message={errorMessage} onClose={() => setErrorMessage('')} className="mb-6" />
        )}

        {/* Profile Information Card */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{user?.name}</h3>
                  <Badge variant={user?.role === 'admin' ? 'danger' : user?.role === 'teacher' ? 'info' : 'default'}>
                    {user?.role}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="mt-1 text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="mt-1 text-gray-900 capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Created</p>
                  <p className="mt-1 text-gray-900">{formatDateReadable(user?.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p className="mt-1 text-gray-900 font-mono text-sm">{user?.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Password Change Card */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
            {!isChangingPassword && (
              <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(true)}>
                Change Password
              </Button>
            )}
          </div>

          {!isChangingPassword ? (
            <p className="text-gray-600">Keep your account secure by using a strong password.</p>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="Enter current password"
                required
              />

              <Input
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Enter new password"
                helperText="Must be at least 6 characters"
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                required
              />

              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary">
                  Update Password
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelPasswordChange}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Booking Statistics Card */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Statistics</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-gray-900">{totalCount}</p>
              <p className="text-sm text-gray-600 mt-1">Total Bookings</p>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-800">{pendingCount}</p>
              <p className="text-sm text-yellow-700 mt-1">Pending</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-800">{activeCount}</p>
              <p className="text-sm text-blue-700 mt-1">Active</p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-800">{completedCount}</p>
              <p className="text-sm text-green-700 mt-1">Completed</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              View and manage all your bookings in the My Bookings page.
            </p>
            <Button variant="primary" onClick={() => window.location.href = '/bookings'}>
              View My Bookings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
