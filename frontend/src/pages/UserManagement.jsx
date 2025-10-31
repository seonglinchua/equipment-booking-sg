import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';

export default function UserManagement() {
  const { user, getAllUsers, updateUserRole, updateAnyUser, deleteUser } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [changingRole, setChangingRole] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    students: 0,
    teachers: 0,
    admins: 0,
  });

  // Load users
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    try {
      const allUsers = getAllUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
      calculateStats(allUsers);
    } catch (error) {
      showError(error.message);
    }
  };

  // Calculate statistics
  const calculateStats = (userList) => {
    const stats = {
      total: userList.length,
      students: userList.filter(u => u.role === 'student').length,
      teachers: userList.filter(u => u.role === 'teacher').length,
      admins: userList.filter(u => u.role === 'admin').length,
    };
    setStats(stats);
  };

  // Filter users based on search and role filter
  useEffect(() => {
    let result = [...users];

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(u => u.role === roleFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        u =>
          u.name?.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query) ||
          u.id?.includes(query)
      );
    }

    setFilteredUsers(result);
  }, [searchQuery, roleFilter, users]);

  // Handle role change
  const handleRoleChange = async (userId, role) => {
    const result = await updateUserRole(userId, role);
    if (result.success) {
      showSuccess(`User role updated to ${role}`);
      loadUsers();
      setChangingRole(null);
      setNewRole('');
    } else {
      showError(result.error);
    }
  };

  // Handle edit user
  const handleEditUser = async (userId) => {
    const result = await updateAnyUser(userId, editForm);
    if (result.success) {
      showSuccess('User information updated successfully');
      loadUsers();
      setEditingUser(null);
      setEditForm({ name: '', email: '' });
    } else {
      showError(result.error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    const result = await deleteUser(userId);
    if (result.success) {
      showSuccess('User deleted successfully');
      loadUsers();
      setDeleteConfirm(null);
    } else {
      showError(result.error);
    }
  };

  // Start editing
  const startEdit = (selectedUser) => {
    setEditingUser(selectedUser.id);
    setEditForm({
      name: selectedUser.name || '',
      email: selectedUser.email || '',
    });
  };

  // Start role change
  const startRoleChange = (selectedUser) => {
    setChangingRole(selectedUser.id);
    setNewRole(selectedUser.role);
  };

  // Role badge component
  const RoleBadge = ({ role }) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      teacher: 'bg-blue-100 text-blue-800',
      student: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${colors[role] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-SG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage user accounts and roles</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Students</p>
                <p className="text-3xl font-bold text-green-600">{stats.students}</p>
              </div>
              <div className="text-4xl">🎓</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Teachers</p>
                <p className="text-3xl font-bold text-blue-600">{stats.teachers}</p>
              </div>
              <div className="text-4xl">👨‍🏫</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Admins</p>
                <p className="text-3xl font-bold text-purple-600">{stats.admins}</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or ID..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="teacher">Teachers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {u.name?.charAt(0).toUpperCase() || '?'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {u.name || 'Unnamed User'}
                              {u.id === user?.id && (
                                <span className="ml-2 text-xs text-blue-600">(You)</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">ID: {u.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{u.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {changingRole === u.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={newRole}
                              onChange={(e) => setNewRole(e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="student">Student</option>
                              <option value="teacher">Teacher</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => handleRoleChange(u.id, newRole)}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setChangingRole(null);
                                setNewRole('');
                              }}
                              className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <RoleBadge role={u.role} />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{formatDate(u.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {u.id === user?.id ? (
                          <span className="text-xs text-gray-400">Current User</span>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            {/* Edit button */}
                            <button
                              onClick={() => startEdit(u)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Edit
                            </button>

                            {/* Change Role button */}
                            <button
                              onClick={() => startRoleChange(u)}
                              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                              Role
                            </button>

                            {/* Delete button */}
                            <button
                              onClick={() => setDeleteConfirm(u.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Edit User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEditUser(editingUser)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setEditForm({ name: '', email: '' });
                  }}
                  className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="text-center mb-4">
                <div className="text-5xl mb-3">⚠️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete User</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleDeleteUser(deleteConfirm)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
