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
    <div className='min-h-screen bg-gray-900 p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-white'>Current Season</h1>
        <SeasonSelector />
      </div>

      {isLoading ? (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className='aspect-[3/4] animate-pulse rounded-lg bg-gray-800'
            />
          ))}
        </div>
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
