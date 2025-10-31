import { useContext } from 'react';
import { EquipmentContext } from '../context/EquipmentContext';

export function useEquipment() {
  const context = useContext(EquipmentContext);

  if (!context) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }

  return context;
}
