'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import MinimalSearch from './MinimalSearch';

interface SearchAndFilterClientProps {
  availableTags: Array<{ name: string; count: number }>;
  totalResults: number;
  initialValues: {
    search: string;
    tags: string[];
    dateFrom?: string;
    dateTo?: string;
  };
}

interface BlogFilters {
  search: string;
  tags: string[];
  sortBy: 'newest' | 'popular';
}

export default function SearchAndFilterClient({ 
  availableTags, 
  totalResults, 
  initialValues 
}: SearchAndFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateURL = useCallback((params: Record<string, string | string[]>) => {
    const current = searchParams ? 
      new URLSearchParams(Array.from(searchParams.entries())) : 
      new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          current.set(key, value.join(','));
        } else {
          current.delete(key);
        }
      } else if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/blog${query}`);
  }, [router, searchParams]);

  const handleSearchChange = useCallback((query: string) => {
    updateURL({ search: query });
  }, [updateURL]);

  const handleFilterChange = useCallback((filters: BlogFilters) => {
    updateURL({ 
      search: filters.search,
      tags: filters.tags,
      sort: filters.sortBy
    });
  }, [updateURL]);

  return (
    <MinimalSearch
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
      availableTags={availableTags}
      totalResults={totalResults}
    />
  );
}