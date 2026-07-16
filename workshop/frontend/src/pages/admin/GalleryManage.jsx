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

const emptyForm = { title: '', caption: '', image: '' };

export default function GalleryManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/gallery');
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
    setForm({ title: item.title || '', caption: item.caption || '', image: item.image || '' });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.caption) payload.caption = payload.title;
      if (editing) {
        await api.put(`/gallery/${editing._id}`, payload);
      } else {
        await api.post('/gallery', payload);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/gallery/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    { key: 'image', label: 'Gambar', render: (val) => val ? <img src={val} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : '-' },
    { key: 'title', label: 'Judul' },
    { key: 'caption', label: 'Keterangan' },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Galeri" />
      <div className="admin-page-header">
        <h1>Kelola Galeri</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Foto</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Foto' : 'Tambah Foto Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <FormField label="Judul" name="title" value={form.title} onChange={handleChange} />
            <FormField label="Keterangan" name="caption" value={form.caption} onChange={handleChange} />
            <FormField label="Gambar" name="image">
              <ImageUploader currentImage={form.image} onUpload={(url) => setForm({ ...form, image: url })} folder="gallery" />
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
        title="Hapus Foto"
        message="Apakah Anda yakin ingin menghapus foto ini?"
      />
    </>
  );
}
