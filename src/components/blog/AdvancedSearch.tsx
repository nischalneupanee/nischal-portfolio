'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/hashnode';
import { Search, Filter, X } from 'lucide-react';

interface AdvancedSearchProps {
  posts: BlogPost[];
  onFilteredPosts: (posts: BlogPost[]) => void;
}

export default function AdvancedSearch({ posts, onFilteredPosts }: AdvancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags.map(tag => tag.name)))
  ).sort();

  // Filter and sort posts based on current criteria
  useEffect(() => {
    let filteredPosts = posts.filter(post => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));

      // Tag filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(selectedTag => 
          post.tags.some(tag => tag.name === selectedTag)
        );

      return matchesSearch && matchesTags;
    });

    // Sort posts
    filteredPosts.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'readTime':
          comparison = a.readTimeInMinutes - b.readTimeInMinutes;
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    onFilteredPosts(filteredPosts);
  }, [searchTerm, selectedTags, sortBy, sortOrder, posts, onFilteredPosts]);

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName)
        ? prev.filter(tag => tag !== tagName)
        : [...prev, tagName]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSortBy('date');
    setSortOrder('desc');
  };

  const hasActiveFilters = searchTerm !== '' || selectedTags.length > 0 || sortBy !== 'date' || sortOrder !== 'desc';

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search posts, tags, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
        />
      </div>

      {/* Filter Toggle and Clear Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-green-400 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-6">
          {/* Sort Options */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sort By</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { value: 'date', label: 'Date' },
                { value: 'title', label: 'Title' },
                { value: 'readTime', label: 'Read Time' },
                { value: 'views', label: 'Views' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as any)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    sortBy === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setSortOrder('desc')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  sortOrder === 'desc'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Descending
              </button>
              <button
                onClick={() => setSortOrder('asc')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  sortOrder === 'asc'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Ascending
              </button>
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedTags.length > 0 || searchTerm) && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="hover:text-gray-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="hover:text-gray-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}