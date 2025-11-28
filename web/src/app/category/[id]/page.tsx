import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { QAList } from '@/components/qa/QAList';
import { getCategoryById, getQAsByCategory, categories } from '@/lib/data';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  
  if (!category) {
    return { title: '카테고리를 찾을 수 없습니다' };
  }

  return {
    title: `${category.name} - SK shieldus Installer Support`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  const qaItems = getQAsByCategory(id);

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

      {/* Category Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-xl font-bold text-slate-900">{category.name}</h1>
        </div>
        <p className="text-sm text-slate-500">{category.description}</p>
        <p className="text-xs text-slate-400 mt-1">{qaItems.length}개 Q&A</p>
      </div>

      {/* QA List */}
      <QAList items={qaItems} />
    </div>
  );
}

