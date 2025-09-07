'use client';

import { useState, useEffect } from 'react';
import { getBlogPosts, type BlogPost } from '@/lib/hashnode';

export function useBlogPosts(initialPosts: BlogPost[] = []) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (count: number = 6) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getBlogPosts(count);
      const fetchedPosts = data.publication.posts.edges.map(edge => edge.node);
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Failed to fetch blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    refetch: () => fetchPosts(posts.length || 6)
  };
}
