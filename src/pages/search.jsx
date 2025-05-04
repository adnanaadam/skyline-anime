import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { searchAnime } from '@/api/jikan';
import AnimeCard from '@/components/anime/animeCard';
import SearchBar from '@/components/ui/searchBar';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchAnime(query),
    enabled: !!query, // Only run if query exists
  });

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar 
          initialValue={query}
          onSearch={setSearchQuery}
        />
      </div>

      {query && (
        <h2 className="text-xl text-white mb-4">
          Results for: <span className="font-bold">"{query}"</span>
        </h2>
      )}

      {isLoading ? (
        <div className="text-white">Searching anime...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data?.data?.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}