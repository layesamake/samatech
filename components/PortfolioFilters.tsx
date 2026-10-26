// components/PortfolioFilters.tsx
type FilterType = 'application' | 'website' | 'training' | 'automation' | 'all';

interface Props {
  selectedType: FilterType;
  onSelect: (type: FilterType) => void;
}

const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'application', label: 'Applications' },
  { id: 'website', label: 'Sites Web' },
  { id: 'training', label: 'Formations' },
  { id: 'automation', label: 'Automatisations' },
];

export default function PortfolioFilters({ selectedType, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onSelect(filter.id as FilterType)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            selectedType === filter.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
