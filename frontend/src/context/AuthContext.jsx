import { createContext, useState, useEffect } from 'react';
import { userStorage, authStorage } from '../utils/storage';

export const AuthContext = createContext();

// Simple password hashing (client-side only for Phase 1)
const hashPassword = (password) => {
  // For Phase 1, we'll use a simple encoding
  // In Phase 2, this will be handled securely by the backend
  return btoa(password); // Base64 encoding
};

const verifyPassword = (password, hash) => {
  return btoa(password) === hash;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = authStorage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  // Register new user
  const register = async (email, password, role = 'student', name = '') => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists
      const existingUser = userStorage.getByEmail(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = userStorage.add({
        email,
        password: hashPassword(password),
        role,
        name: name || email.split('@')[0],
      });

      // Remove password from user object before storing in auth
      const { password: _, ...userWithoutPassword } = newUser;

      // Set as authenticated user
      authStorage.setUser(userWithoutPassword);
      setUser(userWithoutPassword);

      setIsLoading(false);
      return { success: true, user: userWithoutPassword };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Login user
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Find user
      const existingUser = userStorage.getByEmail(email);
      if (!existingUser) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      if (!verifyPassword(password, existingUser.password)) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = existingUser;

      // Set as authenticated user
      authStorage.setUser(userWithoutPassword);
      setUser(userWithoutPassword);

      setIsLoading(false);
      return { success: true, user: userWithoutPassword };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Logout user
  const logout = () => {
    authStorage.removeUser();
    setUser(null);
    setError(null);
  };

  // Update user profile
  const updateProfile = async (updates) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      // Update user in storage
      const updatedUser = userStorage.update(user.id, updates);
      if (!updatedUser) {
        throw new Error('Failed to update user');
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = updatedUser;

      // Update auth storage
      authStorage.setUser(userWithoutPassword);
      setUser(userWithoutPassword);

      setIsLoading(false);
      return { success: true, user: userWithoutPassword };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Update user (alias for updateProfile for consistency)
  const updateUser = async (userData) => {
    return updateProfile(userData);
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      // Get full user data with password
      const fullUser = userStorage.getById(user.id);
      if (!fullUser) {
        throw new Error('User not found');
      }

      // Verify current password
      if (!verifyPassword(currentPassword, fullUser.password)) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      const updatedUser = userStorage.update(user.id, {
        password: hashPassword(newPassword),
      });

      if (!updatedUser) {
        throw new Error('Failed to update password');
      }

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Check if user has specific role
  const hasRole = (roleToCheck) => {
    return user?.role === roleToCheck;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user is teacher
  const isTeacher = () => {
    return user?.role === 'teacher';
  };

  // Check if user is student
  const isStudent = () => {
    return user?.role === 'student';
  };

  // Admin function: Get all users
  const getAllUsers = () => {
    if (!isAdmin()) {
      throw new Error('Unauthorized: Admin access required');
    }
    return userStorage.getAll().map(({ password, ...user }) => user);
  };

  // Admin function: Update user role
  const updateUserRole = async (userId, newRole) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isAdmin()) {
        throw new Error('Unauthorized: Admin access required');
      }

      if (!userId || !newRole) {
        throw new Error('User ID and role are required');
      }

      if (!['student', 'teacher', 'admin'].includes(newRole)) {
        throw new Error('Invalid role. Must be student, teacher, or admin');
      }

      // Don't allow admin to change their own role
      if (userId === user?.id) {
        throw new Error('Cannot change your own role');
      }

      const updatedUser = userStorage.update(userId, { role: newRole });
      if (!updatedUser) {
        throw new Error('User not found');
      }

      setIsLoading(false);
      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Admin function: Update any user
  const updateAnyUser = async (userId, updates) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isAdmin()) {
        throw new Error('Unauthorized: Admin access required');
      }

      if (!userId) {
        throw new Error('User ID is required');
      }

      // Don't allow role updates through this function
      if (updates.role) {
        throw new Error('Use updateUserRole to change user roles');
      }

      // Don't allow password updates through this function
      if (updates.password) {
        throw new Error('Cannot update passwords directly');
      }

      const updatedUser = userStorage.update(userId, updates);
      if (!updatedUser) {
        throw new Error('User not found');
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = updatedUser;

      setIsLoading(false);
      return { success: true, user: userWithoutPassword };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Admin function: Delete user
  const deleteUser = async (userId) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isAdmin()) {
        throw new Error('Unauthorized: Admin access required');
      }

      if (!userId) {
        throw new Error('User ID is required');
      }

      // Don't allow admin to delete themselves
      if (userId === user?.id) {
        throw new Error('Cannot delete your own account');
      }

      const success = userStorage.delete(userId);
      if (!success) {
        throw new Error('Failed to delete user');
      }

      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    updateProfile,
    updateUser,
    changePassword,
    hasRole,
    isAdmin,
    isTeacher,
    isStudent,
    isAuthenticated: !!user,
    // Admin functions
    getAllUsers,
    updateUserRole,
    updateAnyUser,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
