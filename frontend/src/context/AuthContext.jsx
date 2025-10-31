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

  const value = {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    updateProfile,
    hasRole,
    isAdmin,
    isTeacher,
    isStudent,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
