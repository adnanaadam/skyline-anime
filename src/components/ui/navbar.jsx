import { Link, useNavigate } from 'react-router';
import { Search, Menu, X } from 'lucide-react';
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
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Skyline
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/top" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Top Anime
              </Link>
              <Link 
                to="/seasonal" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Seasonal
              </Link>
              <Link 
                to="/genres" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Genres
              </Link>
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-gray-300 hover:text-white transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          {searchOpen && (
            <div className="pb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search anime..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/90 z-50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <Link 
                to="/" 
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Skyline
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search anime..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </form>

              <nav className="flex flex-col space-y-4 text-lg">
                <Link 
                  to="/top" 
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Top Anime
                </Link>
                <Link 
                  to="/seasonal" 
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Seasonal
                </Link>
                <Link 
                  to="/genres" 
                  className="text-gray-300 hover:text-white transition-colors py-2"
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