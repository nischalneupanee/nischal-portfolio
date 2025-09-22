'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, BookOpen, User, Eye } from 'lucide-react';
import type { Series } from '@/lib/types';

interface SeriesCardProps {
  series: Series;
  variant?: 'default' | 'compact';
}

export default function SeriesCard({ series, variant = 'default' }: SeriesCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalViews = series.posts.edges.reduce((sum, { node }) => sum + (node.views || 0), 0);

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="glass rounded-lg p-4 border border-terminal-green/20 hover:border-terminal-green/40 transition-all duration-300"
      >
        <Link href={`/blog/series/${series.slug}`} className="block">
          <h3 className="font-bold text-text-primary hover:text-terminal-green transition-colors line-clamp-2 mb-2">
            {series.name}
          </h3>
          {series.description && (
            <p className="text-text-secondary text-sm line-clamp-2 mb-3">{series.description.text}</p>
          )}
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>{series.posts.totalDocuments} posts</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(series.createdAt)}</span>
            </span>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl overflow-hidden border border-terminal-green/30 hover:border-terminal-green/50 transition-all duration-300 group"
    >
      {series.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={series.coverImage}
            alt={series.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-text-muted mb-3">
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(series.createdAt)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{series.posts.totalDocuments} posts</span>
          </span>
          {totalViews > 0 && (
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{totalViews.toLocaleString()}</span>
            </span>
          )}
        </div>
        
        <Link href={`/blog/series/${series.slug}`}>
          <h2 className="text-xl font-bold text-text-primary hover:text-terminal-green transition-colors mb-3 line-clamp-2">
            {series.name}
          </h2>
        </Link>
        
        {series.description && (
          <p className="text-text-secondary line-clamp-3 mb-4">{series.description.text}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {series.author.profilePicture && (
              <Image
                src={series.author.profilePicture}
                alt={series.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div>
              <span className="text-sm font-medium text-text-primary">
                {series.author.name}
              </span>
              <p className="text-xs text-text-muted">@{series.author.username}</p>
            </div>
          </div>
          
          <Link
            href={`/blog/series/${series.slug}`}
            className="bg-terminal-green text-background px-4 py-2 rounded-lg hover:bg-terminal-green/90 transition-colors text-sm font-medium"
          >
            View Series
          </Link>
        </div>
        
        {/* Recent posts in series preview */}
        {series.posts.edges.length > 0 && (
          <div className="mt-4 pt-4 border-t border-terminal-green/20">
            <h4 className="text-sm font-medium text-text-primary mb-2">Latest Posts:</h4>
            <div className="space-y-1">
              {series.posts.edges.slice(0, 3).map(({ node: post }) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block text-xs text-text-secondary hover:text-terminal-green transition-colors line-clamp-1"
                >
                  • {post.title}
                </Link>
              ))}
              {series.posts.totalDocuments > 3 && (
                <p className="text-xs text-text-muted">
                  +{series.posts.totalDocuments - 3} more posts
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}