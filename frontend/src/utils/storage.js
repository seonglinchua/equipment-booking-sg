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

// Equipment management functions
export const equipmentStorage = {
  // Get all equipment
  getAll: () => {
    return storage.get(STORAGE_KEYS.EQUIPMENT) || [];
  },

  // Get equipment by ID
  getById: (equipmentId) => {
    const equipment = equipmentStorage.getAll();
    return equipment.find(item => item.id === equipmentId);
  },

  // Add new equipment
  add: (equipmentData) => {
    const equipment = equipmentStorage.getAll();
    const newEquipment = {
      id: Date.now().toString(),
      ...equipmentData,
      createdAt: new Date().toISOString(),
    };
    equipment.push(newEquipment);
    storage.set(STORAGE_KEYS.EQUIPMENT, equipment);
    return newEquipment;
  },

  // Update equipment
  update: (equipmentId, updates) => {
    const equipment = equipmentStorage.getAll();
    const index = equipment.findIndex(item => item.id === equipmentId);
    if (index !== -1) {
      equipment[index] = { ...equipment[index], ...updates, updatedAt: new Date().toISOString() };
      storage.set(STORAGE_KEYS.EQUIPMENT, equipment);
      return equipment[index];
    }
    return null;
  },

  // Delete equipment
  delete: (equipmentId) => {
    const equipment = equipmentStorage.getAll();
    const filtered = equipment.filter(item => item.id !== equipmentId);
    storage.set(STORAGE_KEYS.EQUIPMENT, filtered);
    return true;
  },

  // Set all equipment (for initializing mock data)
  setAll: (equipmentData) => {
    return storage.set(STORAGE_KEYS.EQUIPMENT, equipmentData);
  },
};

// Booking management functions
export const bookingStorage = {
  // Get all bookings
  getAll: () => {
    return storage.get(STORAGE_KEYS.BOOKINGS) || [];
  },

  // Get booking by ID
  getById: (bookingId) => {
    const bookings = bookingStorage.getAll();
    return bookings.find(booking => booking.id === bookingId);
  },

  // Get bookings by user ID
  getByUserId: (userId) => {
    const bookings = bookingStorage.getAll();
    return bookings.filter(booking => booking.userId === userId);
  },

  // Get bookings by equipment ID
  getByEquipmentId: (equipmentId) => {
    const bookings = bookingStorage.getAll();
    return bookings.filter(booking => booking.equipmentId === equipmentId);
  },

  // Get bookings by status
  getByStatus: (status) => {
    const bookings = bookingStorage.getAll();
    return bookings.filter(booking => booking.status === status);
  },

  // Add new booking
  add: (bookingData) => {
    const bookings = bookingStorage.getAll();
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: bookingData.status || 'pending',
    };
    bookings.push(newBooking);
    storage.set(STORAGE_KEYS.BOOKINGS, bookings);
    return newBooking;
  },

  // Update booking
  update: (bookingId, updates) => {
    const bookings = bookingStorage.getAll();
    const index = bookings.findIndex(booking => booking.id === bookingId);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date().toISOString() };
      storage.set(STORAGE_KEYS.BOOKINGS, bookings);
      return bookings[index];
    }
    return null;
  },

  // Delete booking
  delete: (bookingId) => {
    const bookings = bookingStorage.getAll();
    const filtered = bookings.filter(booking => booking.id !== bookingId);
    storage.set(STORAGE_KEYS.BOOKINGS, filtered);
    return true;
  },

  // Cancel booking (soft delete)
  cancel: (bookingId) => {
    return bookingStorage.update(bookingId, { status: 'cancelled' });
  },

  // Approve booking
  approve: (bookingId) => {
    return bookingStorage.update(bookingId, { status: 'approved' });
  },

  // Reject booking
  reject: (bookingId, reason = '') => {
    return bookingStorage.update(bookingId, { status: 'rejected', rejectionReason: reason });
  },

  // Mark booking as checked out
  checkout: (bookingId) => {
    return bookingStorage.update(bookingId, { status: 'active', checkedOutAt: new Date().toISOString() });
  },

  // Mark booking as returned
  return: (bookingId) => {
    return bookingStorage.update(bookingId, { status: 'completed', returnedAt: new Date().toISOString() });
  },
};

export { STORAGE_KEYS };
