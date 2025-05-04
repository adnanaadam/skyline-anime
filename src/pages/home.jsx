import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getTopAnime, getSeasonalAnime } from '@/api/jikan';
import AnimeCard from '@/components/anime/animeCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const sectionTitle = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function Home() {
  const { data: topAnime, isLoading: topLoading, error: topError } = useQuery({
    queryKey: ['topAnime'],
    queryFn: getTopAnime,
  });

  const { data: seasonalAnime, isLoading: seasonalLoading, error: seasonalError } = useQuery({
    queryKey: ['seasonalAnime'],
    queryFn: getSeasonalAnime,
  });

  if (topLoading || seasonalLoading)
    return (
      <div className='min-h-screen bg-gray-900'>
        {/* Loading skeleton can go here */}
      </div>
    );

     if (topError || seasonalError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400">
          Error loading anime data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-900'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='relative flex h-[80vh] items-center justify-center overflow-hidden'
      >
        <div className='absolute inset-0 z-10 bg-gradient-to-t from-gray-900 to-gray-900/70' />
        <div className='absolute inset-0'>
          <video
            autoPlay
            loop
            muted
            playsInline
            className='h-full w-full object-cover'
          >
            <source src='/hero-video.mp4' type='video/mp4' />
          </video>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className='relative z-20 px-4 text-center'
        >
          <h1 className='mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-5xl font-bold text-transparent md:text-7xl'>
            Discover Anime
          </h1>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-gray-300'>
            Explore the best anime series, track your favorites, and never miss
            new releases.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-medium text-white'
          >
            Start Exploring
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Top Anime Section */}
      <section className='px-4 py-16'>
        <div className='container mx-auto'>
          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: '-100px' }}
            variants={container}
            className='mb-8 flex items-end justify-between'
          >
            <motion.h2
              variants={sectionTitle}
              className='text-3xl font-bold text-white'
            >
              Top Rated Anime
            </motion.h2>
            <motion.div variants={item}>
              <Link
                to='/top'
                className='flex items-center text-blue-400 transition-colors hover:text-blue-300'
              >
                View all <ChevronRight className='ml-1 h-5 w-5' />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            variants={container}
            className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5'
          >
            {topAnime?.data?.slice(0, 5).map((anime) => (
              <motion.div key={anime.mal_id} variants={item}>
                <AnimeCard anime={anime} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seasonal Anime Section */}
      <section className='bg-gray-800/30 px-4 py-16'>
        <div className='container mx-auto'>
          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, margin: '-100px' }}
            variants={container}
            className='mb-8 flex items-end justify-between'
          >
            <motion.h2
              variants={sectionTitle}
              className='text-3xl font-bold text-white'
            >
              This Season
            </motion.h2>
            <motion.div variants={item}>
              <Link
                to='/seasonal'
                className='flex items-center text-blue-400 transition-colors hover:text-blue-300'
              >
                View all <ChevronRight className='ml-1 h-5 w-5' />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            variants={container}
            className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5'
          >
            {seasonalAnime?.data?.slice(0, 5).map((anime) => (
              <motion.div
                key={anime.mal_id}
                variants={item}
                whileHover={{ y: -10 }}
              >
                <AnimeCard anime={anime} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
