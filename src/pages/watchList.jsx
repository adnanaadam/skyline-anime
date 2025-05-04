import { useQueries } from '@tanstack/react-query';
import { useAnimeStore } from '@/store/store';
import { getAnimeById } from '@/api/jikan';
import AnimeCard from '@/components/anime/animeCard';
import EmptyState from '@/components/ui/emptyState';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useAnimeStore();

  // Fetch full details for each anime in wishlist
  const animeQueries = useQueries({
    queries: wishlist.map((anime) => ({
      queryKey: ['anime', anime.mal_id],
      queryFn: () => getAnimeById(anime.mal_id),
    })),
  });

  const isLoading = animeQueries.some((query) => query.isLoading);
  const animeData = animeQueries.map((query) => query.data?.data);

  if (wishlist.length === 0) {
    return (
      <EmptyState
        title='Your wishlist is empty'
        description='Add anime to your wishlist to see them here'
        icon='heart'
      />
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 p-4'>
      <div className='container mx-auto'>
        <h1 className='mb-6 text-3xl font-bold text-white'>Your Wishlist</h1>

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
            {animeData.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onRemove={() => removeFromWishlist(anime.mal_id)}
                isInWishlist={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
