'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized image URLs for different screen sizes
  const generateSrcSet = (originalSrc: string) => {
    const sizes = [400, 600, 800, 1200, 1600];
    
    // For Hashnode CDN or other CDNs that support URL parameters
    if (originalSrc.includes('hashnode.com') || originalSrc.includes('cdn.')) {
      return sizes
        .map(size => `${originalSrc}?w=${size}&auto=compress,format 1x`)
        .join(', ');
    }
    
    // For other images, return original
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Create a low-quality placeholder if none provided
  const createPlaceholder = (w: number = 10, h: number = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || createPlaceholder();

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      {/* Loading placeholder */}
      {isLoading && placeholder === 'blur' && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110 transition-opacity duration-300"
          style={{
            backgroundImage: `url(${defaultBlurDataURL})`
          }}
        />
      )}

      {/* Loading spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      )}

      {/* Image overlay for better text readability if used as background */}
      {className.includes('bg-') && (
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      )}
    </div>
  );
}