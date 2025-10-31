import { useState, useMemo } from 'react';
import { useEquipment } from '../hooks/useEquipment';
import EquipmentCard from '../components/equipment/EquipmentCard';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Card from '../components/common/Card';

export default function EquipmentCatalog() {
  const { equipment, getCategories, filterEquipment, isLoading } = useEquipment();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // Get categories for filter
  const categories = useMemo(() => getCategories(), [equipment]);

  // Filter equipment based on search and filters
  const filteredEquipment = useMemo(() => {
    return filterEquipment({
      search: searchQuery,
      category: selectedCategory,
      availability: availabilityFilter,
    });
  }, [searchQuery, selectedCategory, availabilityFilter, equipment]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading equipment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipment Catalog</h1>
          <p className="text-gray-600">Browse and book available equipment</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <Input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-0"
            />

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                ...categories.map(cat => ({ value: cat, label: cat })),
              ]}
              className="mb-0"
            />

            {/* Availability Filter */}
            <Select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Equipment' },
                { value: 'available', label: 'Available Only' },
              ]}
              className="mb-0"
            />
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredEquipment.length} of {equipment.length} items
          </p>
        </div>

        {/* Equipment Grid */}
        {filteredEquipment.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment found</h3>
              <p className="text-gray-600">
                {searchQuery || selectedCategory !== 'all' || availabilityFilter !== 'all'
                  ? 'Try adjusting your filters or search query.'
                  : 'No equipment available at the moment.'}
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
