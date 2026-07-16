import { useState, useEffect } from 'react';
import { Plus, Star } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import DataTable from '../../components/admin/DataTable';
import FormField from '../../components/admin/FormField';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

const emptyForm = { name: '', client_name: '', content: '', rating: 5, position: '' };

export default function TestimonialsManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/testimonials');
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
    setForm({ name: item.name || item.client_name || '', client_name: item.client_name || item.name || '', content: item.content || '', rating: item.rating || 5, position: item.position || '' });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.client_name) payload.client_name = payload.name;
      if (!payload.name) payload.name = payload.client_name;
      if (editing) {
        await api.put(`/testimonials/${editing._id}`, payload);
      } else {
        await api.post('/testimonials', payload);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/testimonials/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    { key: 'name', label: 'Nama', render: (val, row) => val || row.client_name || '-' },
    { key: 'content', label: 'Testimoni', render: (val) => val ? val.substring(0, 80) + '...' : '-' },
    { key: 'rating', label: 'Rating', render: (val) => (
      <div style={{ display: 'flex', gap: 1, color: 'var(--color-accent)' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={14} fill={j < (val || 5) ? 'currentColor' : 'none'} />)}
      </div>
    )},
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Testimoni" />
      <div className="admin-page-header">
        <h1>Kelola Testimoni</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Testimoni</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <div className="form-row">
              <FormField label="Nama" name="name" value={form.name} onChange={handleChange} required />
              <FormField label="Posisi/Pekerjaan" name="position" value={form.position} onChange={handleChange} />
            </div>
            <FormField label="Testimoni" name="content" type="textarea" value={form.content} onChange={handleChange} rows={4} required />
            <FormField label="Rating" name="rating" type="select" value={String(form.rating)} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} options={[1,2,3,4,5].map(v => ({ value: String(v), label: `${v} Bintang` }))} />
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
        title="Hapus Testimoni"
        message="Apakah Anda yakin ingin menghapus testimoni ini?"
      />
    </>
  );
}
