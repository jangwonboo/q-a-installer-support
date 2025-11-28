import { Suspense } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryList } from '@/components/category/CategoryList';
import { categories } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          설치 지원 Q&A
        </h1>
        <p className="text-sm text-slate-500">
          현장에서 빠르게 문제를 해결하세요
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <Suspense fallback={<div className="h-12 bg-slate-100 rounded-xl animate-pulse" />}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Categories Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📂</span>
          <h2 className="text-lg font-semibold text-slate-800">카테고리</h2>
        </div>
        <CategoryList categories={categories} />
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-red-500">100</div>
          <div className="text-xs text-slate-500">Q&A 항목</div>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-red-500">9</div>
          <div className="text-xs text-slate-500">카테고리</div>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-red-500">24/7</div>
          <div className="text-xs text-slate-500">언제든지</div>
        </div>
      </div>
    </div>
  );
}
