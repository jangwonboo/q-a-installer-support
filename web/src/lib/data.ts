import qaData from '@/data/qa.json';
import categoriesData from '@/data/categories.json';
import type { QAItem, Category } from '@/types';

export const qaItems: QAItem[] = qaData as QAItem[];
export const categories: Category[] = categoriesData as Category[];

export function getQAById(id: string): QAItem | undefined {
  return qaItems.find((item) => item.id === id);
}

export function getQAByNumber(number: number): QAItem | undefined {
  return qaItems.find((item) => item.number === number);
}

export function getQAsByCategory(categoryId: string): QAItem[] {
  return qaItems.filter((item) => item.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoryByQANumber(number: number): Category | undefined {
  return categories.find(
    (cat) => number >= cat.qaRange[0] && number <= cat.qaRange[1]
  );
}

export function getRelatedQAs(qa: QAItem, limit: number = 3): QAItem[] {
  // 같은 카테고리에서 다른 Q&A 찾기
  return qaItems
    .filter((item) => item.categoryId === qa.categoryId && item.id !== qa.id)
    .slice(0, limit);
}

