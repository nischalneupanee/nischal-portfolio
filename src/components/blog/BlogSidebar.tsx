'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, Heart, Hash, TrendingUp, Calendar } from 'lucide-react';
import type { BlogPost, Tag, BlogStats } from '@/lib/types';

interface BlogSidebarProps {
  recentPosts?: BlogPost[];
  popularTags?: Tag[];
  stats?: BlogStats;
}

export default function BlogSidebar({ recentPosts = [], popularTags = [], stats }: BlogSidebarProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Blog Stats */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-lg p-6 border border-terminal-green/20"
        >
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-terminal-green" />
            <span>Blog Stats</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-terminal-green">{stats.totalPosts}</div>
              <div className="text-xs text-text-muted">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalViews.toLocaleString()}</div>
              <div className="text-xs text-text-muted">Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.totalReactions}</div>
              <div className="text-xs text-text-muted">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.totalTopics}</div>
              <div className="text-xs text-text-muted">Topics</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-lg p-6 border border-terminal-green/20"
        >
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-terminal-green" />
            <span>Recent Posts</span>
          </h3>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block space-y-2">
                  <div className="flex items-start space-x-3">
                    {post.coverImage && (
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={post.coverImage.url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary group-hover:text-terminal-green transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-text-muted">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTimeInMinutes}m</span>
                        </span>
                        {post.views > 0 && (
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-lg p-6 border border-terminal-green/20"
        >
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center space-x-2">
            <Hash className="w-5 h-5 text-terminal-green" />
            <span>Popular Tags</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.slice(0, 15).map((tag, index) => (
              <motion.span
                key={tag.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.02 }}
                className="px-3 py-1 bg-terminal-green/10 text-terminal-green text-xs rounded-full border border-terminal-green/20 hover:bg-terminal-green/20 cursor-pointer transition-colors"
              >
                {tag.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-lg p-6 border border-terminal-green/20 bg-gradient-to-br from-terminal-green/5 to-blue-500/5"
      >
        <h3 className="text-lg font-bold text-text-primary mb-3">Stay Updated</h3>
        <p className="text-sm text-text-secondary mb-4">
          Get notified when I publish new articles about web development, tech, and more.
        </p>
        <div className="space-y-3">
          <Link
            href="https://blog.nischalneupane.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-terminal-green text-background text-center py-2 px-4 rounded-lg hover:bg-terminal-green/90 transition-colors text-sm font-medium"
          >
            Follow on Hashnode
          </Link>
          <Link
            href="/contact"
            className="block w-full border border-terminal-green/30 text-terminal-green text-center py-2 px-4 rounded-lg hover:bg-terminal-green/10 transition-colors text-sm font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </div>
  );
}