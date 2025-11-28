import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QAItem, Category } from '@/types';

interface QACardProps {
  qa: QAItem;
  category?: Category;
  showCategory?: boolean;
  highlight?: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function QACard({ qa, category, showCategory = false, highlight }: QACardProps) {
  const truncatedAnswer = qa.answer.length > 80 
    ? qa.answer.substring(0, 80) + '...' 
    : qa.answer;

  return (
    <Link href={`/qa/${qa.id}`}>
      <Card className="group cursor-pointer border-slate-200 bg-white p-4 transition-all hover:border-red-300 hover:bg-red-50/50 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400">Q{qa.number}</span>
              {showCategory && category && (
                <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 hover:bg-slate-100">
                  {category.icon} {category.name}
                </Badge>
              )}
            </div>
            <h3 className="font-medium text-slate-800 group-hover:text-red-600 transition-colors line-clamp-2">
              {highlight ? highlightText(qa.question, highlight) : qa.question}
            </h3>
            <p className="mt-1 text-sm text-slate-500 line-clamp-1">
              {highlight ? highlightText(truncatedAnswer, highlight) : truncatedAnswer}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-red-500 mt-1" />
        </div>
      </Card>
    </Link>
  );
}

