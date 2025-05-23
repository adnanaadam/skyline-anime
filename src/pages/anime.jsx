import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getAnimeFull, getAnimeVideos } from '@/api/jikan';
import AnimeDetailHeader from '@/components/anime/animeDetailHeader';
import TrailerSection from '@/components/anime/trailerSection';

export default function AnimeDetail() {
  const { id } = useParams();
  
  const { data: animeData } = useQuery({
    queryKey: ['animeFull', id],
    queryFn: () => getAnimeFull(id),
  });

  const { data: videosData } = useQuery({
    queryKey: ['animeVideos', id],
    queryFn: () => getAnimeVideos(id),
  });

  const anime = animeData?.data;

  if (!anime) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <AnimeDetailHeader anime={anime} />
      
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <img 
              src={anime.images.webp.large_image_url} 
              alt={anime.title} 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <p className="text-gray-300 mb-6">{anime.synopsis || 'No synopsis available.'}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-400">Score</h3>
                <p className="text-white">{anime.score || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Episodes</h3>
                <p className="text-white">{anime.episodes || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Status</h3>
                <p className="text-white">{anime.status || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Aired</h3>
                <p className="text-white">{anime.aired?.string || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Rating</h3>
                <p className="text-white">{anime.rating || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <TrailerSection videos={videosData} />
      </div>
    </div>
  );
}