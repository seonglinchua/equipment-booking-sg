import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function EquipmentCard({ equipment }) {
  const isAvailable = equipment.available > 0;

  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-200">
        <img
          src={equipment.imageUrl}
          alt={equipment.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge variant={isAvailable ? 'success' : 'danger'}>
            {isAvailable ? `${equipment.available} Available` : 'Not Available'}
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {equipment.name}
          </h3>
        </div>

        <Badge variant="primary" size="sm" className="mb-2 w-fit">
          {equipment.category}
        </Badge>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
          {equipment.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {equipment.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Total: {equipment.quantity} units
          </div>
        </div>

        <Link to={`/equipment/${equipment.id}/book`} className="w-full">
          <Button
            fullWidth
            disabled={!isAvailable}
            variant={isAvailable ? 'primary' : 'secondary'}
          >
            {isAvailable ? 'Book Now' : 'Unavailable'}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
