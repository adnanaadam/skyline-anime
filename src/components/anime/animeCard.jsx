import { motion } from 'framer-motion';
import { Link } from 'react-router';

export default function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <motion.div 
        className="relative group overflow-hidden rounded-lg shadow-lg"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div className="aspect-[3/4] relative">
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold line-clamp-2 text-shadow">
            {anime.title}
          </h3>
          {anime.score && (
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 text-sm font-bold">
                ★ {anime.score.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}