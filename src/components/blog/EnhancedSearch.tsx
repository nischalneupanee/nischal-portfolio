'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Tag, 
  Calendar, 
  User, 
  Clock, 
  TrendingUp,
  SortAsc,
  SortDesc,
  Flame,
  Star
} from 'lucide-react';

interface EnhancedSearchProps {
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
  dateRange: { start?: string; end?: string };
  readingTime: { min?: number; max?: number };
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending';
  author?: string;
}

export default function EnhancedSearch({
  onSearchChange,
  onFilterChange,
  availableTags,
  isLoading = false,
  totalResults = 0,
  className = ""
}: EnhancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    tags: [],
    dateRange: {},
    readingTime: {},
    sortBy: 'newest',
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
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

  const handleReadingTimeChange = (min?: number, max?: number) => {
    const newFilters = { ...filters, readingTime: { min, max } };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      tags: [],
      dateRange: {},
      readingTime: {},
      sortBy: 'newest' as const,
    };
    setSearchQuery('');
    setFilters(clearedFilters);
    onSearchChange('');
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.tags.length > 0 || 
    filters.dateRange.start || 
    filters.readingTime.min || 
    filters.readingTime.max ||
    searchQuery;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title, content, or tags..."
            className="w-full pl-10 pr-12 py-3 bg-background/50 border border-terminal-green/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-terminal-green/50 transition-all"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-terminal-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              showAdvancedFilters || hasActiveFilters
                ? 'bg-terminal-green/20 text-terminal-green'
                : 'bg-background/50 text-text-muted hover:text-text-primary'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
            {hasActiveFilters && (
              <span className="bg-terminal-green text-background text-xs px-1.5 py-0.5 rounded-full">
                {filters.tags.length + (searchQuery ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-2 py-1 text-xs text-text-muted hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted">Sort by:</span>
          <div className="flex bg-background/50 rounded-lg overflow-hidden">
            {[
              { key: 'newest', label: 'Latest', icon: <SortDesc className="w-3 h-3" /> },
              { key: 'popular', label: 'Popular', icon: <Star className="w-3 h-3" /> },
              { key: 'trending', label: 'Trending', icon: <TrendingUp className="w-3 h-3" /> },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => handleSortChange(key as BlogFilters['sortBy'])}
                className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
                  filters.sortBy === key
                    ? 'bg-terminal-green text-background'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-text-muted">
          {totalResults} result{totalResults !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="glass rounded-lg p-4 border border-terminal-green/20 space-y-4">
          {/* Tags Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-terminal-green" />
              <span className="text-sm font-medium text-text-primary">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.slice(0, 12).map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.tags.includes(tag.name)
                      ? 'bg-terminal-green text-background'
                      : 'bg-background/50 text-text-muted hover:text-text-primary border border-terminal-green/20'
                  }`}
                >
                  {tag.name}
                  <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reading Time Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-terminal-green" />
              <span className="text-sm font-medium text-text-primary">Reading Time</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Quick (< 5 min)', max: 5 },
                { label: 'Medium (5-10 min)', min: 5, max: 10 },
                { label: 'Long (> 10 min)', min: 10 },
              ].map(({ label, min, max }) => (
                <button
                  key={label}
                  onClick={() => handleReadingTimeChange(min, max)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.readingTime.min === min && filters.readingTime.max === max
                      ? 'bg-terminal-green text-background'
                      : 'bg-background/50 text-text-muted hover:text-text-primary border border-terminal-green/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-terminal-green" />
              <span className="text-sm font-medium text-text-primary">Publication Date</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                onChange={(e) => {
                  const newFilters = { 
                    ...filters, 
                    dateRange: { ...filters.dateRange, start: e.target.value } 
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="px-3 py-2 bg-background/50 border border-terminal-green/30 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-terminal-green/50"
                placeholder="From"
              />
              <input
                type="date"
                onChange={(e) => {
                  const newFilters = { 
                    ...filters, 
                    dateRange: { ...filters.dateRange, end: e.target.value } 
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="px-3 py-2 bg-background/50 border border-terminal-green/30 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-terminal-green/50"
                placeholder="To"
              />
            </div>
          </div>
        </div>
      )}

      {/* Trending Topics (Quick Access) */}
      <div className="flex items-center gap-2 text-sm">
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-text-muted">Trending:</span>
        <div className="flex flex-wrap gap-1">
          {availableTags.slice(0, 5).map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTagToggle(tag.name)}
              className="px-2 py-1 bg-terminal-green/10 text-terminal-green rounded text-xs hover:bg-terminal-green/20 transition-colors"
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}