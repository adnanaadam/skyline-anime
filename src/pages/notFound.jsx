import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Ghost, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-skyline-dark text-center p-4">
      <div className="max-w-md mx-auto">
        {/* Animated Ghost Icon */}
        <div className="relative mb-8">
          <Ghost className="h-32 w-32 mx-auto text-blue-400 animate-float" />
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-10 blur-xl -z-10"></div>
        </div>
        
        {/* Error Message */}
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The anime you're looking for has vanished into the void... 
          or maybe you just took a wrong turn.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-blue-400 text-blue-400 hover:bg-blue-900/50">
            <Link to="/top" className="flex items-center gap-2">
              Browse Top Anime
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}