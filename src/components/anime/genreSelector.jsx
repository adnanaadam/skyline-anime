import { useState } from 'react';

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
];

export default function GenreSelector({ selected, onChange }) {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex space-x-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onChange(genre.id)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              genre.id === selected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}