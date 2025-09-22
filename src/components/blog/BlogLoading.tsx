'use client';

import PostCardSkeleton from './PostCardSkeleton';

export default function BlogLoading() {
  return (
    <div className="space-y-8">
      {/* Search skeleton */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-terminal-green/10 rounded-lg animate-pulse" />
          <div className="h-12 w-24 bg-terminal-green/10 rounded-lg animate-pulse" />
        </div>
        <div className="h-8 bg-terminal-green/10 rounded w-48 animate-pulse" />
      </div>

      {/* Featured post skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-terminal-green/10 rounded w-48 animate-pulse" />
          <div className="h-4 bg-terminal-green/10 rounded w-24 animate-pulse" />
        </div>
        <PostCardSkeleton variant="featured" />
      </div>

      {/* Latest posts skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-terminal-green/10 rounded w-48 animate-pulse" />
          <div className="h-4 bg-terminal-green/10 rounded w-32 animate-pulse" />
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <PostCardSkeleton key={i} variant="default" />
          ))}
        </div>
      </div>

      {/* Newsletter skeleton */}
      <div className="glass rounded-xl p-6 border border-terminal-green/20 animate-pulse">
        <div className="text-center space-y-4">
          <div className="h-8 bg-terminal-green/10 rounded w-48 mx-auto" />
          <div className="h-4 bg-terminal-green/10 rounded w-64 mx-auto" />
          <div className="h-12 bg-terminal-green/10 rounded mx-auto" />
          <div className="h-12 bg-terminal-green/10 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}