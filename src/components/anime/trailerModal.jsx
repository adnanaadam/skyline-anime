import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Film, Clapperboard } from 'lucide-react';

const getTypeIcon = (type) => {
  switch (type) {
    case 'Music Videos': return <Music className="h-5 w-5 text-purple-400" />;
    case 'Episode Previews': return <Film className="h-5 w-5 text-blue-400" />;
    default: return <Clapperboard className="h-5 w-5 text-red-400" />;
  }
};

export default function TrailerModal({ 
  isOpen, 
  onClose, 
  videoUrl, 
  videoTitle,
  videoType,
  videoAuthor 
}) {
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(videoUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {getTypeIcon(videoType)}
                  {videoTitle || videoType || 'Video Player'}
                </h3>
                {videoAuthor && (
                  <p className="text-sm text-gray-400 mt-1">{videoAuthor}</p>
                )}
              </div>
              <button 
                className="text-white hover:text-gray-300 transition-colors"
                onClick={onClose}
                aria-label="Close video"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            
            <div className="aspect-video w-full">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-white">Video player not available</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}