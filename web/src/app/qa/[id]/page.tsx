import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Copy, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QACard } from '@/components/qa/QACard';
import { getQAById, getCategoryById, getRelatedQAs, qaItems } from '@/lib/data';

interface QADetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return qaItems.map((qa) => ({
    id: qa.id,
  }));
}

export async function generateMetadata({ params }: QADetailPageProps) {
  const { id } = await params;
  const qa = getQAById(id);
  
  if (!qa) {
    return { title: 'Q&A를 찾을 수 없습니다' };
  }

  return {
    title: `Q${qa.number}. ${qa.question} - SK shieldus`,
    description: qa.answer,
  };
}

export default async function QADetailPage({ params }: QADetailPageProps) {
  const { id } = await params;
  const qa = getQAById(id);

  if (!qa) {
    notFound();
  }

  const category = getCategoryById(qa.categoryId);
  const relatedQAs = getRelatedQAs(qa, 3);

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Back Button */}
      <Link
        href={category ? `/category/${category.id}` : '/'}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {category?.name || '홈으로'}
      </Link>

      {/* Category Badge */}
      {category && (
        <div className="mb-4">
          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
            {category.icon} {category.name}
          </Badge>
        </div>
      )}

      {/* Question Card */}
      <Card className="border-slate-200 bg-white p-5 mb-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-sm flex-shrink-0">
            Q
          </div>
          <div>
            <span className="text-xs text-slate-400 font-mono">#{qa.number}</span>
            <h1 className="text-lg font-semibold text-slate-900 mt-1">
              {qa.question}
            </h1>
          </div>
        </div>
      </Card>

      {/* Answer Card */}
      <Card className="border-slate-200 bg-white p-5 mb-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 font-bold text-sm flex-shrink-0">
            A
          </div>
          <div className="flex-1">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {qa.answer}
            </p>
            
            {/* Citations */}
            {qa.citations.length > 0 && (
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <BookOpen className="h-3 w-3" />
                <span>출처: {qa.citations.map(c => `[${c}]`).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Tags */}
      {qa.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {qa.tags.slice(0, 6).map((tag) => (
            <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>
              <Badge 
                variant="outline" 
                className="border-slate-300 text-slate-500 hover:border-red-300 hover:text-red-500 transition-colors cursor-pointer"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mb-8">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        >
          <Copy className="h-4 w-4 mr-2" />
          복사
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        >
          <Share2 className="h-4 w-4 mr-2" />
          공유
        </Button>
      </div>

      {/* Related QAs */}
      {relatedQAs.length > 0 && (
        <>
          <Separator className="bg-slate-200 mb-6" />
          <div>
            <h2 className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
              📌 관련 Q&A
            </h2>
            <div className="space-y-2">
              {relatedQAs.map((relatedQa) => (
                <QACard key={relatedQa.id} qa={relatedQa} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

