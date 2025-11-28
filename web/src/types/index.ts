export interface QAItem {
  id: string;
  number: number;
  categoryId: string;
  question: string;
  answer: string;
  citations: number[];
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  qaRange: [number, number];
  order: number;
}

export interface SearchResult {
  item: QAItem;
  score?: number;
  matches?: Array<{
    key: string;
    value: string;
    indices: Array<[number, number]>;
  }>;
}

