'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye, Heart, ExternalLink } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact' | 'featured';
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="glass rounded-lg p-4 border border-terminal-green/20 hover:border-terminal-green/40 transition-all duration-300"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="font-bold text-text-primary hover:text-terminal-green transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-text-secondary text-sm line-clamp-2 mb-3">{post.brief}</p>
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTimeInMinutes} min</span>
            </span>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        className="glass rounded-xl overflow-hidden border border-terminal-green/30 hover:border-terminal-green/50 transition-all duration-300 group"
      >
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.title}
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
              <span>{formatDate(post.publishedAt)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTimeInMinutes} min read</span>
            </span>
            {post.views > 0 && (
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()}</span>
              </span>
            )}
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-bold text-text-primary hover:text-terminal-green transition-colors mb-3 line-clamp-2">
              {post.title}
            </h2>
          </Link>
          
          {post.subtitle && (
            <p className="text-text-secondary font-medium mb-3 line-clamp-1">{post.subtitle}</p>
          )}
          
          <p className="text-text-secondary line-clamp-3 mb-4">{post.brief}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {post.author.profilePicture && (
                <Image
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium text-text-primary">
                {post.author.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              {post.reactionCount > 0 && (
                <span className="flex items-center space-x-1 text-sm text-text-muted">
                  <Heart className="w-4 h-4" />
                  <span>{post.reactionCount}</span>
                </span>
              )}
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-green/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-terminal-green/10 text-terminal-green text-xs rounded-full border border-terminal-green/20"
                >
                  {tag.name}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 text-text-muted text-xs">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="glass rounded-lg p-6 border border-terminal-green/20 hover:border-terminal-green/40 transition-all duration-300 group"
    >
      <div className="flex gap-6">
        {post.coverImage && (
          <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-4 text-sm text-text-muted">
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTimeInMinutes} min read</span>
            </span>
            {post.views > 0 && (
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views.toLocaleString()}</span>
              </span>
            )}
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-bold text-text-primary hover:text-terminal-green transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          
          <p className="text-text-secondary line-clamp-2">{post.brief}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {post.author.profilePicture && (
                <Image
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-text-secondary">{post.author.name}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {post.reactionCount > 0 && (
                <span className="flex items-center space-x-1 text-sm text-text-muted">
                  <Heart className="w-4 h-4" />
                  <span>{post.reactionCount}</span>
                </span>
              )}
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green hover:text-terminal-green/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-terminal-green/10 text-terminal-green text-xs rounded-full border border-terminal-green/20"
                >
                  {tag.name}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-text-muted text-xs self-center">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}