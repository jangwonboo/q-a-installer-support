import { CategoryCard } from './CategoryCard';
import type { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-2">
      {sortedCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

