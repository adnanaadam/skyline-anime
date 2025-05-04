import { motion } from 'framer-motion';

export default function AnimeDetailHeader({ anime }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-64 md:h-96 w-full overflow-hidden"
    >
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10" />
      <img
        src={anime.images.webp.large_image_url}
        alt={anime.title}
        className="w-full h-full object-cover object-center"
      />
      
      {/* Title and basic info */}
      <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
        <motion.h1 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg"
        >
          {anime.title}
        </motion.h1>
        
        <div className="flex flex-wrap gap-3">
          {anime.score && (
            <div className="flex items-center bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm">
              ★ {anime.score.toFixed(1)}
            </div>
          )}
          {anime.year && (
            <div className="bg-gray-800/90 text-white px-3 py-1 rounded-full text-sm">
              {anime.year}
            </div>
          )}
          {anime.episodes && (
            <div className="bg-gray-800/90 text-white px-3 py-1 rounded-full text-sm">
              {anime.episodes} eps
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}