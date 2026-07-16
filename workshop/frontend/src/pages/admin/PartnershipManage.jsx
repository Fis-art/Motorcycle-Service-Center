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

const emptyForm = { name: '', logo: '', url: '' };

export default function PartnershipManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/partnership');
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
    setForm({ name: item.name || '', logo: item.logo || '', url: item.url || '' });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/partnership/${editing._id}`, form);
      } else {
        await api.post('/partnership', form);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/partnership/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    { key: 'logo', label: 'Logo', render: (val) => val ? <img src={val} alt="" style={{ width: 60, height: 40, objectFit: 'contain', borderRadius: 4 }} /> : '-' },
    { key: 'name', label: 'Nama Brand' },
    { key: 'url', label: 'URL', render: (val) => val ? <a href={val} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-info)' }}>{val.substring(0, 40)}...</a> : '-' },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Kemitraan" />
      <div className="admin-page-header">
        <h1>Kelola Kemitraan</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Mitra</Button>
      </div>

      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-lg)' }}>
        Bagian ini sengaja dibiarkan kosong di halaman depan sampai ada data mitra yang ditambahkan.
      </p>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Mitra' : 'Tambah Mitra Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <FormField label="Nama Brand" name="name" value={form.name} onChange={handleChange} required />
            <FormField label="URL Website" name="url" type="url" value={form.url} onChange={handleChange} placeholder="https://..." />
            <FormField label="Logo">
              <ImageUploader currentImage={form.logo} onUpload={(url) => setForm({ ...form, logo: url })} folder="partnership" />
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
        title="Hapus Mitra"
        message="Apakah Anda yakin ingin menghapus mitra ini?"
      />
    </>
  );
}
