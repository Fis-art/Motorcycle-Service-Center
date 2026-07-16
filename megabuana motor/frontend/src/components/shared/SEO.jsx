export default function SEO({ title, description, image, url, type = 'website' }) {
  const siteName = 'Megabuana Motor';
  const defaultTitle = 'Megabuana Motor - Bengkel Motor Terpercaya';
  const defaultDescription = 'Layanan servis motor, sparepart, dan aksesoris lengkap dengan pengalaman lebih dari 10 tahun.';

  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageUrl = url || window.location.href;
  const pageImage = image || '/og-image.jpg';

  if (typeof document !== 'undefined') {
    document.title = pageTitle;

    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', pageDescription);
    updateMeta('og:title', pageTitle, true);
    updateMeta('og:description', pageDescription, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', pageUrl, true);
    updateMeta('og:image', pageImage, true);
    updateMeta('twitter:card', 'summary_large_image', true);
    updateMeta('twitter:title', pageTitle, true);
    updateMeta('twitter:description', pageDescription, true);
    updateMeta('twitter:image', pageImage, true);
  }

  return null;
}