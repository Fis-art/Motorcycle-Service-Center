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

const emptyForm = { title: '', location: '', type: '', desc: '' };

export default function CareersManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/careers');
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
    setForm({ title: item.title || '', location: item.location || '', type: item.type || '', desc: item.desc || item.description || '' });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.description) payload.description = payload.desc;
      if (editing) {
        await api.put(`/careers/${editing._id}`, payload);
      } else {
        await api.post('/careers', payload);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/careers/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    { key: 'title', label: 'Posisi' },
    { key: 'location', label: 'Lokasi' },
    { key: 'type', label: 'Tipe' },
    { key: 'desc', label: 'Deskripsi', render: (val) => val ? (val.length > 60 ? val.substring(0, 60) + '...' : val) : '-' },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Karir" />
      <div className="admin-page-header">
        <h1>Kelola Karir</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Lowongan</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <FormField label="Nama Posisi" name="title" value={form.title} onChange={handleChange} required />
            <div className="form-row">
              <FormField label="Lokasi" name="location" value={form.location} onChange={handleChange} placeholder="Tegal" />
              <FormField label="Tipe Pekerjaan" name="type" value={form.type} onChange={handleChange} placeholder="Full Time" />
            </div>
            <FormField label="Deskripsi" name="desc" type="textarea" value={form.desc} onChange={handleChange} rows={4} />
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
        title="Hapus Lowongan"
        message="Apakah Anda yakin ingin menghapus lowongan ini?"
      />
    </>
  );
}
