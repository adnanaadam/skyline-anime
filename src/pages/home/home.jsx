import Hero from './hero';
import MainContent from './content';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-900'>
      <Hero />
      <MainContent />
    </div>
  );
}
