// components/PortfolioFilters.tsx
import type { RealisationCategory } from '@/lib/realisations';

type FilterType = RealisationCategory | 'all';

interface Props {
  selectedType: FilterType;
  onSelect: (type: FilterType) => void;
}

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'website', label: 'Sites Web' },
  { id: 'application', label: 'Applications' },
  { id: 'saas', label: 'Logiciels SaaS' },
];

export default function PortfolioFilters({ selectedType, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={selectedType === filter.id}
          onClick={() => onSelect(filter.id)}
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
