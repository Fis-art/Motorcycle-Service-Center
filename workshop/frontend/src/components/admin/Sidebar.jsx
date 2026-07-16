import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Image, Info, Wrench, Camera, MessageSquare,
  Phone, Share2, Settings, Mail, X, Wrench as WrenchIcon, Briefcase, Link2,
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/admin/hero', label: 'Hero Section', icon: <Image size={20} /> },
  { path: '/admin/about', label: 'Tentang', icon: <Info size={20} /> },
  { path: '/admin/services', label: 'Layanan', icon: <Wrench size={20} /> },
  { path: '/admin/stats', label: 'Pencapaian', icon: <Settings size={20} /> },
  { path: '/admin/gallery', label: 'Galeri', icon: <Camera size={20} /> },
  { path: '/admin/testimonials', label: 'Testimoni', icon: <MessageSquare size={20} /> },
  { path: '/admin/careers', label: 'Karir', icon: <Briefcase size={20} /> },
  { path: '/admin/partnership', label: 'Kemitraan', icon: <Link2 size={20} /> },
  { path: '/admin/contact', label: 'Kontak', icon: <Phone size={20} /> },
  { path: '/admin/social-media', label: 'Sosial Media', icon: <Share2 size={20} /> },
  { path: '/admin/messages', label: 'Pesan', icon: <Mail size={20} /> },
  { path: '/admin/settings', label: 'Pengaturan', icon: <Settings size={20} /> },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div style={{ padding: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <WrenchIcon size={24} color="var(--color-accent)" />
          <span style={{ fontWeight: 800, fontSize: 'var(--font-size-lg)' }}>Admin</span>
        </div>
        <button className="hide-desktop" onClick={onClose} style={{ color: 'var(--color-white)' }}>
          <X size={20} />
        </button>
      </div>

      <nav style={{ padding: '0 var(--spacing-md)' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '0.75rem 1rem',
              borderRadius: 'var(--border-radius-md)',
              marginBottom: 2,
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              color: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.7)',
              backgroundColor: isActive ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
              transition: 'all var(--transition-fast)',
            })}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
