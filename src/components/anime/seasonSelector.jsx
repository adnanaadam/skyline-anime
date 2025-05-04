import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const seasons = [
  { id: 'winter', name: 'Winter' },
  { id: 'spring', name: 'Spring' },
  { id: 'summer', name: 'Summer' },
  { id: 'fall', name: 'Fall' },
];

export default function SeasonSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
      >
        {selectedSeason.name} <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-10">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => {
                setSelectedSeason(season);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                season.id === selectedSeason.id ? 'text-blue-400' : 'text-white'
              }`}
            >
              {season.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}