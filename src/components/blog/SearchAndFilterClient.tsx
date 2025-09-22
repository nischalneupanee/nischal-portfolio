'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { SearchAndFilter } from '@/components/blog';

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

  const handleTagFilter = useCallback((tags: string[]) => {
    updateURL({ tags });
  }, [updateURL]);

  const handleDateFilter = useCallback((dateRange: { start?: string; end?: string }) => {
    updateURL({ 
      dateFrom: dateRange.start || '',
      dateTo: dateRange.end || ''
    });
  }, [updateURL]);

  return (
    <SearchAndFilter
      onSearchChange={handleSearchChange}
      onTagFilter={handleTagFilter}
      onDateFilter={handleDateFilter}
      availableTags={availableTags}
      totalResults={totalResults}
    />
  );
}