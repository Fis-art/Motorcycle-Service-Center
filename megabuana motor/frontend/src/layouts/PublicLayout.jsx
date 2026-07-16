import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import ScrollToTop from '../components/shared/ScrollToTop';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}>
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}