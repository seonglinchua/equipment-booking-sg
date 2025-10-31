import { createContext, useState, useEffect } from 'react';
import { equipmentStorage } from '../utils/storage';

export const EquipmentContext = createContext();

// Mock equipment data for Phase 1
const MOCK_EQUIPMENT = [
  {
    id: '1',
    name: 'Dell Latitude 5520 Laptop',
    description: 'High-performance laptop with Intel Core i7, 16GB RAM, 512GB SSD. Perfect for programming, design work, and general productivity.',
    category: 'Laptops',
    quantity: 15,
    available: 15,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
    specifications: ['Intel Core i7', '16GB RAM', '512GB SSD', '15.6" Display'],
    status: 'available',
    location: 'IT Lab - Block A, Level 2',
  },
  {
    id: '2',
    name: 'Epson EB-2250U Projector',
    description: 'Full HD projector with 5000 lumens brightness. Ideal for presentations, lectures, and multimedia displays.',
    category: 'Projectors',
    quantity: 8,
    available: 8,
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400',
    specifications: ['Full HD 1080p', '5000 Lumens', 'HDMI/USB', 'Wireless Display'],
    status: 'available',
    location: 'AV Equipment Room - Block B, Level 1',
  },
  {
    id: '3',
    name: 'Canon EOS 90D DSLR Camera',
    description: 'Professional DSLR camera with 32.5MP sensor. Includes 18-135mm lens kit, perfect for photography projects and videography.',
    category: 'Cameras',
    quantity: 5,
    available: 5,
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
    specifications: ['32.5MP APS-C Sensor', '4K Video', '18-135mm Lens', 'WiFi/Bluetooth'],
    status: 'available',
    location: 'Media Lab - Block C, Level 3',
  },
  {
    id: '4',
    name: 'Apple iPad Pro 11"',
    description: 'Latest iPad Pro with M2 chip and Apple Pencil. Great for digital art, note-taking, and mobile productivity.',
    category: 'Tablets',
    quantity: 12,
    available: 12,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    specifications: ['M2 Chip', '11" Display', 'Apple Pencil', '256GB Storage'],
    status: 'available',
    location: 'IT Lab - Block A, Level 2',
  },
  {
    id: '5',
    name: 'Shure SM58 Microphone',
    description: 'Professional dynamic microphone for vocals and presentations. Industry-standard audio quality.',
    category: 'Audio Equipment',
    quantity: 10,
    available: 10,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400',
    specifications: ['Dynamic Cardioid', 'XLR Connection', 'Built-in Pop Filter', 'Shock Mount'],
    status: 'available',
    location: 'AV Equipment Room - Block B, Level 1',
  },
  {
    id: '6',
    name: 'Arduino Starter Kit',
    description: 'Complete electronics starter kit with Arduino Uno board, sensors, LEDs, and components. Perfect for STEM projects.',
    category: 'Electronics',
    quantity: 20,
    available: 20,
    imageUrl: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
    specifications: ['Arduino Uno R3', '100+ Components', 'Project Guide', 'USB Cable'],
    status: 'available',
    location: 'Electronics Lab - Block D, Level 1',
  },
];

export function EquipmentProvider({ children }) {
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize equipment from localStorage or use mock data
  useEffect(() => {
    const storedEquipment = equipmentStorage.getAll();
    if (storedEquipment.length === 0) {
      // First time - initialize with mock data
      equipmentStorage.setAll(MOCK_EQUIPMENT);
      setEquipment(MOCK_EQUIPMENT);
    } else {
      setEquipment(storedEquipment);
    }
    setIsLoading(false);
  }, []);

  // Get all equipment
  const getAllEquipment = () => {
    return equipment;
  };

  // Get equipment by ID
  const getEquipmentById = (id) => {
    return equipment.find(item => item.id === id);
  };

  // Get equipment by category
  const getEquipmentByCategory = (category) => {
    return equipment.filter(item => item.category === category);
  };

  // Get all categories
  const getCategories = () => {
    const categories = [...new Set(equipment.map(item => item.category))];
    return categories.sort();
  };

  // Search equipment
  const searchEquipment = (query) => {
    const searchTerm = query.toLowerCase();
    return equipment.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  };

  // Filter equipment
  const filterEquipment = (filters) => {
    let filtered = [...equipment];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters.availability === 'available') {
      filtered = filtered.filter(item => item.available > 0);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  // Add new equipment (admin only)
  const addEquipment = (equipmentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const newEquipment = equipmentStorage.add({
        ...equipmentData,
        available: equipmentData.quantity,
        status: 'available',
      });

      setEquipment(prev => [...prev, newEquipment]);
      setIsLoading(false);
      return { success: true, equipment: newEquipment };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Update equipment
  const updateEquipment = (id, updates) => {
    setIsLoading(true);
    setError(null);

    try {
      const updated = equipmentStorage.update(id, updates);
      if (!updated) {
        throw new Error('Equipment not found');
      }

      setEquipment(prev => prev.map(item => item.id === id ? updated : item));
      setIsLoading(false);
      return { success: true, equipment: updated };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Delete equipment (admin only)
  const deleteEquipment = (id) => {
    setIsLoading(true);
    setError(null);

    try {
      equipmentStorage.delete(id);
      setEquipment(prev => prev.filter(item => item.id !== id));
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Update availability (when booking is made/returned)
  const updateAvailability = (id, change) => {
    const item = getEquipmentById(id);
    if (!item) return { success: false, error: 'Equipment not found' };

    const newAvailable = item.available + change;
    if (newAvailable < 0 || newAvailable > item.quantity) {
      return { success: false, error: 'Invalid availability update' };
    }

    return updateEquipment(id, { available: newAvailable });
  };

  const value = {
    equipment,
    isLoading,
    error,
    getAllEquipment,
    getEquipmentById,
    getEquipmentByCategory,
    getCategories,
    searchEquipment,
    filterEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    updateAvailability,
  };

  return <EquipmentContext.Provider value={value}>{children}</EquipmentContext.Provider>;
}
