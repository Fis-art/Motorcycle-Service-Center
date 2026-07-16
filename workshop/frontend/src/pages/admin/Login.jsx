import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';
import SEO from '../../components/shared/SEO';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Login Admin" />
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 'var(--spacing-sm)' }}>
              <Wrench size={32} color="var(--color-accent)" />
              <h1>Megabuana Motor</h1>
            </div>
            <p>Panel Administrasi</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)' }}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="admin@example.com"
                style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)', outline: 'none' }}
              />
            </div>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)' }}>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="******"
                style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)', outline: 'none' }}
              />
            </div>
            {error && (
              <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-md)' }}>{error}</p>
            )}
            <Button type="submit" fullWidth loading={loading}>
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
