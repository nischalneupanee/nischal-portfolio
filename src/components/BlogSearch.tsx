'use client';

import { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { searchBlogPosts, type BlogPost } from '@/lib/hashnode';

interface BlogSearchProps {
  onResults: (posts: BlogPost[]) => void;
}

export default function BlogSearch({ onResults }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      onResults([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { posts } = await searchBlogPosts(query, 20);
      onResults(posts);
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed. Please try again.');
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setError('');
    onResults([]);
  };

  return (
    <div className="bg-bg-light rounded-lg p-6 border border-terminal-green/20">
      <h3 className="text-lg font-semibold text-terminal-green mb-4 flex items-center">
        <Search className="w-5 h-5 mr-2" />
        Search Blog Posts
      </h3>
      
      <div className="flex space-x-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search posts..."
            className="w-full px-4 py-2 bg-bg-dark border border-terminal-green/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-terminal-green transition-colors"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-terminal-green transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="px-6 py-2 bg-terminal-green text-bg-dark font-medium rounded-lg hover:bg-terminal-green/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span>Search</span>
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded border border-red-400/20">
          {error}
        </div>
      )}
    </div>
  );
}
