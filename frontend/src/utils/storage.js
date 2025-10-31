// localStorage utility functions for Equipment Booking System

const STORAGE_KEYS = {
  USERS: 'equipment_booking_users',
  AUTH: 'equipment_booking_auth',
  BOOKINGS: 'equipment_booking_bookings',
  EQUIPMENT: 'equipment_booking_equipment',
};

export const storage = {
  // Get data from localStorage
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  // Set data in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  // Remove data from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  // Clear all data from localStorage
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};

// User management functions
export const userStorage = {
  // Get all users
  getAll: () => {
    return storage.get(STORAGE_KEYS.USERS) || [];
  },

  // Get user by email
  getByEmail: (email) => {
    const users = userStorage.getAll();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  },

  // Add new user
  add: (user) => {
    const users = userStorage.getAll();
    const newUser = {
      id: Date.now().toString(),
      ...user,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    storage.set(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  // Update user
  update: (userId, updates) => {
    const users = userStorage.getAll();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
      storage.set(STORAGE_KEYS.USERS, users);
      return users[index];
    }
    return null;
  },

  // Delete user
  delete: (userId) => {
    const users = userStorage.getAll();
    const filtered = users.filter(u => u.id !== userId);
    storage.set(STORAGE_KEYS.USERS, filtered);
    return true;
  },
};

// Auth session management
export const authStorage = {
  // Get current authenticated user
  getUser: () => {
    return storage.get(STORAGE_KEYS.AUTH);
  },

  // Set authenticated user
  setUser: (user) => {
    return storage.set(STORAGE_KEYS.AUTH, user);
  },

  // Remove authenticated user (logout)
  removeUser: () => {
    return storage.remove(STORAGE_KEYS.AUTH);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return authStorage.getUser() !== null;
  },
};

export { STORAGE_KEYS };
