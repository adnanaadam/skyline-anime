import { useQuery } from '@tanstack/react-query';
import { getTopAnime } from '@/api/jikan';
import AnimeCard from '@/components/anime/animeCard';
import LoadingSpinner from '@/components/ui/loadingSpinner';

export default function TopAnime() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topAnime'],
    queryFn: getTopAnime,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error loading top anime</div>;

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Top Rated Anime</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data?.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
}