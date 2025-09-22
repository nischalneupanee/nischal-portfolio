'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Tag } from 'lucide-react';

interface MinimalSearchProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: BlogFilters) => void;
  availableTags: Array<{ name: string; count: number }>;
  isLoading?: boolean;
  totalResults?: number;
  className?: string;
}

interface BlogFilters {
  search: string;
  tags: string[];
  sortBy: 'newest' | 'popular';
}

export default function MinimalSearch({
  onSearchChange,
  onFilterChange,
  availableTags,
  isLoading = false,
  totalResults = 0,
  className = ""
}: MinimalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    tags: [],
    sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update filters when search changes
  useEffect(() => {
    const newFilters = { ...filters, search: debouncedQuery };
    setFilters(newFilters);
    onSearchChange(debouncedQuery);
    onFilterChange(newFilters);
  }, [debouncedQuery]);

  const handleTagToggle = (tagName: string) => {
    const newTags = filters.tags.includes(tagName)
      ? filters.tags.filter(tag => tag !== tagName)
      : [...filters.tags, tagName];
    
    const newFilters = { ...filters, tags: newTags };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: BlogFilters['sortBy']) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      tags: [],
      sortBy: 'newest' as const,
    };
    setSearchQuery('');
    setFilters(clearedFilters);
    onSearchChange('');
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.tags.length > 0 || searchQuery;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-14 pr-4 py-3 bg-background/50 border border-terminal-green/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-terminal-green/50 focus:border-terminal-green transition-all"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-terminal-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
            showFilters || hasActiveFilters
              ? 'bg-terminal-green/10 border-terminal-green/50 text-terminal-green'
              : 'bg-background/50 border-terminal-green/30 text-text-muted hover:text-text-primary hover:border-terminal-green/50'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="bg-terminal-green text-background text-xs px-2 py-0.5 rounded-full">
              {filters.tags.length}
            </span>
          )}
        </button>
      </div>

      {/* Results Summary */}
      {totalResults > 0 && (
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>{totalResults} articles found</span>
          <div className="flex items-center gap-3">
            <span>Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as BlogFilters['sortBy'])}
              className="bg-background/50 border border-terminal-green/30 rounded px-2 py-1 text-text-primary focus:outline-none focus:ring-1 focus:ring-terminal-green/50"
            >
              <option value="newest">Latest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>
      )}

      {/* Expandable Filters */}
      {showFilters && (
        <div className="space-y-4 p-4 bg-background/30 border border-terminal-green/20 rounded-lg">
          {/* Tags Filter */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-terminal-green" />
                <span className="text-sm font-medium text-text-primary">Topics</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-terminal-green transition-colors"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {availableTags.slice(0, 12).map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all ${
                    filters.tags.includes(tag.name)
                      ? 'bg-terminal-green text-background'
                      : 'bg-background/50 text-text-muted hover:text-text-primary hover:bg-terminal-green/10 border border-terminal-green/20'
                  }`}
                >
                  <span>{tag.name}</span>
                  <span className="text-xs opacity-75">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-text-muted">Active filters:</span>
          {filters.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-terminal-green/10 text-terminal-green rounded text-sm"
            >
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="hover:bg-terminal-green/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}