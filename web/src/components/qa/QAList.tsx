import { QACard } from './QACard';
import { getCategoryById } from '@/lib/data';
import type { QAItem } from '@/types';

interface QAListProps {
  items: QAItem[];
  showCategory?: boolean;
  highlight?: string;
}

export function QAList({ items, showCategory = false, highlight }: QAListProps) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-500">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((qa) => (
        <QACard
          key={qa.id}
          qa={qa}
          category={showCategory ? getCategoryById(qa.categoryId) : undefined}
          showCategory={showCategory}
          highlight={highlight}
        />
      ))}
    </div>
  );
}

