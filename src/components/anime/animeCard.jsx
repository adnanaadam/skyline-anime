import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useAnimeStore } from '@/store/store';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function AnimeCard({ anime, onRemove, isInWishlist = false }) {
  const { addToWishlist, wishlist } = useAnimeStore();
  const [isHovered, setIsHovered] = useState(false);
  const alreadyInWishlist = wishlist.some(
    (item) => item.mal_id === anime.mal_id
  );

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Stop event from bubbling
    e.stopPropagation(); // Additional protection
    
    if (isInWishlist) {
      onRemove?.();
    } else if (!alreadyInWishlist) {
      addToWishlist(anime);
    }
  };

  return (
    <Link 
      to={`/anime/${anime.mal_id}`}
      className="block" // Ensure link takes full space
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className='group relative overflow-hidden rounded-lg shadow-lg'
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div className='relative aspect-[3/4]'>
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            className='h-full w-full object-cover transition-all duration-300 group-hover:brightness-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
        </div>
        <div className='absolute right-0 bottom-0 left-0 p-4'>
          <h3 className='text-shadow line-clamp-2 font-semibold text-white'>
            {anime.title}
          </h3>
          {anime.score && (
            <div className='mt-2 flex items-center'>
              <span className='text-sm font-bold text-yellow-400'>
                ★ {anime.score.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 rounded-full p-2 ${
            isInWishlist || alreadyInWishlist
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-800/80 hover:bg-gray-700'
          } transition-colors z-10`} // Added z-10 to ensure button is above link
        >
          <Heart 
            className='h-5 w-5' 
            fill={
              isInWishlist || alreadyInWishlist 
                ? isHovered ? '#ffffff' : '#f87171' 
                : 'transparent'
            }
            stroke={
              isInWishlist || alreadyInWishlist 
                ? isHovered ? '#ffffff' : '#f87171' 
                : '#ffffff'
            }
          />
        </button>
      </motion.div>
    </Link>
  );
}