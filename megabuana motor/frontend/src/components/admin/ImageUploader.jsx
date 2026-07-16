import { useState, useRef, useEffect } from 'react';
import { X, Image as ImageIcon, Upload, Check, AlertCircle } from 'lucide-react';

export default function ImageUploader({
  value = '',
  onChange,
  label = 'Upload Gambar',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024,
  aspectRatio = null,
  multiple = false,
}) {
  const [preview, setPreview] = useState(value ? [value].flat() : []);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (value) {
      setPreview(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const validateFile = (file) => {
    if (!accept.split(',').some(type => file.type.match(type.replace('*', '.*')))) {
      return 'Format file tidak didukung';
    }
    if (file.size > maxSize) {
      return `Ukuran file maksimal ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    return null;
  };

  const handleFiles = (files) => {
    const validFiles = [];
    for (const file of files) {
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }
      validFiles.push(file);
    }
    setError('');

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    const updated = multiple ? [...preview, ...newPreviews] : newPreviews;
    setPreview(updated);

    const dataTransfer = new DataTransfer();
    validFiles.forEach(f => dataTransfer.items.add(f));
    onChange?.(multiple ? validFiles : validFiles[0], updated);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const removeImage = (index) => {
    const updated = preview.filter((_, i) => i !== index);
    setPreview(updated);
    onChange?.(multiple ? updated : updated[0], updated);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="image-uploader">
      <label style={styles.label}>{label}</label>

      <div
        ref={fileInputRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileInput}
        style={{
          ...styles.dropZone,
          borderColor: dragging ? 'var(--color-secondary)' : 'var(--color-border)',
          backgroundColor: dragging ? 'rgba(233, 69, 96, 0.05)' : 'var(--color-background)',
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          style={styles.fileInput}
        />

        {preview.length > 0 ? (
          <div style={styles.previewContainer}>
            {preview.map((src, index) => (
              <div key={index} style={styles.previewWrapper}>
                <img src={src} alt={`Preview ${index + 1}`} style={styles.previewImage} />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                  style={styles.removeButton}
                  aria-label="Hapus gambar"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>
            ))}
            {multiple && preview.length < 10 && (
              <div style={{ ...styles.dropZone, ...styles.addMore, cursor: 'pointer' }} onClick={triggerFileInput}>
                <Upload size={24} strokeWidth={2} style={styles.uploadIcon} />
                <span style={styles.addText}>Tambah Gambar</span>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <Upload size={36} strokeWidth={1.5} style={styles.uploadIconLarge} />
            <p style={styles.emptyText}>Klik atau seret gambar ke sini</p>
            <p style={styles.emptySubtext}>Format: JPG, PNG, WebP • Maks: {maxSize / 1024 / 1024}MB</p>
          </div>
        )}
      </div>

      {error && (
        <div style={styles.error}>
          <AlertCircle size={16} strokeWidth={2} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  label: {
    display: 'block',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-text)',
    marginBottom: 'var(--spacing-sm)',
  },
  dropZone: {
    border: '2px dashed',
    borderRadius: 'var(--border-radius-lg)',
    padding: 'var(--spacing-xl)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    position: 'relative',
  },
  fileInput: {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    cursor: 'pointer',
  },
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)',
    marginTop: 'var(--spacing-md)',
  },
  previewWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 'var(--border-radius-lg)',
    overflow: 'hidden',
    border: '1px solid var(--color-border)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 'var(--border-radius-full)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color var(--transition-fast)',
  },
  addMore: {
    padding: 'var(--spacing-lg)',
    minWidth: 120,
    minHeight: 120,
  },
  uploadIcon: {
    margin: '0 auto var(--spacing-xs)',
    color: 'var(--color-secondary)',
  },
  addText: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-muted)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  uploadIconLarge: {
    color: 'var(--color-text-muted)',
  },
  emptyText: {
    margin: 0,
    fontSize: 'var(--font-size-base)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-text)',
  },
  emptySubtext: {
    margin: 0,
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    marginTop: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--color-error)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--color-error)',
    fontSize: 'var(--font-size-sm)',
  },
};