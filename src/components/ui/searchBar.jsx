import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ initialValue = '', onSearch }) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialValue) {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch, initialValue]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}