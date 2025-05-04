import { Routes, Route } from 'react-router';
import NotFound from './pages/notFound';
import Home from './pages/home';
import SharedLayout from './layouts/sharedLayout';

function App() {
  return (
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* 404 route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
  );
}

export default App;
