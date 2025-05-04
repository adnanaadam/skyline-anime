import { useQuery } from '@tanstack/react-query';
import { getSeasonalAnime } from '@/api/jikan';
import AnimeCard from '@/components/anime/animeCard';
import SeasonSelector from '@/components/anime/seasonSelector';

export default function SeasonalAnime() {
  const { data, isLoading } = useQuery({
    queryKey: ['seasonalAnime'],
    queryFn: getSeasonalAnime,
  });

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Current Season</h1>
        <SeasonSelector />
      </div>

      {isLoading ? (
        <div className="text-white">Loading seasonal anime...</div>
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