import { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import SEO from '../../components/shared/SEO';
import Button from '../../components/shared/Button';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Card from '../../components/shared/Card';
import Loading from '../../components/shared/Loading';
import EmptyState from '../../components/shared/EmptyState';
import api from '../../config/api';

export default function MessagesManage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const toggleRead = async (msg) => {
    try {
      await api.put(`/messages/${msg._id}`, { read: !msg.read });
      await fetchData();
    } catch {}
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/messages/${confirmDelete._id}`);
      setSelected(null);
      await fetchData();
    } catch {}
    setConfirmDelete(null);
  };

  if (loading) return <Loading fullPage />;

  return (
    <>
      <SEO title="Pesan Masuk" />
      <div className="admin-page-header">
        <h1>Pesan Masuk</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 'var(--spacing-xl)' }}>
        <div>
          {messages.length === 0 ? (
            <EmptyState title="Tidak ada pesan" message="Belum ada pesan yang masuk." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => setSelected(msg)}
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    backgroundColor: msg.read ? 'var(--color-surface)' : 'rgba(245, 158, 11, 0.05)',
                    borderRadius: 'var(--border-radius-md)',
                    border: `1px solid ${selected?._id === msg._id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    borderLeft: msg.read ? '3px solid transparent' : '3px solid var(--color-accent)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{msg.name}</p>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      {new Date(msg.createdAt || Date.now()).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 4 }}>{msg.subject || '(tanpa subjek)'}</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.message?.substring(0, 80)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <h3>Detail Pesan</h3>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                <button
                  onClick={() => toggleRead(selected)}
                  style={{ padding: 8, color: selected.read ? 'var(--color-text-muted)' : 'var(--color-info)', borderRadius: 'var(--border-radius-sm)' }}
                  title={selected.read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                >
                  {selected.read ? <Mail size={18} /> : <MailOpen size={18} />}
                </button>
                <button
                  onClick={() => setConfirmDelete(selected)}
                  style={{ padding: 8, color: 'var(--color-error)', borderRadius: 'var(--border-radius-sm)' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Nama</p>
              <p style={{ fontWeight: 600 }}>{selected.name}</p>
            </div>
            {selected.email && (
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Email</p>
                <p>{selected.email}</p>
              </div>
            )}
            {selected.phone && (
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Telepon</p>
                <p>{selected.phone}</p>
              </div>
            )}
            {selected.subject && (
              <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Subjek</p>
                <p>{selected.subject}</p>
              </div>
            )}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 2 }}>Pesan</p>
              <p style={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>{selected.message}</p>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Diterima: {new Date(selected.createdAt || Date.now()).toLocaleString('id-ID')}
            </p>
          </Card>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Hapus Pesan"
        message="Apakah Anda yakin ingin menghapus pesan ini?"
      />
    </>
  );
}
