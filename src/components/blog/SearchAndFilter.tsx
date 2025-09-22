'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, Tag, Calendar, User, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface SearchAndFilterProps {
  onSearchChange: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
  onDateFilter: (dateRange: { start?: string; end?: string }) => void;
  availableTags: Array<{ name: string; count: number }>;
  isLoading?: boolean;
  totalResults?: number;
}

export default function SearchAndFilter({
  onSearchChange,
  onTagFilter,
  onDateFilter,
  availableTags,
  isLoading = false,
  totalResults = 0
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({});
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger search when debounced query changes
  useEffect(() => {
    onSearchChange(debouncedQuery);
  }, [debouncedQuery, onSearchChange]);

  // Handle tag selection
  const handleTagToggle = (tagName: string) => {
    const newSelectedTags = selectedTags.includes(tagName)
      ? selectedTags.filter(tag => tag !== tagName)
      : [...selectedTags, tagName];
    
    setSelectedTags(newSelectedTags);
    onTagFilter(newSelectedTags);
  };

  // Handle date range changes
  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    const newDateRange = { ...dateRange, [type]: value };
    setDateRange(newDateRange);
    onDateFilter(newDateRange);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setDateRange({});
    onSearchChange('');
    onTagFilter([]);
    onDateFilter({});
  };

  // Get sorted tags by popularity
  const sortedTags = useMemo(() => {
    return [...availableTags].sort((a, b) => b.count - a.count);
  }, [availableTags]);

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || dateRange.start || dateRange.end;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filters
          {(selectedTags.length > 0 || dateRange.start || dateRange.end) && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-1">
              {selectedTags.length + (dateRange.start ? 1 : 0) + (dateRange.end ? 1 : 0)}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}

        {totalResults > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {totalResults} article{totalResults !== 1 ? 's' : ''} found
          </div>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              <Search className="h-3 w-3" />
              &ldquo;{searchQuery}&rdquo;
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {selectedTags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm"
            >
              <Tag className="h-3 w-3" />
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {dateRange.start && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm">
              <Calendar className="h-3 w-3" />
              From: {format(new Date(dateRange.start), 'MMM dd, yyyy')}
              <button
                onClick={() => handleDateRangeChange('start', '')}
                className="ml-1 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {dateRange.end && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm">
              <Calendar className="h-3 w-3" />
              To: {format(new Date(dateRange.end), 'MMM dd, yyyy')}
              <button
                onClick={() => handleDateRangeChange('end', '')}
                className="ml-1 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Expanded Filters */}
      {showFilters && (
        <div className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Popular Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Tag className="inline h-4 w-4 mr-2" />
              Popular Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {sortedTags.slice(0, 12).map(tag => (
                <button
                  key={tag.name}
                  onClick={() => handleTagToggle(tag.name)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag.name)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag.name}
                  <span className="text-xs opacity-75">({tag.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Calendar className="inline h-4 w-4 mr-2" />
              Date Range
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  From
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={dateRange.start || ''}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                  To
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={dateRange.end || ''}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}