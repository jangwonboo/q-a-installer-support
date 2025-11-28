import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const qaCount = category.qaRange[1] - category.qaRange[0] + 1;

  return (
    <Link href={`/category/${category.id}`}>
      <Card className="group cursor-pointer border-slate-200 bg-white p-4 transition-all hover:border-red-300 hover:bg-red-50/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h3 className="font-medium text-slate-800 group-hover:text-red-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-slate-500">{qaCount}개 Q&A</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-red-500" />
        </div>
      </Card>
    </Link>
  );
}

