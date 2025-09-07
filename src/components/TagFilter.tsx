'use client';

import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { getBlogPostsByTag, type BlogPost } from '@/lib/hashnode';

interface TagFilterProps {
  onResults: (posts: BlogPost[], tag: string | null) => void;
  availableTags: string[];
}

export default function TagFilter({ onResults, availableTags }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTagSelect = async (tag: string) => {
    if (selectedTag === tag) {
      // Deselect tag
      setSelectedTag(null);
      onResults([], null);
      return;
    }

    setSelectedTag(tag);
    setLoading(true);

    try {
      const { posts } = await getBlogPostsByTag([tag], 20);
      onResults(posts, tag);
    } catch (error) {
      console.error('Failed to fetch posts by tag:', error);
      onResults([], tag);
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = () => {
    setSelectedTag(null);
    onResults([], null);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-terminal-blue mb-4 flex items-center">
        <Tag className="w-5 h-5 mr-2" />
        Filter by Tag
      </h3>

      {selectedTag && (
        <div className="mb-4 flex items-center">
          <span className="text-sm text-text-muted mr-2">Filtered by:</span>
          <span className="inline-flex items-center px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm">
            #{selectedTag}
            <button
              onClick={clearFilter}
              className="ml-2 hover:bg-terminal-green/30 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
          {loading && (
            <div className="ml-3 w-4 h-4 border-2 border-terminal-green border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagSelect(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-terminal-green text-bg-dark font-medium'
                : 'bg-terminal-green/10 text-terminal-green hover:bg-terminal-green/20 border border-terminal-green/30'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {availableTags.length === 0 && (
        <p className="text-text-muted text-sm">No tags available</p>
      )}
    </div>
  );
}
