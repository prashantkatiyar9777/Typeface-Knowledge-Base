export interface AnalysisResult {
  content: string;
  metadata: {
    fileType: string;
    fileSize: number;
    createdAt: string;
    modifiedAt: string;
  };
  insights: {
    topics: string[];
    sentiment: number;
    keywords: string[];
    summary: string;
  };
}

export interface ExtractionOptions {
  format: 'text' | 'html' | 'markdown';
  includeMetadata: boolean;
  extractImages: boolean;
  language?: string;
}

export interface ExtractionResult {
  content: string;
  metadata?: {
    title: string;
    author: string;
    date: string;
    pages: number;
  };
  images?: {
    url: string;
    alt: string;
  }[];
} 