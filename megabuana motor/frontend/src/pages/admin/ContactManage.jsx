import { useState, useEffect } from 'react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import FormField from '../../components/admin/FormField';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

export default function ContactManage() {
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState({ address: '', phone: '', email: '', maps_url: '', working_hours: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/contact')
      .then(res => {
        if (res.data) {
          setContact(res.data);
          setForm({
            address: res.data.address || '',
            phone: res.data.phone || '',
            email: res.data.email || '',
            maps_url: res.data.maps_url || '',
            working_hours: res.data.working_hours || '',
          });
        }
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
      if (contact?._id) {
        await api.put(`/contact/${contact._id}`, form);
      } else {
        await api.post('/contact', form);
      }
      alert('Data berhasil disimpan!');
    } catch {}
    setSaving(false);
  };

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Kontak" />
      <div className="admin-page-header">
        <h1>Kelola Informasi Kontak</h1>
      </div>

      <Card>
        <form onSubmit={handleSave} className="admin-form">
          <FormField label="Alamat" name="address" value={form.address} onChange={handleChange} required />
          <div className="form-row">
            <FormField label="No. Telepon" name="phone" value={form.phone} onChange={handleChange} required />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <FormField label="URL Google Maps" name="maps_url" value={form.maps_url} onChange={handleChange} placeholder="https://maps.google.com/..." />
          <FormField label="Jam Operasional" name="working_hours" type="textarea" value={form.working_hours} onChange={handleChange} rows={3} placeholder="Senin - Sabtu: 08:00 - 18:00" />
          <Button type="submit" loading={saving}>Simpan</Button>
        </form>
      </Card>
    </>
  );
}
