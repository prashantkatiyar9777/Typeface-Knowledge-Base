export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  createdAt: string;
  modifiedAt: string;
}

export interface FilterOptions {
  status?: string;
  type?: string;
  date?: string;
  category?: string;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
} 