import { motion } from 'framer-motion';
import Particles from '@/components/ui/particles';
import ClickSound from '@/components/ui/clickSound';

export default function Hero() {
  const playSound = ClickSound();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 animate-gradientMove"
    >
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-105 opacity-30"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 to-gray-900/80" />

      <Particles />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-30 px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
        >
          Skyline Anime
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-xl text-gray-300"
        >
          Discover, track and fall in love with your favorite anime series.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playSound}
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-medium text-white shadow-lg"
        >
          Start Exploring
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
