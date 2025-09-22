'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X, Loader2, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { BlogPost, Tag } from '@/lib/types';

interface BlogSearchResult extends BlogPost {
  score: number;
  matchType: 'title' | 'content' | 'tags' | 'author';
}

interface AdvancedBlogSearchProps {
  posts: BlogPost[];
  tags: Tag[];
  onResultClick?: (post: BlogPost) => void;
  placeholder?: string;
  className?: string;
}

export default function AdvancedBlogSearch({
  posts,
  tags,
  onResultClick,
  placeholder = "Search articles, tags, or topics...",
  className = ""
}: AdvancedBlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blog-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to recent searches
  const saveRecentSearch = (searchQuery: string) => {
    if (searchQuery.trim().length === 0) return;
    
    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5); // Keep only 5 recent searches
    
    setRecentSearches(updated);
    localStorage.setItem('blog-recent-searches', JSON.stringify(updated));
  };

  // Advanced search algorithm with scoring
  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return [];

    setIsLoading(true);
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
    
    const results: BlogSearchResult[] = [];

    posts.forEach(post => {
      let score = 0;
      let matchType: BlogSearchResult['matchType'] = 'content';

      // Title matching (highest priority)
      const titleLower = post.title.toLowerCase();
      if (titleLower.includes(queryLower)) {
        score += 10;
        matchType = 'title';
      }
      
      // Exact title word matches
      queryWords.forEach(word => {
        if (titleLower.includes(word)) {
          score += 5;
        }
      });

      // Content/brief matching
      const briefLower = post.brief.toLowerCase();
      if (briefLower.includes(queryLower)) {
        score += 3;
      }
      
      queryWords.forEach(word => {
        if (briefLower.includes(word)) {
          score += 2;
        }
      });

      // Tag matching
      const tagMatches = post.tags?.filter(tag => 
        tag.name.toLowerCase().includes(queryLower) ||
        queryWords.some(word => tag.name.toLowerCase().includes(word))
      ) || [];
      
      if (tagMatches.length > 0) {
        score += tagMatches.length * 4;
        if (matchType === 'content') matchType = 'tags';
      }

      // Author matching
      if (post.author.name.toLowerCase().includes(queryLower)) {
        score += 2;
        if (matchType === 'content') matchType = 'author';
      }

      // Date boost for recent posts
      const daysOld = (Date.now() - new Date(post.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysOld < 30) score += 1;
      if (daysOld < 7) score += 1;

      // Reading time boost for medium-length posts
      const readTime = post.readTimeInMinutes || 5;
      if (readTime >= 3 && readTime <= 15) score += 0.5;

      if (score > 0) {
        results.push({
          ...post,
          score,
          matchType
        });
      }
    });

    // Sort by score and return top 8 results
    const sortedResults = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    setIsLoading(false);
    return sortedResults;
  }, [query, posts]);

  // Popular tags for suggestions
  const popularTags = useMemo(() => {
    return tags
      .sort((a, b) => (b.postsCount || 0) - (a.postsCount || 0))
      .slice(0, 6);
  }, [tags]);

  const handleResultClick = (post: BlogPost) => {
    saveRecentSearch(query);
    setIsOpen(false);
    setQuery('');
    onResultClick?.(post);
  };

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('blog-recent-searches');
  };

  const getMatchTypeIcon = (matchType: BlogSearchResult['matchType']) => {
    switch (matchType) {
      case 'title': return '📰';
      case 'tags': return '🏷️';
      case 'author': return '👤';
      default: return '📄';
    }
  };

  const highlightQuery = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">$1</mark>');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {query.trim().length >= 2 ? (
            <>
              {/* Search Results */}
              {searchResults.length > 0 ? (
                <div className="p-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </div>
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/blog/${result.slug}`}
                      onClick={() => handleResultClick(result)}
                      className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg mt-1">{getMatchTypeIcon(result.matchType)}</span>
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="font-medium text-gray-900 dark:text-gray-100 truncate"
                            dangerouslySetInnerHTML={{ 
                              __html: highlightQuery(result.title, query) 
                            }}
                          />
                          <p 
                            className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2"
                            dangerouslySetInnerHTML={{ 
                              __html: highlightQuery(result.brief, query) 
                            }}
                          />
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{result.readTimeInMinutes || 5} min read</span>
                            <span>•</span>
                            <span>{new Date(result.publishedAt).toLocaleDateString()}</span>
                            {result.tags && result.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="truncate">
                                  {result.tags.slice(0, 2).map(tag => tag.name).join(', ')}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No articles found for &ldquo;{query}&rdquo;
                </div>
              )}
            </>
          ) : (
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Searches
                    </h4>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Tags */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Popular Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag.name}
                      onClick={() => handleRecentSearchClick(tag.name)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}