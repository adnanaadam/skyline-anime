import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getAnimeById } from '@/api/jikan';
import AnimeDetailHeader from '@/components/anime/animeDetailHeader';

export default function AnimeDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['anime', id],
    queryFn: () => getAnimeById(id),
  });

  if (isLoading)
    return (
      <div>
        {isLoading && (
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className='aspect-[3/4] animate-pulse rounded-lg bg-gray-800'
              />
            ))}
          </div>
        )}
      </div>
    );

  const anime = data?.data;

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <AnimeDetailHeader anime={anime} />

      <div className='container mx-auto p-4'>
        <div className='flex flex-col gap-8 md:flex-row'>
          <div className='md:w-1/3'>
            <img
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              className='w-full rounded-lg shadow-lg'
            />
          </div>

          <div className='md:w-2/3'>
            <h2 className='mb-4 text-2xl font-bold'>Synopsis</h2>
            <p className='mb-6 text-gray-300'>{anime.synopsis}</p>

            <div className='mb-6 grid grid-cols-2 gap-4'>
              <div>
                <h3 className='font-semibold'>Score</h3>
                <p>{anime.score || 'N/A'}</p>
              </div>
              <div>
                <h3 className='font-semibold'>Episodes</h3>
                <p>{anime.episodes || 'N/A'}</p>
              </div>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
