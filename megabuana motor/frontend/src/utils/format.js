export const formatPrice = (value) => {
  const num = Number(value || 0);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num);
};

export const categoryLabels = {
  sparepart: 'Sparepart',
  aksesoris: 'Aksesoris',
  oli: 'Oli',
  aki: 'Aki',
  ban: 'Ban',
  servis: 'Paket Servis',
};
