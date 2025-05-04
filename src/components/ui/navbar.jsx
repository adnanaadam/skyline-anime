import { Link, useNavigate } from 'react-router';
import { Search, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className='sticky top-0 z-50 border-b border-gray-800 bg-gray-900'>
        <div className='container mx-auto px-4'>
          <div className='flex h-16 items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex items-center'>
              <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-xl font-bold text-transparent'>
                Skyline
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden items-center space-x-6 md:flex'>
              <Link
                to='/top'
                className='text-gray-300 transition-colors hover:text-white'
              >
                Top Anime
              </Link>
              <Link
                to='/seasonal'
                className='text-gray-300 transition-colors hover:text-white'
              >
                Seasonal
              </Link>
              <Link
                to='/genres'
                className='text-gray-300 transition-colors hover:text-white'
              >
                Genres
              </Link>
              <Link
                to='/wishlist'
                className='flex items-center gap-1 text-gray-300 transition-colors hover:text-white'
              >
                <Heart className='h-5 w-5' />
                <span>Wishlist</span>
              </Link>
            </div>

            {/* Search and Mobile Menu */}
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className='text-gray-300 transition-colors hover:text-white'
                aria-label='Search'
              >
                <Search className='h-5 w-5' />
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className='text-gray-300 transition-colors hover:text-white md:hidden'
                aria-label='Menu'
              >
                <Menu className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          {searchOpen && (
            <div className='pb-4'>
              <form onSubmit={handleSearch} className='relative'>
                <input
                  type='text'
                  placeholder='Search anime...'
                  className='w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 pl-10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Search className='absolute top-2.5 left-3 h-5 w-5 text-gray-400' />
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-sm'>
          <div className='container mx-auto px-4 py-6'>
            <div className='mb-8 flex items-center justify-between'>
              <Link
                to='/'
                className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-xl font-bold text-transparent'
                onClick={() => setMobileMenuOpen(false)}
              >
                Skyline
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className='text-gray-300 transition-colors hover:text-white'
              >
                <X className='h-6 w-6' />
              </button>
            </div>

            <div className='space-y-6'>
              <form onSubmit={handleSearch} className='relative'>
                <input
                  type='text'
                  placeholder='Search anime...'
                  className='w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 pl-12 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Search className='absolute top-3.5 left-4 h-5 w-5 text-gray-400' />
              </form>

              <nav className='flex flex-col space-y-4 text-lg'>
                <Link
                  to='/top'
                  className='py-2 text-gray-300 transition-colors hover:text-white'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Top Anime
                </Link>
                <Link
                  to='/seasonal'
                  className='py-2 text-gray-300 transition-colors hover:text-white'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Seasonal
                </Link>
                <Link
                  to='/genres'
                  className='py-2 text-gray-300 transition-colors hover:text-white'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Genres
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
