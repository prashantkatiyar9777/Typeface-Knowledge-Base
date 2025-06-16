export * from './common.types';
export * from './api.types';

export interface Category {
  name: string;
  count: number;
  color: string;
  group: string;
  groupName: string;
  lastUpdated?: string;
  usage?: 'high' | 'medium' | 'low';
}

export interface ContentItem {
  id: string;
  title: string;
  dateAdded: string;
  tone: string;
  persona: string;
  ctaStyle: string;
  format: string;
  source: string;
  tags: string[];
  content: string;
  wordCount: number;
  funnelStage: 'Awareness' | 'Consideration' | 'Decision' | 'Retention';
  usage?: 'high' | 'medium' | 'low';
  lastAccessed?: string;
  performance?: {
    views: number;
    copies: number;
    shares: number;
  };
}

export interface FilterOptions {
  tone: string[];
  persona: string[];
  ctaStyle: string[];
  format: string[];
  tags: string[];
  source: string[];
  funnelStage: string[];
  wordCountMin: number;
  wordCountMax: number;
  dateRange: {
    start: string;
    end: string;
  };
  usage?: string[];
  lastAccessed?: string;
}

export interface SortOption {
  value: 'dateAdded' | 'relevance' | 'length' | 'title' | 'usage' | 'performance';
  label: string;
}

export interface SearchSuggestion {
  text: string;
  type: 'category' | 'tag' | 'content' | 'recent';
  count?: number;
}

export interface BulkAction {
  id: string;
  label: string;
  icon: string;
  action: (itemIds: string[]) => void;
}