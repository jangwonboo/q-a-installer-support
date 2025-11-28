import Fuse, { IFuseOptions } from 'fuse.js';
import type { QAItem, SearchResult } from '@/types';
import { qaItems } from './data';

const fuseOptions: IFuseOptions<QAItem> = {
  keys: [
    { name: 'question', weight: 0.5 },
    { name: 'answer', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

const fuse = new Fuse(qaItems, fuseOptions);

export function searchQA(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results = fuse.search(query);
  
  return results.map((result) => ({
    item: result.item,
    score: result.score,
    matches: result.matches as SearchResult['matches'],
  }));
}

export function getPopularTags(): string[] {
  const tagCount = new Map<string, number>();
  
  qaItems.forEach((item) => {
    item.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);
}

