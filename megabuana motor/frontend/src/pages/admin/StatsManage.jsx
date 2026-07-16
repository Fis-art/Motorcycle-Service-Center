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

const emptyForm = { value: '', label: '', icon: 'star' };

export default function StatsManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/stats');
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
    setForm({ value: item.value || '', label: item.label || '', icon: item.icon || 'star' });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/stats/${editing._id}`, form);
      } else {
        await api.post('/stats', form);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/stats/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    { key: 'icon', label: 'Ikon', render: (val) => val || 'star' },
    { key: 'value', label: 'Nilai' },
    { key: 'label', label: 'Label' },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Pencapaian" />
      <div className="admin-page-header">
        <h1>Kelola Pencapaian</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Pencapaian</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Pencapaian' : 'Tambah Pencapaian Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <FormField label="Nilai (contoh: 500+)" name="value" value={form.value} onChange={handleChange} required />
            <FormField label="Label" name="label" value={form.label} onChange={handleChange} required />
            <FormField
              label="Ikon"
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="users, award, star, briefcase, handshake"
            />
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
        title="Hapus Pencapaian"
        message="Apakah Anda yakin ingin menghapus data pencapaian ini?"
      />
    </>
  );
}
