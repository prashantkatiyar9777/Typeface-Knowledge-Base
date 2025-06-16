import React, { useState } from 'react';
import { 
  BarChart3, FileText, Users, Target, RefreshCw, Calendar, ArrowUp, Clock, Filter, Download,
  Volume2, Palette, Layers, MessageSquare, Target as TargetIcon, Code, Heart, Globe, Tag,
  AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, AlertOctagon, ExternalLink
} from 'lucide-react';

interface CoverageItem {
  name: string;
  percentage: number;
  updated: string;
}

interface DimensionData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  score: number;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'stable';
  };
  metrics?: {
    label: string;
    value: string | number;
    trend?: string;
  }[];
  trendData?: number[];
  trendLabels?: { start: string; end: string };
}

interface DriftedFile {
  title: string;
  type: string;
  match: string;
  link: string;
}

interface DriftData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  affectedFiles: number;
  deviation: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  metrics?: {
    label: string;
    value: string;
    match?: string;
    link?: string;
  }[];
  trendData: number[];
  trendLabels: { start: string; end: string };
  exampleContent?: DriftedFile[];
}

export const GlobalInsightsDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3m');

  const timeRanges = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  const statCards = [
    {
      icon: <FileText className="w-5 h-5 text-[#111013]" />,
      title: "Total Content Analyzed",
      value: "1,247",
      trend: "+12%",
      trendLabel: "vs last month"
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-[#111013]" />,
      title: "Brand Consistency Score",
      value: "87%",
      trend: "+5%",
      trendLabel: "vs last month"
    },
    {
      icon: <Target className="w-5 h-5 text-[#111013]" />,
      title: "Active Content Types",
      value: "47",
      trend: "+3",
      trendLabel: "new types"
    },
    {
      icon: <Users className="w-5 h-5 text-[#111013]" />,
      title: "Trained AI Agents",
      value: "10",
      trend: "+2",
      trendLabel: "this month"
    }
  ];

  const coverageData: CoverageItem[] = [
    { name: 'Tone & Voice Signals', percentage: 93, updated: '3/19/2024' },
    { name: 'Stylistic Preferences', percentage: 88, updated: '3/19/2024' },
    { name: 'Structural Patterns', percentage: 85, updated: '3/18/2024' },
    { name: 'Linguistic Features', percentage: 91, updated: '3/19/2024' },
    { name: 'Content Strategy', percentage: 87, updated: '3/18/2024' }
  ];

  const dimensionsData: DimensionData[] = [
    {
      id: 'tone-voice',
      title: 'Tone & Voice Signals',
      description: 'Analysis of brand voice characteristics and tone patterns',
      icon: Volume2,
      score: 87,
      trend: { value: '+5%', direction: 'up' },
      metrics: [
        { label: 'Formal', value: '35%', trend: 'increasing' },
        { label: 'Friendly', value: '45%', trend: 'stable' },
        { label: 'Conversational', value: '20%', trend: 'decreasing' },
        { label: 'Active Voice', value: '82%', trend: 'stable' }
      ],
      trendData: [82, 83, 82, 84, 85, 87],
      trendLabels: { start: '82%', end: '87%' }
    },
    {
      id: 'stylistic',
      title: 'Stylistic Preferences',
      description: 'Common writing style patterns and formatting choices',
      icon: Palette,
      score: 92,
      trend: { value: 'Stable', direction: 'stable' },
      metrics: [
        { label: 'Avg Sentence Length', value: '18 words' },
        { label: 'Bullet Usage', value: '35%' },
        { label: 'Emoji Frequency', value: '12%' },
        { label: 'CTA Style Consistency', value: '89%' }
      ],
      trendData: [91, 92, 91, 93, 91, 92],
      trendLabels: { start: '91%', end: '92%' }
    },
    {
      id: 'structural',
      title: 'Structural Patterns',
      description: 'Content structure and organization patterns',
      icon: Layers,
      score: 85,
      trend: { value: '+3%', direction: 'up' },
      metrics: [
        { label: 'Hook → Body → CTA', value: '45%' },
        { label: 'Problem → Solution', value: '30%' },
        { label: 'How-to Format', value: '15%' },
        { label: 'Q&A Format', value: '10%' }
      ],
      trendData: [80, 81, 82, 83, 84, 85]
    },
    {
      id: 'linguistic',
      title: 'Linguistic Features',
      description: 'Language complexity and readability metrics',
      icon: MessageSquare,
      score: 91,
      trend: { value: '+2%', direction: 'up' },
      metrics: [
        { label: 'Readability Score', value: '68/100' },
        { label: 'Technical Terms', value: '15%' },
        { label: 'Jargon Density', value: '8%' },
        { label: 'Plain Language', value: '82%' }
      ],
      trendData: [87, 88, 89, 90, 90, 91]
    },
    {
      id: 'content-strategy',
      title: 'Content Strategy Cues',
      description: 'Strategic patterns in content creation',
      icon: TargetIcon,
      score: 88,
      trend: { value: '+4%', direction: 'up' },
      metrics: [
        { label: 'Educational', value: '40%' },
        { label: 'Promotional', value: '35%' },
        { label: 'Inspirational', value: '25%' },
        { label: 'CTA Effectiveness', value: '76%' }
      ],
      trendData: [84, 85, 86, 87, 87, 88]
    },
    {
      id: 'domain-specific',
      title: 'Domain-Specific Rules',
      description: 'Industry-specific terminology and compliance patterns',
      icon: Code,
      score: 94,
      trend: { value: '+1%', direction: 'up' },
      metrics: [
        { label: 'Term Consistency', value: '94%' },
        { label: 'Required Disclosures', value: '100%' },
        { label: 'Industry Jargon', value: '15%' },
        { label: 'Compliance Rate', value: '98%' }
      ]
    },
    {
      id: 'emotional',
      title: 'Emotional Framing',
      description: 'Sentiment and emotional tone analysis',
      icon: Heart,
      score: 89,
      trend: { value: '+2%', direction: 'up' },
      metrics: [
        { label: 'Positive Sentiment', value: '75%' },
        { label: 'Confidence', value: '45%' },
        { label: 'Empathy', value: '30%' },
        { label: 'Urgency', value: '15%' }
      ]
    },
    {
      id: 'localization',
      title: 'Localization Patterns',
      description: 'Regional language and cultural adaptations',
      icon: Globe,
      score: 86,
      trend: { value: '+4%', direction: 'up' },
      metrics: [
        { label: 'US English', value: '85%' },
        { label: 'UK English', value: '10%' },
        { label: 'Local Idioms', value: '5%' },
        { label: 'Cultural References', value: '8%' }
      ]
    },
    {
      id: 'tagging',
      title: 'Tagging Taxonomy',
      description: 'Content categorization and metadata patterns',
      icon: Tag,
      score: 90,
      trend: { value: 'Stable', direction: 'stable' },
      metrics: [
        { label: 'Tag Consistency', value: '92%' },
        { label: 'Category Coverage', value: '88%' },
        { label: 'Metadata Quality', value: '85%' },
        { label: 'Search Relevance', value: '90%' }
      ]
    },
    {
      id: 'violations',
      title: 'Style Violations',
      description: 'Brand style and tone violations tracking',
      icon: AlertTriangle,
      score: 95,
      trend: { value: '+3%', direction: 'up' },
      metrics: [
        { label: 'Tone Violations', value: '2%' },
        { label: 'Style Violations', value: '3%' },
        { label: 'Grammar Issues', value: '1%' },
        { label: 'Brand Terms', value: '1%' }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance Patterns',
      description: 'Legal and regulatory compliance tracking',
      icon: CheckCircle,
      score: 98,
      trend: { value: 'Stable', direction: 'stable' },
      metrics: [
        { label: 'Legal Disclaimers', value: '100%' },
        { label: 'Privacy Terms', value: '100%' },
        { label: 'Regulatory Compliance', value: '98%' },
        { label: 'Risk Score', value: '0.5%' }
      ]
    }
  ];

  const driftData: DriftData[] = [
    {
      id: 'marketing-emails',
      title: 'Marketing Emails',
      description: 'Recent emails are significantly more casual than brand standard',
      icon: AlertOctagon,
      affectedFiles: 23,
      deviation: '30%',
      severity: 'HIGH',
      metrics: [
        { label: 'Q1 Newsletter', value: '45% match', link: '#' },
        { label: 'Product Update', value: '38% match', link: '#' }
      ],
      trendData: [85, 80, 75, 70, 65, 70],
      trendLabels: { start: '85%', end: '70%' }
    },
    {
      id: 'blog-posts',
      title: 'Blog Posts',
      description: 'Inconsistent CTA placement and formatting',
      icon: FileText,
      affectedFiles: 12,
      deviation: '15%',
      severity: 'MEDIUM',
      metrics: [
        { label: 'Tech Trends 2024', value: '72% match', link: '#' }
      ],
      trendData: [90, 88, 85, 82, 85, 85],
      trendLabels: { start: '90%', end: '85%' }
    },
    {
      id: 'social-posts',
      title: 'Social Media Posts',
      description: 'Tone becoming more informal across platforms',
      icon: Globe,
      affectedFiles: 45,
      deviation: '25%',
      severity: 'HIGH',
      metrics: [
        { label: 'LinkedIn Updates', value: '65% match', link: '#' },
        { label: 'Twitter Posts', value: '55% match', link: '#' }
      ],
      trendData: [90, 85, 80, 75, 70, 75],
      trendLabels: { start: '90%', end: '75%' }
    }
  ];

  const TrendChart: React.FC<{ data: number[]; startLabel?: string; endLabel?: string }> = ({ data, startLabel, endLabel }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    // Create a smooth curve using bezier
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return [x, y];
    });

    // Generate smooth path
    const path = points.reduce((acc, point, i, points) => {
      if (i === 0) {
        return `M ${point[0]},${point[1]}`;
      }
      
      const prevPoint = points[i - 1];
      
      if (i === points.length - 1) {
        return `${acc} L ${point[0]},${point[1]}`;
      }
      
      // Control points for smooth curve
      const cp1x = prevPoint[0] + (point[0] - prevPoint[0]) * 0.5;
      const cp1y = prevPoint[1];
      const cp2x = point[0];
      const cp2y = point[1];
      
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point[0]},${point[1]}`;
    }, '');

    return (
      <div className="h-24 w-full relative">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Trend line */}
          <path
            d={path}
            fill="none"
            stroke="#4F46E5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
        </svg>
        
        {/* Value labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          {startLabel && <span>{startLabel}</span>}
          {endLabel && <span>{endLabel}</span>}
        </div>
      </div>
    );
  };

  const renderMetricValue = (metric: { label: string; value: string | number; trend?: string }) => {
    return (
      <div className="flex items-center justify-between py-1.5">
        <span className="text-sm text-gray-600">{metric.label}</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{metric.value}</span>
          {metric.trend && (
            <span className={`text-xs ${
              metric.trend === 'increasing' ? 'text-green-500' :
              metric.trend === 'decreasing' ? 'text-red-500' :
              'text-gray-500'
            }`}>
              {metric.trend === 'increasing' ? '↑' :
               metric.trend === 'decreasing' ? '↓' :
               '→'}
            </span>
          )}
        </div>
      </div>
    );
  };

  const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);
    const totalSlides = Math.ceil(childrenArray.length / 2);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {React.Children.map(childrenArray, (child) => (
              <div className="w-1/2 flex-shrink-0 px-2">
                {child}
              </div>
            ))}
          </div>
        </div>
        
        {currentIndex > 0 && (
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        {currentIndex < totalSlides - 1 && (
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    );
  };

  const renderDimensionCard = (dimension: DimensionData) => {
    const IconComponent = dimension.icon;
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
        <div className="p-5">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50">
              <IconComponent className="w-4 h-4 text-[#111013]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{dimension.title}</h3>
              <p className="text-xs text-gray-500">{dimension.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-gray-900">{dimension.score}%</span>
            {dimension.trend && (
              <div className={`text-sm ${
                dimension.trend.direction === 'up' ? 'text-green-500' :
                dimension.trend.direction === 'down' ? 'text-red-500' :
                'text-gray-500'
              }`}>
                {dimension.trend.value}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Key Insights</h4>
              {dimension.metrics?.map((metric, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0">
                  {renderMetricValue(metric)}
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Trend</h4>
              {dimension.trendData && (
                <TrendChart 
                  data={dimension.trendData} 
                  startLabel={dimension.trendLabels?.start}
                  endLabel={dimension.trendLabels?.end}
                />
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              View Full Analysis
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderDriftCard = (drift: DriftData) => {
    const IconComponent = drift.icon;
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                drift.severity === 'HIGH' ? 'bg-red-50' :
                drift.severity === 'MEDIUM' ? 'bg-yellow-50' :
                'bg-blue-50'
              }`}>
                <IconComponent className={`w-4 h-4 ${
                  drift.severity === 'HIGH' ? 'text-red-600' :
                  drift.severity === 'MEDIUM' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-semibold text-gray-900">{drift.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    drift.severity === 'HIGH' ? 'bg-red-100 text-red-700' :
                    drift.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {drift.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{drift.affectedFiles} files affected</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium ${
                parseFloat(drift.deviation) > 20 ? 'text-red-600' :
                parseFloat(drift.deviation) > 10 ? 'text-yellow-600' :
                'text-gray-600'
              }`}>
                {drift.deviation} deviation
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">{drift.description}</p>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Example Content</h4>
              {drift.metrics?.map((metric, index) => (
                <div key={index} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    {metric.link && (
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Trend</h4>
              {drift.trendData && (
                <TrendChart 
                  data={drift.trendData} 
                  startLabel={drift.trendLabels.start}
                  endLabel={drift.trendLabels.end}
                />
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Review Content
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Global Brand DNA Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#111013]" />
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <ArrowUp className="w-3 h-3 text-[#111013]" />
                <span className="text-green-600">{card.trend}</span>
                <span className="text-gray-500">{card.trendLabel}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Brand DNA Dimensions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Brand Behaviour Blueprint</h3>
            <p className="text-sm text-gray-500">Swipe to explore all dimensions</p>
          </div>
          <Carousel>
            {dimensionsData.map(dimension => (
              <div key={dimension.id} className="h-full">
                {renderDimensionCard(dimension)}
              </div>
            ))}
          </Carousel>
        </div>

        {/* Deviation & Drift Analysis */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Deviation & Drift Analyzer</h3>
              <p className="text-sm text-gray-500">Monitor content that deviates from brand standards</p>
            </div>
            <div className="flex items-center space-x-3">
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
                <option>All Severities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <button className="flex items-center space-x-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Analysis</span>
              </button>
            </div>
          </div>
          <Carousel>
            {driftData.map(drift => (
              <div key={drift.id} className="h-full">
                {renderDriftCard(drift)}
              </div>
            ))}
          </Carousel>
        </div>

        {/* Extraction Coverage */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Extraction Coverage</h3>
          <div className="space-y-4">
            {coverageData.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-xs">Updated {item.updated}</span>
                    <span className={`font-medium ${
                      item.percentage >= 90 ? 'text-green-600' :
                      item.percentage >= 80 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>{item.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.percentage >= 90 ? 'bg-green-500' :
                      item.percentage >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left">
              <BarChart3 className="w-6 h-6 text-[#111013]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Generate Brand Report</p>
                <p className="text-xs text-gray-500">Export comprehensive brand DNA analysis</p>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left">
              <Users className="w-6 h-6 text-[#111013]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Train New Agent</p>
                <p className="text-xs text-gray-500">Create AI agent from brand patterns</p>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left">
              <Calendar className="w-6 h-6 text-[#111013]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Schedule Analysis</p>
                <p className="text-xs text-gray-500">Set up automated brand monitoring</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalInsightsDashboard;