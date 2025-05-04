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
    <div className="bg-gray-900 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Browse by Genre</h1>
      
      <GenreSelector 
        genres={genres}
        selected={selectedGenre}
        onChange={setSelectedGenre}
      />

      {isLoading ? (
        <div className="text-white mt-4">Loading {genres.find(g => g.id === selectedGenre)?.name} anime...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {data?.data?.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
}