'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export function SearchBar({
  placeholder = '검색어를 입력하세요 (예: Wi-Fi 연결, 배터리)',
  autoFocus = false,
  onSearch,
  defaultValue = '',
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue || searchParams.get('q') || '');

  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        if (onSearch) {
          onSearch(query);
        } else {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
      }
    },
    [query, router, onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="h-12 w-full rounded-xl border-slate-300 bg-white pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:ring-red-500/20 shadow-sm"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full p-0 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

