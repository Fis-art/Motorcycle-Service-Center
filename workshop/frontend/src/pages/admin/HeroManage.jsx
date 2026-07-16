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

const emptyForm = { title: '', subtitle: '', image: '', order: 0 };

export default function HeroManage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchSlides = async () => {
    try {
      const res = await api.get('/hero');
      setSlides(res.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setForm({ ...emptyForm, order: slides.length });
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (slide) => {
    setForm({ title: slide.title, subtitle: slide.subtitle, image: slide.image, order: slide.order ?? 0 });
    setEditing(slide);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/hero/${editing._id}`, form);
      } else {
        await api.post('/hero', form);
      }
      await fetchSlides();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/hero/${confirmDelete._id}`);
      await fetchSlides();
    } catch {}
    setConfirmDelete(null);
  };

  const handleSortUp = async (index) => {
    if (index === 0) return;
    const items = [...slides];
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    setSlides(items);
    try {
      await api.put('/hero/sort', { slides: items.map((s, i) => ({ _id: s._id, order: i })) });
    } catch {}
  };

  const handleSortDown = async (index) => {
    if (index === slides.length - 1) return;
    const items = [...slides];
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    setSlides(items);
    try {
      await api.put('/hero/sort', { slides: items.map((s, i) => ({ _id: s._id, order: i })) });
    } catch {}
  };

  const columns = [
    { key: 'image', label: 'Gambar', render: (val) => val ? <img src={val} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : '-' },
    { key: 'title', label: 'Judul' },
    { key: 'subtitle', label: 'Subjudul' },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Hero Section" />
      <div className="admin-page-header">
        <h1>Hero Section</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Slide</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Slide' : 'Tambah Slide Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <FormField label="Judul" name="title" value={form.title} onChange={handleChange} required />
            <FormField label="Subjudul" name="subtitle" value={form.subtitle} onChange={handleChange} />
            <FormField label="Gambar" name="image">
              <ImageUploader currentImage={form.image} onUpload={(url) => setForm({ ...form, image: url })} folder="hero" />
            </FormField>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-lg)' }}>
              <Button type="submit" loading={saving}>Simpan</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <DataTable
        columns={columns}
        data={slides}
        onEdit={openEdit}
        onDelete={(row) => setConfirmDelete(row)}
        onSortUp={handleSortUp}
        onSortDown={handleSortDown}
      />

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Hapus Slide"
        message="Apakah Anda yakin ingin menghapus slide ini?"
      />
    </>
  );
}
