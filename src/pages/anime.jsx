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

  if (isLoading) return <div className="text-white p-4">Loading anime details...</div>;

  const anime = data?.data;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <AnimeDetailHeader anime={anime} />
      
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img 
              src={anime.images.webp.large_image_url} 
              alt={anime.title} 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-gray-300 mb-6">{anime.synopsis}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Score</h3>
                <p>{anime.score || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold">Episodes</h3>
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