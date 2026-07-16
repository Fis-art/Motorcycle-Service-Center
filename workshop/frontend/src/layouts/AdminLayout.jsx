import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Home, Image, Users, MessageSquare,
  Settings, LogOut, Menu, ChevronLeft, ChevronRight,
  Sparkles, FileText, ImageIcon, Star, Mail, Share2, Shield,
  Briefcase, Link2
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/hero', label: 'Hero Slider', icon: Sparkles },
  { path: '/admin/about', label: 'Tentang Kami', icon: FileText },
  { path: '/admin/services', label: 'Layanan', icon: Settings },
  { path: '/admin/stats', label: 'Pencapaian', icon: Settings },
  { path: '/admin/gallery', label: 'Galeri', icon: ImageIcon },
  { path: '/admin/testimonials', label: 'Testimoni', icon: Star },
  { path: '/admin/careers', label: 'Karir', icon: Briefcase },
  { path: '/admin/partnership', label: 'Kemitraan', icon: Link2 },
  { path: '/admin/contact', label: 'Kontak', icon: Mail },
  { path: '/admin/social-media', label: 'Media Sosial', icon: Share2 },
  { path: '/admin/messages', label: 'Pesan Masuk', icon: MessageSquare },
  { path: '/admin/settings', label: 'Pengaturan', icon: Shield },
];

export default function AdminLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) return <Outlet />;

  return (
    <div className="admin-layout">
      <aside
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: collapsed ? '72px' : '260px',
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 'var(--z-sticky)',
          transition: 'width var(--transition-base)',
        }}
      >
        <div className="sidebar-header" style={{
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '72px',
        }}>
          <div className="sidebar-logo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            color: 'var(--color-text)',
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--font-size-lg)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>
            <span style={{ color: 'var(--color-secondary)' }}>MB</span>
            {!collapsed && <span>Admin Panel</span>}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Perluas sidebar' : 'Lipat sidebar'}
            style={{
              display: collapsed ? 'none' : 'flex',
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius-md)',
              color: 'var(--color-text-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav" style={{
          flex: 1,
          padding: 'var(--spacing-md)',
          overflowY: 'auto',
        }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--border-radius-lg)',
                  color: isActive ? 'var(--color-secondary)' : 'var(--color-text-muted)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-sm)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: isActive ? 'rgba(233, 69, 96, 0.1)' : 'transparent',
                  borderLeft: isActive && !collapsed ? '3px solid var(--color-secondary)' : 'none',
                })}
              >
                <Icon size={20} strokeWidth={2} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer" style={{
          padding: 'var(--spacing-md)',
          borderTop: '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-sm)' }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--border-radius-full)',
              background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--font-size-sm)',
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || 'Admin'}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>
                  {user?.role || 'admin'}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 'calc(var(--z-sticky) - 1)',
          }}
        />
      )}

      <div className="admin-main" style={{
        flex: 1,
        marginLeft: collapsed ? '72px' : '260px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left var(--transition-base)',
      }}>
        <header className="admin-topbar" style={{
          position: 'sticky',
          top: 0,
          height: '72px',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--spacing-xl)',
          zIndex: 'var(--z-sticky)',
        }}>
          <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka menu"
              style={{
                display: 'none',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius-md)',
                color: 'var(--color-text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Menu size={24} strokeWidth={2} />
            </button>
            <h1 className="page-title" style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text)',
            }}>
              {navItems.find(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'))?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <button
              onClick={logout}
              className="logout-btn"
              style={{
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--border-radius-md)',
                color: 'var(--color-text-muted)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <LogOut size={18} strokeWidth={2} />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        <main className="admin-content" style={{
          flex: 1,
          padding: 'var(--spacing-xl)',
          overflowY: 'auto',
        }}>
          <Outlet />
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-main {
            margin-left: 0;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .sidebar-toggle {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .admin-topbar {
            padding: 0 var(--spacing-md);
          }
          .admin-content {
            padding: var(--spacing-md);
          }
        }
      `}</style>
    </div>
  );
}