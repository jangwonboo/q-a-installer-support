'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { QACard } from '@/components/qa/QACard';
import { getCategoryById } from '@/lib/data';
import { searchQA } from '@/lib/search';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchQA(query);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        홈으로
      </Link>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar defaultValue={query} autoFocus />
      </div>

      {/* Results Header */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-slate-400" />
        <span className="text-sm text-slate-500">
          {query && (
            <>
              <span className="text-slate-800 font-medium">&quot;{query}&quot;</span>
              {' '}검색 결과 {results.length}개
            </>
          )}
        </span>
      </div>

      {/* Results List */}
      {results.length > 0 ? (
        <div className="space-y-2">
          {results.map(({ item }) => (
            <QACard
              key={item.id}
              qa={item}
              category={getCategoryById(item.categoryId)}
              showCategory
              highlight={query}
            />
          ))}
        </div>
      ) : query ? (
        <div className="py-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-slate-600 mb-2">검색 결과가 없습니다</p>
          <p className="text-sm text-slate-400">
            다른 키워드로 검색해보세요
          </p>
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="text-4xl mb-4">💡</div>
          <p className="text-slate-500">
            검색어를 입력하세요
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="h-12 bg-slate-100 rounded-xl animate-pulse mb-6" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}

