import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Gallery from './pages/public/Gallery';
import Testimonials from './pages/public/Testimonials';
import Contact from './pages/public/Contact';
import Careers from './pages/public/Careers';
import Promo from './pages/public/Promo';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import HeroManage from './pages/admin/HeroManage';
import AboutManage from './pages/admin/AboutManage';
import ServicesManage from './pages/admin/ServicesManage';
import StatsManage from './pages/admin/StatsManage';
import GalleryManage from './pages/admin/GalleryManage';
import TestimonialsManage from './pages/admin/TestimonialsManage';
import CareersManage from './pages/admin/CareersManage';
import PartnershipManage from './pages/admin/PartnershipManage';
import ContactManage from './pages/admin/ContactManage';
import SocialMediaManage from './pages/admin/SocialMediaManage';
import MessagesManage from './pages/admin/MessagesManage';
import SettingsManage from './pages/admin/SettingsManage';
import ProductsManage from './pages/admin/ProductsManage';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hero" element={<HeroManage />} />
        <Route path="about" element={<AboutManage />} />
        <Route path="services" element={<ServicesManage />} />
        <Route path="stats" element={<StatsManage />} />
        <Route path="gallery" element={<GalleryManage />} />
        <Route path="testimonials" element={<TestimonialsManage />} />
        <Route path="careers" element={<CareersManage />} />
        <Route path="partnership" element={<PartnershipManage />} />
        <Route path="contact" element={<ContactManage />} />
        <Route path="products" element={<ProductsManage />} />
        <Route path="social-media" element={<SocialMediaManage />} />
        <Route path="messages" element={<MessagesManage />} />
        <Route path="settings" element={<SettingsManage />} />
      </Route>
    </Routes>
  );
}
