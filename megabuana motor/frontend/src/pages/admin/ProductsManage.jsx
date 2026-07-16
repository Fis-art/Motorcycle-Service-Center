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
import { formatPrice, categoryLabels } from '../../utils/format';

const emptyForm = {
  name: '', brand: '', category: 'sparepart', description: '',
  price: '', old_price: '', promo: false, stock: '', motor_type: 'Matic',
  image: '', existing_image: '',
};

export default function ProductsManage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setForm({
      name: item.name || '',
      brand: item.brand || '',
      category: item.category || 'sparepart',
      description: item.description || '',
      price: item.price || '',
      old_price: item.old_price || '',
      promo: !!item.promo,
      stock: item.stock || '',
      motor_type: item.motor_type || 'Matic',
      image: '',
      existing_image: item.image || '',
    });
    setEditing(item);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('brand', form.brand);
      fd.append('category', form.category);
      fd.append('description', form.description);
      fd.append('price', Number(form.price) || 0);
      fd.append('old_price', form.old_price ? Number(form.old_price) : '');
      fd.append('promo', form.promo ? 'true' : 'false');
      fd.append('stock', Number(form.stock) || 0);
      fd.append('motor_type', form.motor_type);
      fd.append('existing_image', form.existing_image);
      if (form.image) fd.append('image', form.image);

      if (editing) {
        await api.put(`/products/${editing._id}`, fd);
      } else {
        await api.post('/products', fd);
      }
      await fetchData();
      setShowForm(false);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/products/${confirmDelete._id}`);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  const columns = [
    {
      key: 'image', label: 'Gambar',
      render: (val) => val
        ? <img src={val} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
        : <span style={{ color: 'var(--color-text-light)' }}>—</span>,
    },
    { key: 'name', label: 'Nama' },
    {
      key: 'category', label: 'Kategori',
      render: (val) => categoryLabels[val] || val,
    },
    { key: 'brand', label: 'Merek', render: (val) => val || '-' },
    {
      key: 'price', label: 'Harga',
      render: (val, row) => (
        <span>
          <strong>{formatPrice(val)}</strong>
          {row.old_price && (
            <span style={{ textDecoration: 'line-through', color: 'var(--color-text-light)', marginLeft: 8, fontSize: 'var(--font-size-sm)' }}>
              {formatPrice(row.old_price)}
            </span>
          )}
        </span>
      ),
    },
    {
      key: 'promo', label: 'Promo',
      render: (val) => val
        ? <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Ya</span>
        : <span style={{ color: 'var(--color-text-light)' }}>Tidak</span>,
    },
    {
      key: 'stock', label: 'Stok',
      render: (val) => (Number(val) >= 999 ? 'Tersedia' : `${val} pcs`),
    },
  ];

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Produk & Promo" />
      <div className="admin-page-header">
        <h1>Kelola Produk & Promo</h1>
        <Button onClick={openCreate}><Plus size={18} /> Tambah Produk</Button>
      </div>

      {showForm && (
        <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{editing ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
          <form onSubmit={handleSave} className="admin-form">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--spacing-md)' }}>
              <FormField label="Nama Produk" required>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
              </FormField>
              <FormField label="Merek">
                <input className="form-input" name="brand" value={form.brand} onChange={handleChange} placeholder="Yamalube, IRC, dst" />
              </FormField>
              <FormField label="Kategori">
                <select className="form-input" name="category" value={form.category} onChange={handleChange}>
                  <option value="sparepart">Sparepart</option>
                  <option value="aksesoris">Aksesoris</option>
                  <option value="oli">Oli</option>
                  <option value="aki">Aki</option>
                  <option value="ban">Ban</option>
                  <option value="servis">Paket Servis</option>
                </select>
              </FormField>
              <FormField label="Tipe Motor">
                <select className="form-input" name="motor_type" value={form.motor_type} onChange={handleChange}>
                  <option value="Matic">Matic</option>
                  <option value="Bebek">Bebek</option>
                  <option value="Sport">Sport</option>
                  <option value="All">Semua</option>
                </select>
              </FormField>
              <FormField label="Harga (Rp)" required>
                <input className="form-input" name="price" type="number" value={form.price} onChange={handleChange} required />
              </FormField>
              <FormField label="Harga Coret (Rp)">
                <input className="form-input" name="old_price" type="number" value={form.old_price} onChange={handleChange} placeholder="Opsional" />
              </FormField>
              <FormField label="Stok">
                <input className="form-input" name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="999 = Tersedia" />
              </FormField>
            </div>
            <FormField label="Deskripsi">
              <textarea className="form-input" name="description" rows={3} value={form.description} onChange={handleChange} />
            </FormField>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', fontWeight: 600 }}>
                <input type="checkbox" name="promo" checked={form.promo} onChange={handleChange} />
                Tampilkan di halaman Promo
              </label>
            </div>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Gambar</label>
              {form.existing_image && !form.image && (
                <img src={form.existing_image} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              )}
              <input type="file" name="image" accept="image/*" onChange={handleImage} />
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-lg)' }}>
              <Button type="submit" loading={saving}>Simpan</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
            </div>
          </form>
        </Card>
      )}

      <DataTable columns={columns} data={products} onEdit={openEdit} onDelete={(row) => setConfirmDelete(row)} />

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini?"
      />
    </>
  );
}
