import { useState, useEffect } from 'react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import FormField from '../../components/admin/FormField';
import ImageUploader from '../../components/admin/ImageUploader';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

export default function AboutManage() {
  const [about, setAbout] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/about')
      .then(res => {
        if (res.data) {
          setAbout(res.data);
          setForm({ title: res.data.title || '', content: res.data.content || res.data.description || '', image: res.data.image || '' });
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
      if (about?._id) {
        await api.put(`/about/${about._id}`, form);
      } else {
        await api.post('/about', form);
      }
      alert('Data berhasil disimpan!');
    } catch {}
    setSaving(false);
  };

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Tentang Kami" />
      <div className="admin-page-header">
        <h1>Kelola Halaman Tentang</h1>
      </div>

      <Card>
        <form onSubmit={handleSave} className="admin-form">
          <FormField label="Judul" name="title" value={form.title} onChange={handleChange} required />
          <FormField label="Konten" name="content" type="textarea" value={form.content} onChange={handleChange} rows={8} required />
          <FormField label="Gambar">
            <ImageUploader currentImage={form.image} onUpload={(url) => setForm({ ...form, image: url })} folder="about" />
          </FormField>
          <Button type="submit" loading={saving}>Simpan</Button>
        </form>
      </Card>
    </>
  );
}
