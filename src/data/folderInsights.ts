import { BRAND_DIMENSIONS } from './brandDimensions';

export interface FolderInsight {
  id: string;
  title: string;
  icon: string;
  color: string;
  data: any;
}

export const folderCategories = [
  {
    id: 'technical-blogs',
    name: 'Technical Blogs',
    count: 45,
    insights: BRAND_DIMENSIONS
  },
  {
    id: 'product-blogs',
    name: 'Product Blogs',
    count: 32,
    insights: BRAND_DIMENSIONS
  },
  {
    id: 'marketing-emails',
    name: 'Marketing Emails',
    count: 67,
    insights: BRAND_DIMENSIONS
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    count: 23,
    insights: BRAND_DIMENSIONS
  }
];