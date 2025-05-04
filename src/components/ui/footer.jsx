import { Link } from 'react-router';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding */}
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Skyline
              </span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              Anime discovery made simple
            </p>
          </div>

          {/* Simple Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link 
              to="/about" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              About
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Minimal Social Links */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="mailto:youremail@example.com" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Skyline Anime. Not affiliated with any studio.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Data provided by Jikan API
          </p>
        </div>
      </div>
    </footer>
  );
}