'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

export function PostCardSkeleton({ className = '', variant = 'default' }: SkeletonProps) {
  if (variant === 'featured') {
    return (
      <motion.div
        className={`glass rounded-xl overflow-hidden border-2 border-terminal-green/20 animate-pulse ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Featured badge skeleton */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-terminal-green/20 h-6 w-20 rounded-full" />
        </div>
        
        {/* Image skeleton */}
        <div className="h-64 bg-terminal-green/10" />
        
        <div className="p-6 space-y-4">
          {/* Meta info skeleton */}
          <div className="flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-terminal-green/10 rounded w-20" />
            ))}
          </div>
          
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-terminal-green/10 rounded w-4/5" />
            <div className="h-6 bg-terminal-green/10 rounded w-3/5" />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-4 bg-terminal-green/10 rounded ${
                  i === 3 ? 'w-2/3' : 'w-full'
                }`}
              />
            ))}
          </div>
          
          {/* Tags skeleton */}
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-terminal-green/10 rounded-full w-16" />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        className={`glass rounded-lg p-4 border border-terminal-green/20 animate-pulse ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-3">
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-5 bg-terminal-green/10 rounded w-4/5" />
            <div className="h-5 bg-terminal-green/10 rounded w-3/5" />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-1">
            <div className="h-3 bg-terminal-green/10 rounded w-full" />
            <div className="h-3 bg-terminal-green/10 rounded w-2/3" />
          </div>
          
          {/* Meta info skeleton */}
          <div className="flex justify-between">
            <div className="h-3 bg-terminal-green/10 rounded w-20" />
            <div className="h-3 bg-terminal-green/10 rounded w-16" />
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      className={`glass rounded-lg p-6 border border-terminal-green/20 animate-pulse ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-6">
        {/* Image skeleton */}
        <div className="w-32 h-24 bg-terminal-green/10 rounded-lg flex-shrink-0" />
        
        <div className="flex-1 space-y-3">
          {/* Meta info skeleton */}
          <div className="flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-terminal-green/10 rounded w-20" />
            ))}
          </div>
          
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-5 bg-terminal-green/10 rounded w-4/5" />
            <div className="h-5 bg-terminal-green/10 rounded w-3/5" />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-1">
            <div className="h-4 bg-terminal-green/10 rounded w-full" />
            <div className="h-4 bg-terminal-green/10 rounded w-2/3" />
          </div>
          
          {/* Tags skeleton */}
          <div className="flex space-x-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-5 bg-terminal-green/10 rounded-full w-16" />
            ))}
          </div>
        </div>
      </div>
        </motion.div>
  );
}

export default PostCardSkeleton;