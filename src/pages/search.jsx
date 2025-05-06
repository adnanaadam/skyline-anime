import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router';
import { searchAnime } from '@/api/jikan';
import AnimeCard from '@/components/anime/animeCard';
import SearchBar from '@/components/ui/searchBar';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchAnime(query),
    enabled: !!query, // Only run if query exists
  });

  const handleSearchSubmit = (searchTerm) => {
    // Update the URL with the new search query
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className='min-h-screen bg-gray-900 p-4'>
      <div className='mx-auto mb-8 max-w-2xl'>
        <SearchBar
          initialValue={query}
          onSearch={handleSearchSubmit} // Changed to use handleSearchSubmit
        />
      </div>

      {query && (
        <h2 className='mb-4 text-xl text-white'>
          Results for: <span className='font-bold'>"{query}"</span>
        </h2>
      )}

      {isLoading ? (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className='aspect-[3/4] animate-pulse rounded-lg bg-gray-800'
            />
          ))}
        </div>
      ) : isError ? (
        <div className='text-red-400'>Error loading search results</div>
      ) : data?.data?.length === 0 ? (
        <div className='text-gray-400'>No results found for "{query}"</div>
      ) : (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {data?.data?.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}
