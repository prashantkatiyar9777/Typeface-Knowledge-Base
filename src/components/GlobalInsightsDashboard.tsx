import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Target, MessageSquare, Palette, FileText, Clock, Eye, Filter, Download, RefreshCw, ChevronDown, ChevronRight, Volume2, Layers, Code, Zap, Globe, Calendar, Tag, AlertCircle, CheckCircle, ArrowUp, ArrowDown, Minus, PenTool, Type, Activity, Heart, Image, Repeat, AlertTriangle, Shield } from 'lucide-react';

const GlobalInsightsDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3m');
  const [expandedDimensions, setExpandedDimensions] = useState<Record<string, boolean>>({
    'tone-voice': true,
    'stylistic': false,
    'structural': false
  });

  const timeRanges = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  // Mock data for the 15 key dimensions
  const brandDimensions = [
    {
      id: 'tone-voice',
      title: 'Tone & Voice',
      icon: Volume2,
      color: 'bg-blue-500',
      data: {
        dominant: [
          { label: 'Trust-building', value: 45, color: 'bg-blue-500' },
          { label: 'Conversational', value: 25, color: 'bg-green-500' },
          { label: 'Authoritative', value: 20, color: 'bg-purple-500' },
          { label: 'Casual', value: 10, color: 'bg-orange-500' }
        ],
        formality: { score: 0.72, trend: 'up' },
        pronouns: { we: 45, you: 35, i: 15, they: 5 }
      }
    },
    {
      id: 'stylistic',
      title: 'Stylistic Preferences',
      icon: Palette,
      color: 'bg-green-500',
      data: {
        elements: [
          { type: 'Bullets', frequency: 40, per1000: 12 },
          { type: 'Quotes', frequency: 35, per1000: 8 },
          { type: 'Tables', frequency: 15, per1000: 3 },
          { type: 'Code blocks', frequency: 10, per1000: 2 }
        ]
      }
    },
    {
      id: 'structural',
      title: 'Structural Patterns',
      icon: Layers,
      color: 'bg-purple-500',
      data: {
        flows: [
          { pattern: 'Challenge→Solution→Results', frequency: 35 },
          { pattern: 'Problem→Analysis→Implementation', frequency: 28 },
          { pattern: 'Introduction→Features→Benefits', frequency: 22 },
          { pattern: 'Story→Lesson→Application', frequency: 15 }
        ],
        avgSections: 5.2
      }
    },
    {
      id: 'linguistic',
      title: 'Linguistic Features',
      icon: MessageSquare,
      color: 'bg-orange-500',
      data: {
        sentenceLength: 18.5,
        jargonDensity: 0.15,
        readabilityGrade: 8.2
      }
    },
    {
      id: 'content-strategy',
      title: 'Content Strategy Cues',
      icon: Target,
      color: 'bg-red-500',
      data: {
        topCTAs: [
          { text: 'Learn More', count: 156 },
          { text: 'Get Started', count: 134 },
          { text: 'Contact Us', count: 98 },
          { text: 'Schedule Demo', count: 87 }
        ],
        internalLinkRate: 0.23
      }
    },
    {
      id: 'domain-specific',
      title: 'Domain-Specific Rules',
      icon: Code,
      color: 'bg-indigo-500',
      data: {
        brandTerms: [
          { term: 'digital transformation', count: 89 },
          { term: 'customer experience', count: 76 },
          { term: 'data-driven', count: 65 },
          { term: 'scalable solution', count: 54 }
        ],
        complianceRate: 0.94
      }
    },
    {
      id: 'behavioral',
      title: 'Behavioral Metadata',
      icon: BarChart3,
      color: 'bg-teal-500',
      data: {
        avgScrollDepth: 0.68,
        readThroughRate: 0.45,
        ctaEngagementRate: 0.12
      }
    },
    {
      id: 'persona-signals',
      title: 'Persona Signals',
      icon: Users,
      color: 'bg-pink-500',
      data: {
        mentions: [
          { role: 'Marketers', frequency: 35 },
          { role: 'Developers', frequency: 28 },
          { role: 'Executives', frequency: 22 },
          { role: 'Sales Teams', frequency: 15 }
        ]
      }
    },
    {
      id: 'emotional',
      title: 'Emotional Framing',
      icon: MessageSquare,
      color: 'bg-cyan-500',
      data: {
        emotions: [
          { type: 'Empowerment', mix: 40 },
          { type: 'Urgency', mix: 25 },
          { type: 'Empathy', mix: 20 },
          { type: 'Excitement', mix: 15 }
        ]
      }
    },
    {
      id: 'media-assets',
      title: 'Media Asset Usage',
      icon: FileText,
      color: 'bg-amber-500',
      data: {
        formats: [
          { type: 'Screenshots', percentage: 45 },
          { type: 'Infographics', percentage: 25 },
          { type: 'Videos', percentage: 20 },
          { type: 'None', percentage: 10 }
        ]
      }
    },
    {
      id: 'localization',
      title: 'Localization Patterns',
      icon: Globe,
      color: 'bg-emerald-500',
      data: {
        coverage: [
          { language: 'English (US)', percentage: 85 },
          { language: 'English (UK)', percentage: 10 },
          { language: 'Spanish', percentage: 3 },
          { language: 'French', percentage: 2 }
        ]
      }
    },
    {
      id: 'tagging',
      title: 'Tagging Taxonomy',
      icon: Tag,
      color: 'bg-violet-500',
      data: {
        topTags: [
          { tag: 'Product Update', count: 234 },
          { tag: 'Case Study', count: 189 },
          { tag: 'Best Practices', count: 156 },
          { tag: 'Industry Insights', count: 134 }
        ]
      }
    },
    {
      id: 'repetition',
      title: 'Repetition Patterns',
      icon: RefreshCw,
      color: 'bg-slate-500',
      data: {
        phrases: [
          { phrase: 'In today\'s digital landscape', count: 45 },
          { phrase: 'Our team of experts', count: 38 },
          { phrase: 'Proven track record', count: 32 },
          { phrase: 'Industry-leading solution', count: 28 }
        ]
      }
    },
    {
      id: 'style-violations',
      title: 'Style Violations',
      icon: AlertCircle,
      color: 'bg-red-600',
      data: {
        violations: [
          { type: 'Clickbait headlines', percentage: 8 },
          { type: 'Missing disclaimers', percentage: 5 },
          { type: 'Inconsistent formatting', percentage: 12 },
          { type: 'Overuse of superlatives', percentage: 15 }
        ]
      }
    },
    {
      id: 'compliance',
      title: 'Compliance Patterns',
      icon: CheckCircle,
      color: 'bg-green-600',
      data: {
        coverage: [
          { type: 'Legal disclaimers', percentage: 94 },
          { type: 'Copyright notices', percentage: 87 },
          { type: 'Trademark usage', percentage: 91 },
          { type: 'Privacy statements', percentage: 89 }
        ]
      }
    }
  ];

  const toggleDimension = (dimensionId: string) => {
    setExpandedDimensions(prev => ({
      ...prev,
      [dimensionId]: !prev[dimensionId]
    }));
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-3 h-3 text-[#111013]" />;
      case 'down': return <ArrowDown className="w-3 h-3 text-[#111013]" />;
      default: return <Minus className="w-3 h-3 text-[#111013]" />;
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Volume2,
      Palette,
      Layers,
      Type,
      Target,
      FileText,
      Activity,
      Users,
      Heart,
      Image,
      Globe,
      Tag,
      Repeat,
      AlertTriangle,
      Shield
    };
    return icons[iconName];
  };

  const renderDimensionCard = (dimension: any) => {
    const IconComponent = dimension.icon === 'Volume2' ? Volume2 :
      dimension.icon === 'Palette' ? Palette :
      dimension.icon === 'Layers' ? Layers :
      dimension.icon === 'Type' ? Type :
      dimension.icon === 'Target' ? Target :
      dimension.icon === 'FileText' ? FileText :
      dimension.icon === 'Activity' ? Activity :
      dimension.icon === 'Users' ? Users :
      dimension.icon === 'Heart' ? Heart :
      dimension.icon === 'Image' ? Image :
      dimension.icon === 'Globe' ? Globe :
      dimension.icon === 'Tag' ? Tag :
      dimension.icon === 'Repeat' ? Repeat :
      dimension.icon === 'AlertTriangle' ? AlertTriangle :
      dimension.icon === 'Shield' ? Shield : FileText;
    
    const isExpanded = expandedDimensions[dimension.id];
    
    return (
      <div key={dimension.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleDimension(dimension.id)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-[#111013]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{dimension.title}</h3>
          </div>
          {dimension.data.formality?.trend && getTrendIcon(dimension.data.formality.trend)}
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-[#111013]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[#111013]" />
          )}
        </button>

        {isExpanded && (
          <div className="p-4 border-t border-gray-200">
            {dimension.id === 'tone-voice' && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Tone Distribution</h4>
                {dimension.data.dominant.map((tone: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{tone.label}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className={`bg-[#111013] h-2 rounded-full w-[${tone.value}%]`}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{tone.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dimension.id === 'stylistic' && (
              <div className="space-y-3">
                {dimension.data.elements.map((element: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{element.type}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{element.per1000}/1000 words</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className={`bg-[#111013] h-2 rounded-full w-[${element.frequency}%]`}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{element.frequency}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dimension.id === 'structural' && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Narrative Flows</h4>
                {dimension.data.flows.map((flow: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-mono">{flow.pattern}</span>
                    <span className="text-sm font-medium text-gray-900">{flow.frequency}%</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add similar detailed views for other dimensions */}
            {dimension.id === 'content-strategy' && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Most Used CTAs</h4>
                <div className="space-y-2">
                  {dimension.data.topCTAs.map((cta: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">"{cta.text}"</span>
                      <span className="text-sm font-medium text-gray-900">{cta.count} uses</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Internal Link Rate</span>
                    <span className="text-sm font-medium text-gray-900">{(dimension.data.internalLinkRate * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Add drill-down link */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View detailed analysis →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

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

  const dimensionIcons = {
    toneVoice: <Volume2 className="w-6 h-6 text-[#111013]" />,
    stylistic: <PenTool className="w-6 h-6 text-[#111013]" />,
    structural: <Layers className="w-6 h-6 text-[#111013]" />
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

        {/* 15 Key Dimensions Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">15 Key Brand DNA Dimensions</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>Click any dimension to explore details</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandDimensions.map(renderDimensionCard)}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
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