import { CONTENT_FOLDERS } from './constants';

export interface Agent {
  id: string;
  name: string;
  version: string;
  description: string;
  trainedOn: string[];
  trainingDate: string;
  accuracy: {
    extractionMatch: number;
    userAcceptance: number;
  };
  usage: {
    invocations: number;
    successRate: number;
  };
  status: 'active' | 'training' | 'inactive';
  specialty: string;
}

export const AGENTS: Agent[] = [
  {
    id: 'ideation-agent',
    name: 'Ideation Agent',
    version: 'v2.1',
    description: 'Generates creative concepts and content ideas based on brand patterns',
    trainedOn: ['General Blog Posts', 'Marketing Blogs', 'Thought Leadership', 'Case Studies'],
    trainingDate: '2024-01-20',
    accuracy: { extractionMatch: 92, userAcceptance: 88 },
    usage: { invocations: 1847, successRate: 91 },
    status: 'active',
    specialty: 'Content ideation and creative brainstorming'
  },
  {
    id: 'creative-agent',
    name: 'Creative Agent',
    version: 'v1.8',
    description: 'Crafts compelling copy and creative content across formats',
    trainedOn: ['Promotional Emails', 'Social Ads', 'Product Landing Pages', 'Creative Briefs'],
    trainingDate: '2024-01-18',
    accuracy: { extractionMatch: 94, userAcceptance: 90 },
    usage: { invocations: 2156, successRate: 93 },
    status: 'active',
    specialty: 'Creative copywriting and brand messaging'
  },
  {
    id: 'video-agent',
    name: 'Video Agent',
    version: 'v1.5',
    description: 'Specializes in video scripts and multimedia content',
    trainedOn: ['TikTok Scripts', 'YouTube & Vimeo Blends', 'Creative Briefs'],
    trainingDate: '2024-01-15',
    accuracy: { extractionMatch: 89, userAcceptance: 85 },
    usage: { invocations: 743, successRate: 87 },
    status: 'active',
    specialty: 'Video content and script writing'
  },
  {
    id: 'performance-agent',
    name: 'Performance Agent',
    version: 'v2.0',
    description: 'Optimizes content for performance metrics and conversions',
    trainedOn: ['Search Ads', 'Display Ads', 'Retargeting Ads', 'Lead‑Gen CTAs'],
    trainingDate: '2024-01-12',
    accuracy: { extractionMatch: 96, userAcceptance: 92 },
    usage: { invocations: 1523, successRate: 94 },
    status: 'active',
    specialty: 'Performance marketing and conversion optimization'
  },
  {
    id: 'email-agent',
    name: 'Email Agent',
    version: 'v2.3',
    description: 'Masters email marketing across all campaign types',
    trainedOn: ['Promotional Emails', 'Drip & Onboarding Series', 'Newsletters', 'Email Subject Lines'],
    trainingDate: '2024-01-22',
    accuracy: { extractionMatch: 95, userAcceptance: 91 },
    usage: { invocations: 3247, successRate: 92 },
    status: 'active',
    specialty: 'Email marketing and automation'
  },
  {
    id: 'ad-agent',
    name: 'Ad Agent',
    version: 'v1.9',
    description: 'Creates high-converting ad copy across all platforms',
    trainedOn: ['Social Ads', 'Search Ads', 'TikTok & Other Ads', 'Display Ads'],
    trainingDate: '2024-01-16',
    accuracy: { extractionMatch: 93, userAcceptance: 89 },
    usage: { invocations: 1892, successRate: 90 },
    status: 'active',
    specialty: 'Paid advertising and media buying'
  },
  {
    id: 'web-agent',
    name: 'Web Agent',
    version: 'v1.7',
    description: 'Optimizes web content for user experience and SEO',
    trainedOn: ['Product Landing Pages', 'Web Blends', 'SEO Meta Tags', 'Product Descriptions'],
    trainingDate: '2024-01-14',
    accuracy: { extractionMatch: 91, userAcceptance: 87 },
    usage: { invocations: 1456, successRate: 88 },
    status: 'active',
    specialty: 'Web content and SEO optimization'
  },
  {
    id: 'social-agent',
    name: 'Social Agent',
    version: 'v1.6',
    description: 'Crafts engaging social media content and campaigns',
    trainedOn: ['Awareness Posts', 'Engagement Posts', 'Platform–Specific Posts', 'Promotional Posts'],
    trainingDate: '2024-01-10',
    accuracy: { extractionMatch: 88, userAcceptance: 84 },
    usage: { invocations: 2134, successRate: 86 },
    status: 'training',
    specialty: 'Social media marketing and community engagement'
  },
  {
    id: 'sales-agent',
    name: 'Sales Agent',
    version: 'v2.2',
    description: 'Develops persuasive sales materials and pitches',
    trainedOn: ['Sales Decks', 'One‑Pagers', 'Sales Pitches', 'Outreach & Sales Emails'],
    trainingDate: '2024-01-19',
    accuracy: { extractionMatch: 94, userAcceptance: 90 },
    usage: { invocations: 1678, successRate: 91 },
    status: 'active',
    specialty: 'Sales enablement and revenue generation'
  },
  {
    id: 'technical-agent',
    name: 'Technical Agent',
    version: 'v1.4',
    description: 'Creates technical documentation and developer content',
    trainedOn: ['Technical Blogs', 'Product Descriptions', 'Product Listings', 'Web Blends'],
    trainingDate: '2024-01-08',
    accuracy: { extractionMatch: 97, userAcceptance: 93 },
    usage: { invocations: 892, successRate: 95 },
    status: 'active',
    specialty: 'Technical writing and developer documentation'
  }
];