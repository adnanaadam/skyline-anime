import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { Outlet } from 'react-router';

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
