import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import DataTable from '../../components/admin/DataTable';
import FormField from '../../components/admin/FormField';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import api from '../../config/api';

const emptyForm = { name: '', title: '', description: '', price: '', icon: '' };

export default function ServicesManage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/services');
      setServices(res.data || []);
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
    setForm({ name: item.name || '', title: item.title || '', description: item.description || '', price: item.price || '', icon: item.icon || '' });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.title) payload.title = payload.name;
      if (!payload.name) payload.name = payload.title;
      if (editing) {
        await api.put(`/services/${editing._id}`, payload);
      } else {
        await api.post('/services', payload);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/services/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    { key: 'icon', label: 'Ikon', render: (val) => val || '-' },
    { key: 'title', label: 'Nama' },
    { key: 'description', label: 'Deskripsi', render: (val) => val ? val.substring(0, 60) + '...' : '-' },
    { key: 'price', label: 'Harga' },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Layanan" />
      <div className="admin-page-header">
        <h1>Kelola Layanan</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Layanan</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <FormField label="Nama Layanan" name="title" value={form.title} onChange={handleChange} required />
            <FormField label="Deskripsi" name="description" type="textarea" value={form.description} onChange={handleChange} rows={3} />
            <FormField label="Harga" name="price" value={form.price} onChange={handleChange} placeholder="Contoh: Mulai Rp50.000" />
            <FormField label="Kode Ikon" name="icon" value={form.icon} onChange={handleChange} placeholder="1f527 (unicode)" />
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-lg)' }}>
              <Button type="submit" loading={saving}>Simpan</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <DataTable columns={columns} data={services} onEdit={openEdit} onDelete={(row) => setConfirmDelete(row)} />

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Hapus Layanan"
        message="Apakah Anda yakin ingin menghapus layanan ini?"
      />
    </>
  );
}
