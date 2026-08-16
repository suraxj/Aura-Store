import React, { useState } from 'react';
import { getOptimizedImageUrl } from '../../utils/imageUtils';

export default function LazyImage({
  src,
  alt,
  width = 400,
  quality = 75,
  className = '',
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const optimizedSrc = getOptimizedImageUrl(src, { width, quality });
  const fallbackSrc = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75';

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {/* Loading Skeleton Pulse */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse z-10" />
      )}

      <img
        src={hasError ? fallbackSrc : optimizedSrc}
        alt={alt || 'Product image'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
