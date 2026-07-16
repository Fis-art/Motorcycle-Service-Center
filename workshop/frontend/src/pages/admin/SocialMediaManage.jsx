import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import DataTable from '../../components/admin/DataTable';
import FormField from '../../components/admin/FormField';
import ImageUploader from '../../components/admin/ImageUploader';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

const emptyForm = { platform: '', username: '', url: '', description: '', cta: '', image: '' };

export default function SocialMediaManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/social-media');
      setItems(res.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setForm({
      platform: item.platform || '',
      username: item.username || '',
      url: item.url || '',
      description: item.description || '',
      cta: item.cta || '',
      image: item.image || '',
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/social-media/${editing._id}`, form);
      } else {
        await api.post('/social-media', form);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/social-media/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    { key: 'platform', label: 'Platform' },
    { key: 'username', label: 'Username' },
    { key: 'url', label: 'URL', render: (val) => val ? <a href={val} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-info)' }}>{val.substring(0, 40)}...</a> : '-' },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Sosial Media" />
      <div className="admin-page-header">
        <h1>Kelola Sosial Media</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah</Button>
      </div>

      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-lg)' }}>
        Contoh: Instagram (@fitmotortegal), TikTok (@fitmotortegal), Facebook (FitMotor Tegal).
      </p>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Sosial Media' : 'Tambah Sosial Media'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-row">
              <FormField label="Platform" name="platform" value={form.platform} onChange={handleChange} required placeholder="Instagram, Facebook, TikTok" />
              <FormField label="Username" name="username" value={form.username} onChange={handleChange} placeholder="@fitmotortegal" />
            </div>
            <FormField label="URL" name="url" type="url" value={form.url} onChange={handleChange} required placeholder="https://instagram.com/..." />
            <FormField label="Deskripsi" name="description" type="textarea" value={form.description} onChange={handleChange} rows={3} placeholder="Update terbaru dan promo menarik!" />
            <FormField label="Teks Tombol (CTA)" name="cta" value={form.cta} onChange={handleChange} placeholder="Follow Instagram" />
            <FormField label="Gambar Profil">
              <ImageUploader currentImage={form.image} onUpload={(url) => setForm({ ...form, image: url })} folder="social" />
            </FormField>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-lg)' }}>
              <Button type="submit" loading={saving}>Simpan</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <DataTable columns={columns} data={items} onEdit={openEdit} onDelete={(row) => setConfirmDelete(row)} />

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Hapus Sosial Media"
        message="Apakah Anda yakin ingin menghapus sosial media ini?"
      />
    </>
  );
}
