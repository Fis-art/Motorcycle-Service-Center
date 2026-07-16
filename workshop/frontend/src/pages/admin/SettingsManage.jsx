import { useState, useEffect } from 'react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import FormField from '../../components/admin/FormField';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

export default function SettingsManage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    api.get('/settings')
      .then(res => {
        const data = res.data || [];
        setSettings(data);
        const obj = {};
        data.forEach(s => { obj[s.key] = s.value; });
        setForm(obj);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', { settings: form });
      alert('Pengaturan berhasil disimpan!');
    } catch {}
    setSaving(false);
  };

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Pengaturan" />
      <div className="admin-page-header">
        <h1>Pengaturan Website</h1>
      </div>

      <Card>
        <form onSubmit={handleSave} className="admin-form">
          {settings.length > 0 ? settings.map((setting) => (
            <FormField
              key={setting._id}
              label={setting.label || setting.key}
              name={setting.key}
              type={setting.type === 'textarea' ? 'textarea' : 'text'}
              value={form[setting.key] || ''}
              onChange={handleChange}
              placeholder={`Masukkan ${setting.label || setting.key}`}
            />
          )) : (
            <p style={{ color: 'var(--color-text-muted)' }}>Belum ada pengaturan yang tersedia.</p>
          )}
          {settings.length > 0 && (
            <Button type="submit" loading={saving}>Simpan Pengaturan</Button>
          )}
        </form>
      </Card>
    </>
  );
}
