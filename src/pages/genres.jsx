import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAnimeByGenre } from '@/api/jikan';
import GenreSelector from '@/components/anime/genreSelector';
import AnimeCard from '@/components/anime/animeCard';

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  // Add all genres you want to support
];

export default function Genres() {
  const [selectedGenre, setSelectedGenre] = useState(genres[0].id);

  const { data, isLoading } = useQuery({
    queryKey: ['animeByGenre', selectedGenre],
    queryFn: () => getAnimeByGenre(selectedGenre),
  });

  return (
    <div className='min-h-screen bg-gray-900 p-4'>
      <h1 className='mb-6 text-3xl font-bold text-white'>Browse by Genre</h1>

      <GenreSelector
        genres={genres}
        selected={selectedGenre}
        onChange={setSelectedGenre}
      />

      {isLoading ? (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className='aspect-[3/4] animate-pulse rounded-lg bg-gray-800'
            />
            //    <div className="text-white mt-4">Loading {genres.find(g => g.id === selectedGenre)?.name} anime...</div>
          ))}
        </div>
      ) : (
        <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {data?.data?.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}
