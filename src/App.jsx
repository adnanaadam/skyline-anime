import { Routes, Route } from 'react-router';
import SharedLayout from './layouts/sharedLayout';
import Home from './pages/home';
import TopAnime from './pages/top';
import SeasonalAnime from './pages/seasonal';
import AnimeDetail from './pages/anime';
import Search from './pages/search';
import Genres from './pages/genres';
import NotFound from './pages/notFound';

function App() {
  return (
    <Routes>
      {/* Main layout wrapper for all pages */}
      <Route path="/" element={<SharedLayout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="top" element={<TopAnime />} />
        <Route path="seasonal" element={<SeasonalAnime />} />
        <Route path="genres" element={<Genres />} />
        <Route path="search" element={<Search />} />
        <Route path="anime/:id" element={<AnimeDetail />} />
        
        {/* 404 route - catches all undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;