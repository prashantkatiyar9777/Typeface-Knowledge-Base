import React, { useState } from 'react';
import { 
  Search, X, Plus, ChevronUp, ChevronDown, Upload,
  Edit3, Mail, MessageSquare, Target, Monitor, FileText,
  Globe, Users, Layers, Zap, PenTool, Code, Megaphone,
  Calendar, Headphones, Camera, BookOpen,
  Briefcase, FileImage, Video, Palette, Eye, TrendingUp
} from 'lucide-react';
import { Category } from '../types';
import KnowledgeRepositoryUploadModal from './KnowledgeRepositoryUploadModal';
import { Dropdown } from './common/Dropdown/Dropdown';

interface MainContentProps {
  onCategorySelect: (category: Category) => void;
}

interface SubType {
  id: string;
  name: string;
  count: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  extractionHealth: 'healthy' | 'warning' | 'error';
  tooltip: string;
}

interface CategoryGroup {
  id: string;
  name: string;
  icon: any; // This is a Lucide icon component type
  totalCount: number;
  isExpanded: boolean;
  color: string;
  subTypes: SubType[];
}

const MainContent: React.FC<MainContentProps> = ({ onCategorySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'dateUpdated' | 'itemCount' | 'extractionHealth'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([
    {
      id: 'blogs',
      name: 'Blogs',
      icon: Edit3,
      totalCount: 67,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'technical-blogs',
          name: 'Technical Blogs',
          count: 15,
          lastUpdated: '2h ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Blogs → Technical\nChunks on H1/H2; extracts headlines, code blocks, CTAs.'
        },
        {
          id: 'product-blogs',
          name: 'Product Blogs',
          count: 18,
          lastUpdated: '1 day ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Blogs → Product\nChunks on sections; extracts features, benefits, use cases.'
        },
        {
          id: 'marketing-blogs',
          name: 'Marketing Blogs',
          count: 12,
          lastUpdated: '3h ago',
          trend: 'up',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Blogs → Marketing\nChunks on paragraphs; extracts CTAs, value props, metrics.'
        },
        {
          id: 'case-studies',
          name: 'Case Studies',
          count: 14,
          lastUpdated: '2d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Blogs → Case Studies\nChunks on sections; extracts challenges, solutions, results.'
        },
        {
          id: 'thought-leadership',
          name: 'Thought Leadership',
          count: 8,
          lastUpdated: '4d ago',
          trend: 'down',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Blogs → Thought Leadership\nChunks on ideas; extracts insights, predictions, opinions.'
        }
      ]
    },
    {
      id: 'emails',
      name: 'Emails',
      icon: Mail,
      totalCount: 89,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'promotional-emails',
          name: 'Promotional Emails',
          count: 23,
          lastUpdated: '1h ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Emails → Promotional\nChunks on sections; extracts subject lines, CTAs, offers.'
        },
        {
          id: 'drip-onboarding',
          name: 'Drip & Onboarding Series',
          count: 16,
          lastUpdated: '2d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Emails → Drip/Onboarding\nChunks on steps; extracts sequences, triggers, personalization.'
        },
        {
          id: 'transactional-emails',
          name: 'Transactional Emails',
          count: 12,
          lastUpdated: '5h ago',
          trend: 'stable',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Emails → Transactional\nChunks on actions; extracts confirmations, next steps, support.'
        },
        {
          id: 'newsletters',
          name: 'Newsletters',
          count: 19,
          lastUpdated: '3d ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Emails → Newsletters\nChunks on articles; extracts headlines, summaries, links.'
        },
        {
          id: 'outreach-sales-emails',
          name: 'Outreach & Sales Emails',
          count: 11,
          lastUpdated: '4h ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Emails → Outreach/Sales\nChunks on pitches; extracts pain points, solutions, CTAs.'
        },
        {
          id: 'internal-comms-emails',
          name: 'Internal Comms Emails',
          count: 5,
          lastUpdated: '1w ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Emails → Internal\nChunks on announcements; extracts updates, policies, team info.'
        },
        {
          id: 'email-subject-lines',
          name: 'Email Subject Lines',
          count: 3,
          lastUpdated: '2w ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Emails → Subject Lines\nChunks on hooks; extracts patterns, urgency, personalization.'
        }
      ]
    },
    {
      id: 'social-media',
      name: 'Social Media',
      icon: MessageSquare,
      totalCount: 156,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'awareness-posts',
          name: 'Awareness Posts',
          count: 34,
          lastUpdated: '30m ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → Awareness\nChunks on messages; extracts hooks, hashtags, mentions.'
        },
        {
          id: 'engagement-posts',
          name: 'Engagement Posts',
          count: 28,
          lastUpdated: '2h ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → Engagement\nChunks on interactions; extracts questions, polls, CTAs.'
        },
        {
          id: 'product-teasers',
          name: 'Product Teasers',
          count: 21,
          lastUpdated: '1d ago',
          trend: 'stable',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Social → Product Teasers\nChunks on features; extracts benefits, demos, launches.'
        },
        {
          id: 'promotional-posts',
          name: 'Promotional Posts',
          count: 18,
          lastUpdated: '6h ago',
          trend: 'down',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → Promotions\nChunks on offers; extracts discounts, urgency, terms.'
        },
        {
          id: 'facebook-posts',
          name: 'Facebook Posts',
          count: 15,
          lastUpdated: '4h ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → Facebook\nChunks on platform style; extracts community tone, engagement hooks.'
        },
        {
          id: 'instagram-posts',
          name: 'Instagram Posts',
          count: 12,
          lastUpdated: '3h ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → Instagram\nChunks on visual copy; extracts captions, hashtags, stories.'
        },
        {
          id: 'linkedin-posts',
          name: 'LinkedIn Posts',
          count: 9,
          lastUpdated: '1d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → LinkedIn\nChunks on professional tone; extracts insights, industry content.'
        },
        {
          id: 'tiktok-video-scripts',
          name: 'TikTok Video Scripts',
          count: 7,
          lastUpdated: '2d ago',
          trend: 'up',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Social → TikTok\nChunks on video flow; extracts hooks, trends, call-outs.'
        },
        {
          id: 'youtube-vimeo-blends',
          name: 'YouTube & Vimeo Blends',
          count: 8,
          lastUpdated: '3d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → Video\nChunks on video content; extracts descriptions, titles, thumbnails.'
        },
        {
          id: 'x-social-posts',
          name: 'X Social Posts',
          count: 4,
          lastUpdated: '1d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Social → X/Twitter\nChunks on brevity; extracts threads, hashtags, mentions.'
        }
      ]
    },
    {
      id: 'ad-campaigns',
      name: 'Ad Campaigns',
      icon: Target,
      totalCount: 78,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'search-ads',
          name: 'Search Ads',
          count: 25,
          lastUpdated: '45m ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Ads → Search\nChunks on ad groups; extracts headlines, descriptions, keywords.'
        },
        {
          id: 'display-ads',
          name: 'Display Ads',
          count: 18,
          lastUpdated: '3h ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Ads → Display\nChunks on creatives; extracts visuals, copy, targeting.'
        },
        {
          id: 'social-ads',
          name: 'Social Ads',
          count: 21,
          lastUpdated: '1h ago',
          trend: 'up',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Ads → Social\nChunks on campaigns; extracts audiences, creatives, objectives.'
        },
        {
          id: 'retargeting-ads',
          name: 'Retargeting Ads',
          count: 8,
          lastUpdated: '2d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Ads → Retargeting\nChunks on sequences; extracts triggers, messaging, frequency.'
        },
        {
          id: 'meta-ads',
          name: 'Meta Ads',
          count: 4,
          lastUpdated: '1d ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Ads → Meta\nChunks on Facebook/Instagram; extracts creative variations, audiences.'
        },
        {
          id: 'tiktok-linkedin-ads',
          name: 'TikTok/LinkedIn Ads',
          count: 2,
          lastUpdated: '3d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Ads → Platform Specific\nChunks on platform style; extracts native ad formats.'
        }
      ]
    },
    {
      id: 'landing-pages-ctas',
      name: 'Landing Pages & CTAs',
      icon: Monitor,
      totalCount: 45,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'product-landing-pages',
          name: 'Product Landing Pages',
          count: 16,
          lastUpdated: '2h ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Landing → Product\nChunks on sections; extracts headlines, features, CTAs.'
        },
        {
          id: 'event-registration-pages',
          name: 'Event & Registration Pages',
          count: 9,
          lastUpdated: '1d ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Landing → Event\nChunks on agenda; extracts speakers, schedule, registration.'
        },
        {
          id: 'lead-gen-ctas',
          name: 'Lead-Gen CTAs',
          count: 9,
          lastUpdated: '4h ago',
          trend: 'up',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Landing → Lead-Gen\nChunks on forms; extracts offers, benefits, form fields.'
        }
      ]
    },
    {
      id: 'press-briefs',
      name: 'Press & Briefs',
      icon: FileText,
      totalCount: 23,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'product-launch-press',
          name: 'Product Launch Press Releases',
          count: 6,
          lastUpdated: '1w ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Press → Product Launch\nChunks on announcements; extracts features, quotes, availability.'
        },
        {
          id: 'corporate-announcements',
          name: 'Corporate Announcements',
          count: 4,
          lastUpdated: '2w ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Press → Corporate\nChunks on news; extracts facts, quotes, implications.'
        },
        {
          id: 'creative-briefs-advertising',
          name: 'Creative Briefs (Advertising)',
          count: 5,
          lastUpdated: '3d ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Briefs → Advertising\nChunks on requirements; extracts objectives, audience, constraints.'
        },
        {
          id: 'creative-briefs-marketing',
          name: 'Creative Briefs (Marketing)',
          count: 4,
          lastUpdated: '5d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Briefs → Marketing\nChunks on campaigns; extracts goals, messaging, deliverables.'
        },
        {
          id: 'creative-briefs-videography',
          name: 'Creative Briefs (Videography)',
          count: 4,
          lastUpdated: '1w ago',
          trend: 'stable',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Briefs → Video\nChunks on production; extracts concepts, scripts, technical specs.'
        }
      ]
    },
    {
      id: 'product-seo-copy',
      name: 'Product & SEO Copy',
      icon: Globe,
      totalCount: 34,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'product-descriptions',
          name: 'Product Descriptions',
          count: 28,
          lastUpdated: '3h ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Product → Descriptions\nChunks on features; extracts benefits, specifications, use cases.'
        },
        {
          id: 'product-listings',
          name: 'Product Listings',
          count: 12,
          lastUpdated: '1d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Product → Listings\nChunks on marketplace format; extracts titles, bullets, keywords.'
        },
        {
          id: 'seo-meta-tags',
          name: 'SEO Meta Tags',
          count: 5,
          lastUpdated: '2d ago',
          trend: 'stable',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: SEO → Meta\nChunks on tags; extracts titles, descriptions, keywords.'
        }
      ]
    },
    {
      id: 'recruitment-hr',
      name: 'Recruitment & HR',
      icon: Users,
      totalCount: 19,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'job-postings',
          name: 'Job Postings',
          count: 8,
          lastUpdated: '2d ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: HR → Job Postings\nChunks on requirements; extracts skills, benefits, culture.'
        },
        {
          id: 'job-summaries',
          name: 'Job Summaries',
          count: 6,
          lastUpdated: '3d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: HR → Summaries\nChunks on roles; extracts responsibilities, qualifications, growth.'
        },
        {
          id: 'linkedin-hr-posts',
          name: 'LinkedIn HR Posts',
          count: 4,
          lastUpdated: '1w ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: HR → LinkedIn\nChunks on employer brand; extracts culture, values, opportunities.'
        }
      ]
    },
    {
      id: 'summaries-blends',
      name: 'Summaries & Blends',
      icon: Layers,
      totalCount: 29,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'podcast-blends',
          name: 'Podcast Blends',
          count: 12,
          lastUpdated: '1d ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Blends → Podcast\nChunks on episodes; extracts topics, quotes, key insights.'
        },
        {
          id: 'meeting-blends',
          name: 'Meeting Blends',
          count: 11,
          lastUpdated: '2h ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Blends → Meetings\nChunks on discussions; extracts decisions, action items, follow-ups.'
        },
        {
          id: 'web-blends',
          name: 'Web Blends',
          count: 6,
          lastUpdated: '3d ago',
          trend: 'stable',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Blends → Web\nChunks on content; extracts summaries, key points, references.'
        }
      ]
    },
    {
      id: 'notifications-alerts',
      name: 'Notifications & Alerts',
      icon: Zap,
      totalCount: 15,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'push-notifications',
          name: 'Push Notifications',
          count: 9,
          lastUpdated: '1h ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Notifications → Push\nChunks on alerts; extracts urgency, actions, personalization.'
        },
        {
          id: 'in-app-notifications',
          name: 'In-App Notifications',
          count: 6,
          lastUpdated: '4h ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Notifications → In-App\nChunks on messages; extracts context, CTAs, timing.'
        }
      ]
    },
    {
      id: 'sales-collateral',
      name: 'Sales & Collateral',
      icon: Briefcase,
      totalCount: 31,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'sales-decks',
          name: 'Sales Decks',
          count: 18,
          lastUpdated: '1d ago',
          trend: 'up',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Sales → Decks\nChunks on slides; extracts value props, objections, closes.'
        },
        {
          id: 'one-pagers',
          name: 'One-Pagers',
          count: 9,
          lastUpdated: '3h ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Sales → One-Pagers\nChunks on sections; extracts benefits, features, pricing.'
        },
        {
          id: 'sales-pitches',
          name: 'Sales Pitches',
          count: 4,
          lastUpdated: '2d ago',
          trend: 'up',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Sales → Pitches\nChunks on presentations; extracts hooks, demos, closes.'
        }
      ]
    },
    {
      id: 'visual-design-assets',
      name: 'Visual & Design Assets',
      icon: Palette,
      totalCount: 22,
      isExpanded: true,
      color: 'bg-[#111013]',
      subTypes: [
        {
          id: 'design-banner-images',
          name: 'Design & Banner Images',
          count: 14,
          lastUpdated: '2d ago',
          trend: 'stable',
          extractionHealth: 'healthy',
          tooltip: 'Extraction Recipe: Visual → Design\nChunks on elements; extracts text overlays, brand elements, themes.'
        },
        {
          id: 'product-mockups',
          name: 'Product Mockups',
          count: 8,
          lastUpdated: '1w ago',
          trend: 'stable',
          extractionHealth: 'warning',
          tooltip: 'Extraction Recipe: Visual → Mockups\nChunks on presentations; extracts contexts, features, use cases.'
        }
      ]
    }
  ]);

  const handleSubTypeClick = (subType: SubType) => {
    // Find the parent group for this subType
    const parentGroup = categoryGroups.find(group => 
      group.subTypes.some(st => st.id === subType.id)
    );

    const category: Category = {
      name: subType.name,
      count: subType.count,
      color: 'bg-[#111013]',
      group: parentGroup?.id || '',
      groupName: parentGroup?.name || ''
    };
    onCategorySelect(category);
  };

  const toggleGroupExpansion = (groupId: string) => {
    setCategoryGroups(prev => prev.map(group => 
      group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
    ));
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getSubTypeIcon = (subTypeId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'technical-blogs': Code,
      'product-blogs': Target,
      'marketing-blogs': Megaphone,
      'case-studies': BookOpen,
      'thought-leadership': Edit3,
      'promotional-emails': Zap,
      'drip-onboarding': Users,
      'transactional-emails': Mail,
      'newsletters': FileText,
      'outreach-sales-emails': Briefcase,
      'internal-comms-emails': Users,
      'email-subject-lines': MessageSquare,
      'awareness-posts': Eye,
      'engagement-posts': MessageSquare,
      'product-teasers': Target,
      'promotional-posts': Megaphone,
      'facebook-posts': MessageSquare,
      'instagram-posts': Camera,
      'linkedin-posts': Users,
      'tiktok-video-scripts': Video,
      'youtube-vimeo-blends': Video,
      'x-social-posts': MessageSquare,
      'search-ads': Search,
      'display-ads': Monitor,
      'social-ads': MessageSquare,
      'retargeting-ads': TrendingUp,
      'meta-ads': Target,
      'tiktok-linkedin-ads': Target,
      'product-landing-pages': Globe,
      'event-registration-pages': Calendar,
      'lead-gen-ctas': Target,
      'product-launch-press': Megaphone,
      'corporate-announcements': FileText,
      'creative-briefs-advertising': PenTool,
      'creative-briefs-marketing': PenTool,
      'creative-briefs-videography': Video,
      'product-descriptions': Target,
      'product-listings': FileText,
      'seo-meta-tags': Code,
      'job-postings': Users,
      'job-summaries': FileText,
      'linkedin-hr-posts': Users,
      'podcast-blends': Headphones,
      'meeting-blends': Users,
      'web-blends': Globe,
      'push-notifications': Zap,
      'in-app-notifications': MessageSquare,
      'sales-decks': Briefcase,
      'one-pagers': FileText,
      'sales-pitches': Briefcase,
      'design-banner-images': Palette,
      'product-mockups': FileImage
    };
    return iconMap[subTypeId] || FileText;
  };

  // Get all subtypes for grid view
  const sortSubTypes = (subTypes: SubType[]) => {
    return [...subTypes].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'dateUpdated':
          // Convert time strings to sortable format
          const timeToMinutes = (timeStr: string) => {
            if (timeStr.includes('m ago')) return parseInt(timeStr);
            if (timeStr.includes('h ago')) return parseInt(timeStr) * 60;
            if (timeStr.includes('d ago')) return parseInt(timeStr) * 24 * 60;
            if (timeStr.includes('w ago')) return parseInt(timeStr) * 7 * 24 * 60;
            return 999999; // Very old
          };
          return timeToMinutes(a.lastUpdated) - timeToMinutes(b.lastUpdated);
        case 'itemCount':
          return b.count - a.count;
        case 'extractionHealth':
          const healthOrder = { 'error': 0, 'warning': 1, 'healthy': 2 };
          return healthOrder[a.extractionHealth] - healthOrder[b.extractionHealth];
        default:
          return 0;
      }
    });
  };

  const filteredGroups = categoryGroups.filter(group => {
    if (selectedGroup !== 'all' && group.id !== selectedGroup) return false;
    
    if (!searchQuery) return true;
    
    return group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           group.subTypes.some(subType => 
             subType.name.toLowerCase().includes(searchQuery.toLowerCase())
           );
  });

  // Get all subtypes for grid view
  const allSubTypes = filteredGroups.flatMap(group => 
    group.subTypes.map(subType => ({ ...subType, groupName: group.name, groupColor: group.color }))
  );

  const groupOptions = [
    { id: 'all', name: 'All Groups' },
    ...categoryGroups.map(group => ({ id: group.id, name: group.name }))
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Knowledge Repository</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
            <button 
              className="flex items-center space-x-2 px-4 py-2 text-[#111013] border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Category</span>
            </button>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors font-medium"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#111013]" />
            <input
              type="text"
              placeholder="Search categories, sub‑types, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-3 h-3 text-[#111013]" />
              </button>
            )}
          </div>
          <Dropdown
            options={groupOptions.map(option => option.name)}
            selectedOption={groupOptions.find(option => option.id === selectedGroup)?.name || 'All Groups'}
            onSelect={(optionName: string) => {
              const option = groupOptions.find(opt => opt.name === optionName);
              if (option) {
                setSelectedGroup(option.id);
              }
            }}
            className="w-48"
          />
          <Dropdown
            options={[
              'Sort by Name',
              'Sort by Date Updated',
              'Sort by Item Count',
              'Sort by Extraction Health'
            ]}
            selectedOption={`Sort by ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1).replace(/([A-Z])/g, ' $1')}`}
            onSelect={(option: string) => {
              const value = option.replace('Sort by ', '').toLowerCase().replace(/\s+/g, '');
              setSortBy(value as any);
            }}
          />
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'grid' ? (
          /* Grid View - Show all subtypes as cards */
          <div className="space-y-8">
            {filteredGroups.map((group) => (
              <div key={group.id} className="space-y-4">
                {/* Group Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${group.color} rounded-lg flex items-center justify-center`}>
                      <group.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{group.name}</h2>
                      <p className="text-sm text-gray-500">{group.totalCount} total items</p>
                    </div>
                  </div>
                </div>
                {/* Group Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {sortSubTypes(group.subTypes).map((subType) => {
                    const IconComponent = getSubTypeIcon(subType.id);
                    return (
                      <div
                        key={subType.id}
                        className="group bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 cursor-pointer"
                        onClick={() => handleSubTypeClick(subType)}
                      >
                        {/* Card Content */}
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-[#111013]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-5">{subType.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{subType.count} files</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View - Show grouped by categories */
          <div className="space-y-6">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroupExpansion(group.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#111013] rounded-lg flex items-center justify-center">
                      <group.icon className="w-4 h-4 text-[#FAF7F6]" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">{group.name}</h2>
                    <span className="text-sm text-gray-500">({group.totalCount} items)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {group.isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#111013]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#111013]" />
                    )}
                  </div>
                </button>
                {/* List View Items */}
                {group.isExpanded && (
                  <div className="divide-y divide-gray-100">
                    {sortSubTypes(group.subTypes).map((subType) => {
                      const IconComponent = getSubTypeIcon(subType.id);
                      return (
                        <div
                          key={subType.id}
                          onClick={() => handleSubTypeClick(subType)}
                          className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                            <IconComponent className="w-4 h-4 text-[#111013]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900">{subType.name}</h3>
                            <p className="text-xs text-gray-500">{subType.count} files</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#111013]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? `No categories match "${searchQuery}". Try adjusting your search terms.`
                : "Create your first category to start organizing content."
              }
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors mr-3"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <KnowledgeRepositoryUploadModal
          categoryGroups={categoryGroups}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default MainContent;