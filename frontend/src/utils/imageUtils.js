/**
 * Optimizes image URLs for faster loading, bandwidth efficiency, and responsive delivery.
 * Supports Unsplash CDN and generic URLs by dynamically setting width, quality, and webp format.
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url || typeof url !== 'string') {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75';
  }

  const { width = 400, quality = 75, format = 'auto', fit = 'crop' } = options;

  // Unsplash image optimization
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', quality.toString());
      urlObj.searchParams.set('auto', format);
      urlObj.searchParams.set('fit', fit);
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  // Cloudinary image optimization
  if (url.includes('res.cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto,c_${fit}/`);
  }

  return url;
}
