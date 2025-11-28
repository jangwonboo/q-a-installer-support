'use client';

import { useState, useCallback, useMemo } from 'react';
import { searchQA } from '@/lib/search';
import type { SearchResult } from '@/types';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    return searchQA(query);
  }, [query]);

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setIsSearching(newQuery.length > 0);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
  }, []);

  return {
    query,
    results,
    isSearching,
    handleSearch,
    clearSearch,
  };
}

