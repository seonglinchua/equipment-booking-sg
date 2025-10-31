import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEquipment } from '../hooks/useEquipment';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import Badge from '../components/common/Badge';

const CATEGORIES = [
  'Audio/Visual',
  'Laboratory',
  'Sports',
  'IT Equipment',
  'Art Supplies',
  'Music Instruments',
  'Photography',
  'Other',
];

const CONDITIONS = [
  'Excellent',
  'Good',
  'Fair',
  'Needs Repair',
];

export default function EquipmentManagement() {
  const { user } = useAuth();
  const { equipment, addEquipment, updateEquipment, deleteEquipment } = useEquipment();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    location: '',
    condition: 'Good',
    specs: '',
    image: '',
  });

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-red-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">You don't have permission to access equipment management.</p>
          </div>
        </Card>
      </div>
    );
  }

  // Filter equipment
  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      quantity: '',
      location: '',
      condition: 'Good',
      specs: '',
      image: '',
    });
  };

  const handleAddClick = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditClick = (item) => {
    setSelectedEquipment(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity.toString(),
      location: item.location || '',
      condition: item.condition || 'Good',
      specs: item.specs || '',
      image: item.image || '',
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedEquipment(item);
    setShowDeleteModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Equipment name is required');
      return;
    }

    if (!formData.description.trim()) {
      setErrorMessage('Description is required');
      return;
    }

    if (!formData.category) {
      setErrorMessage('Category is required');
      return;
    }

    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      setErrorMessage('Valid quantity is required');
      return;
    }

    const result = await addEquipment({
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      quantity: parseInt(formData.quantity),
      location: formData.location.trim() || 'Main Office',
      condition: formData.condition,
      specs: formData.specs.trim(),
      image: formData.image.trim() || 'https://via.placeholder.com/400x300?text=Equipment',
    });

    if (result.success) {
      setSuccessMessage('Equipment added successfully');
      setShowAddModal(false);
      resetForm();
    } else {
      setErrorMessage(result.error || 'Failed to add equipment');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Equipment name is required');
      return;
    }

    if (!formData.description.trim()) {
      setErrorMessage('Description is required');
      return;
    }

    if (!formData.category) {
      setErrorMessage('Category is required');
      return;
    }

    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      setErrorMessage('Valid quantity is required');
      return;
    }

    const result = await updateEquipment(selectedEquipment.id, {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      quantity: parseInt(formData.quantity),
      location: formData.location.trim() || 'Main Office',
      condition: formData.condition,
      specs: formData.specs.trim(),
      image: formData.image.trim() || selectedEquipment.image,
    });

    if (result.success) {
      setSuccessMessage('Equipment updated successfully');
      setShowEditModal(false);
      setSelectedEquipment(null);
      resetForm();
    } else {
      setErrorMessage(result.error || 'Failed to update equipment');
    }
  };

  const handleDeleteConfirm = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    const result = await deleteEquipment(selectedEquipment.id);

    if (result.success) {
      setSuccessMessage('Equipment deleted successfully');
      setShowDeleteModal(false);
      setSelectedEquipment(null);
    } else {
      setErrorMessage(result.error || 'Failed to delete equipment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipment Management</h1>
          <p className="text-gray-600">Add, edit, and manage equipment inventory</p>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <Alert type="success" message={successMessage} onClose={() => setSuccessMessage('')} className="mb-6" />
        )}
        {errorMessage && (
          <Alert type="error" message={errorMessage} onClose={() => setErrorMessage('')} className="mb-6" />
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-900">{equipment.length}</p>
              <p className="text-sm text-blue-600 font-medium">Total Equipment</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-900">
                {equipment.filter((e) => e.quantity > 0).length}
              </p>
              <p className="text-sm text-green-600 font-medium">Available</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-900">
                {equipment.filter((e) => e.quantity === 0).length}
              </p>
              <p className="text-sm text-red-600 font-medium">Out of Stock</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-900">
                {new Set(equipment.map((e) => e.category)).size}
              </p>
              <p className="text-sm text-purple-600 font-medium">Categories</p>
            </div>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="md:w-48">
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>

            <Button variant="primary" onClick={handleAddClick}>
              Add Equipment
            </Button>
          </div>
        </Card>

        {/* Equipment List */}
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment found</h3>
              <p className="text-gray-600">
                {searchTerm || filterCategory ? 'Try adjusting your filters' : 'Get started by adding equipment'}
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} hover>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
                  />
                )}

                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <Badge variant={item.quantity > 0 ? 'success' : 'danger'}>
                      {item.quantity > 0 ? 'Available' : 'Out of Stock'}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <p className="font-medium text-gray-900">{item.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Quantity:</span>
                      <p className="font-medium text-gray-900">{item.quantity}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <p className="font-medium text-gray-900">{item.location || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Condition:</span>
                      <p className="font-medium text-gray-900">{item.condition || 'Good'}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(item)} className="flex-1">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item)} className="flex-1">
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add Equipment Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          title="Add New Equipment"
          size="lg"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <Input
              label="Equipment Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Laptop Dell XPS 15"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>

              <Input
                label="Quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g., 5"
                required
              />
            </div>

            <Input
              label="Description"
              type="textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the equipment"
              rows={3}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Lab 3, Building A"
              />

              <Select
                label="Condition"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              >
                {CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </Select>
            </div>

            <Input
              label="Specifications (Optional)"
              type="textarea"
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              placeholder="Technical specifications"
              rows={2}
            />

            <Input
              label="Image URL (Optional)"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              helperText="Leave blank for default placeholder"
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary" className="flex-1">
                Add Equipment
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Equipment Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEquipment(null);
            resetForm();
          }}
          title="Edit Equipment"
          size="lg"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              label="Equipment Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Laptop Dell XPS 15"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>

              <Input
                label="Quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g., 5"
                required
              />
            </div>

            <Input
              label="Description"
              type="textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the equipment"
              rows={3}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Lab 3, Building A"
              />

              <Select
                label="Condition"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              >
                {CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </Select>
            </div>

            <Input
              label="Specifications (Optional)"
              type="textarea"
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              placeholder="Technical specifications"
              rows={2}
            />

            <Input
              label="Image URL (Optional)"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary" className="flex-1">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedEquipment(null);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedEquipment(null);
          }}
          title="Delete Equipment"
          size="sm"
        >
          <div className="mb-6">
            <p className="text-gray-600 mb-4">Are you sure you want to delete this equipment?</p>
            {selectedEquipment && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900 mb-1">{selectedEquipment.name}</p>
                <p className="text-sm text-gray-600">Category: {selectedEquipment.category}</p>
              </div>
            )}
            <Alert type="warning" message="This action cannot be undone." className="mt-4" />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedEquipment(null);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm} className="flex-1">
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
