import React, { useState } from 'react';
import { BarChart3, FileText, Users, Target, RefreshCw, Calendar, ChevronRight, ArrowUp, ArrowDown, Minus, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { BrandDriftAnalysis } from '../dashboard/BrandDriftAnalysis';
import { ActionRecommendations } from '../dashboard/ActionRecommendations';
import { InteractiveChart } from '../charts/InteractiveChart';
import { BRAND_DIMENSIONS } from '../../data/brandDimensions';
import { timeRanges } from '../../data/mockData';
import { getIcon } from '../../utils/iconMap';
import { Dropdown } from '../common/Dropdown/Dropdown';

interface Tone {
  label: string;
  value: number;
  color: string;
}

interface Element {
  type: string;
  per1000: number;
  frequency: number;
}

interface Flow {
  pattern: string;
  frequency: number;
}

interface CTA {
  text: string;
  count: number;
}

interface Mention {
  role: string;
  frequency: number;
}

interface Emotion {
  type: string;
  mix: number;
}

interface Coverage {
  language: string;
  percentage: number;
}

interface Format {
  type: string;
  percentage: number;
}

interface Tag {
  name: string;
  count: number;
}

interface Phrase {
  text: string;
  count: number;
}

interface BrandTerm {
  term: string;
  frequency: number;
}

interface Dimension {
  id: string;
  title: string;
  color: string;
  icon: string;
  data: {
    dominant: Tone[];
    formality: {
      score: number;
      trend: string;
    };
    pronouns: {
      we: number;
      you: number;
      i: number;
    };
    elements: Element[];
    flows: Flow[];
    topCTAs: CTA[];
    mentions: Mention[];
    emotions: Emotion[];
    violations: Array<{ percentage: number }>;
    coverage: Coverage[];
    avgSections?: number;
    sentenceLength?: number;
    jargonDensity?: number;
    passiveVoice?: number;
    readabilityGrade?: number;
    internalLinkRate?: number;
    avgScrollDepth?: number;
    ctaEngagementRate?: number;
    shareRate?: number;
    sentimentScore?: number;
    brandTerms: BrandTerm[];
    formats: Format[];
    topTags: Tag[];
    phrases: Phrase[];
  };
}

export const GlobalInsightsDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3m');
  const [isDimensionsExpanded, setIsDimensionsExpanded] = useState(true);

  const toneDistributionData = [
    { label: 'Trust-building', value: 45, color: 'bg-blue-500' },
    { label: 'Conversational', value: 25, color: 'bg-green-500' },
    { label: 'Authoritative', value: 20, color: 'bg-purple-500' },
    { label: 'Casual', value: 10, color: 'bg-orange-500' }
  ];

  const handleChartSliceClick = (slice: { label: string; value: number; color: string }) => {
    console.log('Chart slice clicked:', slice);
  };

  const getSummaryText = (dimension: Dimension) => {
    switch (dimension.id) {
      case 'tone-voice': 
        return `${dimension.data.dominant[0].value}% ${dimension.data.dominant[0].label}`;
      case 'stylistic': 
        return `${dimension.data.elements[0].frequency}% use ${dimension.data.elements[0].type.toLowerCase()}`;
      case 'structural': 
        return `${dimension.data.flows[0].frequency}% follow ${dimension.data.flows[0].pattern}`;
      case 'linguistic': 
        return `Avg ${dimension.data.sentenceLength || 0} words/sentence`;
      case 'content-strategy': 
        return `${dimension.data.topCTAs[0].count} "${dimension.data.topCTAs[0].text}" CTAs`;
      case 'domain-specific': 
        return `${dimension.data.brandTerms.length} key brand terms`;
      case 'behavioral': 
        return `${((dimension.data.avgScrollDepth || 0) * 100).toFixed(0)}% avg scroll depth`;
      case 'persona-signals': 
        return `${dimension.data.mentions[0].frequency}% target ${dimension.data.mentions[0].role.toLowerCase()}`;
      case 'emotional': 
        return `${dimension.data.emotions[0].mix}% ${dimension.data.emotions[0].type.toLowerCase()}`;
      case 'media-assets': 
        return `${dimension.data.formats[0].percentage}% use ${dimension.data.formats[0].type.toLowerCase()}`;
      case 'localization': 
        return `${dimension.data.coverage[0].percentage}% ${dimension.data.coverage[0].language}`;
      case 'tagging': 
        return `${dimension.data.topTags.length} primary tag categories`;
      case 'repetition': 
        return `${dimension.data.phrases.length} common phrases identified`;
      case 'style-violations': 
        return `${dimension.data.violations.reduce((sum, v) => sum + v.percentage, 0)}% total violations`;
      case 'compliance': 
        return `${Math.round(dimension.data.coverage.reduce((sum, c) => sum + c.percentage, 0) / dimension.data.coverage.length)}% avg compliance`;
      default: 
        return 'Analysis available';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDown className="w-3 h-3 text-red-500" />;
      default: return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const renderDimensionDetails = (dimension: Dimension) => {
    // ... existing code ...
  };

  const getWhyItMatters = (dimensionId: string) => {
    const explanations: Record<string, string> = {
      'media-assets': 'Ensures AI suggestions or templates are visually on-brand and include appropriate media references.',
      'localization': 'Enables locale-specific variant generation and ensures language correctness across regions.',
      'tagging': 'Supports content governance, analytics, and surfacing relevant content through proper categorization.',
      'repetition': 'Helps prevent unintentional monotony and teaches agents signature brand expressions.',
      'style-violations': 'Helps clean legacy content and guide agent risk scoring to maintain brand standards.',
      'compliance': 'Critical for AI compliance guardrails—avoids legal risk and misinformation in generated content.'
    };
    return explanations[dimensionId] || 'Provides essential insights for AI-powered content generation and brand consistency.';
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Controls - Fixed Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Global Brand DNA Dashboard</h2>
          </div>
          <div className="flex items-center space-x-3">
            <Dropdown
              options={timeRanges.map(range => range.label)}
              selectedOption={timeRanges.find(range => range.value === selectedTimeRange)?.label || ''}
              onSelect={(label: string) => {
                const range = timeRanges.find(r => r.label === label);
                if (range) {
                  setSelectedTimeRange(range.value);
                }
              }}
              className="w-32 h-9"
            />
            <button className="flex items-center space-x-2 h-9 px-4 bg-[#FAF7F6] text-[#111013] hover:bg-[#F3F3F4] transition-colors rounded-lg">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Content Analyzed</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Brand Consistency Score</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Content Types</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trained AI Agents</p>
                  <p className="text-2xl font-bold text-gray-900">10</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 15 Key Dimensions Grid */}
        <div className="mb-8">
          <div 
            className="flex items-center justify-between mb-6 cursor-pointer select-none"
            onClick={() => setIsDimensionsExpanded(!isDimensionsExpanded)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold text-gray-900">15 Key Brand DNA Dimensions</h3>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDimensionsExpanded ? 'transform rotate-180' : ''}`} />
            </div>
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-300 ${
            isDimensionsExpanded ? 'opacity-100 max-h-[5000px]' : 'opacity-0 max-h-0 overflow-hidden'
          }`}>
            {BRAND_DIMENSIONS.map(dimension => {
              const IconComponent = getIcon(dimension.icon);
              
              return (
                <div key={dimension.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all duration-200">
                  <div className="p-5">
                    <div className="flex items-center space-x-2">
                      {IconComponent && <IconComponent className="w-5 h-5 text-gray-700" />}
                      <h3 className="font-semibold text-gray-900">{dimension.title}</h3>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 bg-gray-50/50">
                    <div className="p-5">
                      {dimension.id === 'tone-voice' && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Overall Dominant Tones</h4>
                            <div className="space-y-2">
                              {dimension.data.dominant.map((tone: Tone, index: number) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-2.5 h-2.5 ${tone.color} rounded-full`}></div>
                                    <span className="text-sm text-gray-600">{tone.label}</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="w-24 bg-gray-200 rounded-full h-1.5">
                                      <div className={`${tone.color} h-1.5 rounded-full`} style={{ width: `${tone.value}%` }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-8">{tone.value}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-1">Formality Score</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold text-gray-900">{dimension.data.formality.score}</span>
                                <span className="text-sm text-gray-500">/ 1.0</span>
                                {getTrendIcon(dimension.data.formality.trend)}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-1">Pronoun Usage</h4>
                              <div className="text-sm text-gray-600">
                                "we": {dimension.data.pronouns.we}%, "you": {dimension.data.pronouns.you}%
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {dimension.id === 'stylistic' && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Top Style Elements</h4>
                          <div className="space-y-3">
                            {dimension.data.elements.map((element: Element, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{element.type}</span>
                                <div className="flex items-center space-x-3">
                                  <span className="text-xs text-gray-500">{element.per1000}/1k words</span>
                                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${element.frequency}%` }}></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 w-8">{element.frequency}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Keep similar pattern for other dimension types */}
                      {!['tone-voice', 'stylistic'].includes(dimension.id) && renderDimensionDetails(dimension)}
                    </div>

                    <div className="px-5 py-3 border-t border-gray-200 bg-white">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                        <span>View detailed analysis</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Tone Distribution</h3>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                data={toneDistributionData}
                type="pie"
                onSliceClick={handleChartSliceClick}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Content Strategy CTAs</h3>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                data={[
                  { label: 'Learn More', value: 35, color: 'bg-blue-500' },
                  { label: 'Get Started', value: 28, color: 'bg-green-500' },
                  { label: 'Contact Us', value: 22, color: 'bg-purple-500' },
                  { label: 'Schedule Demo', value: 15, color: 'bg-orange-500' }
                ]}
                type="bar"
                onSliceClick={handleChartSliceClick}
              />
            </CardContent>
          </Card>
        </div>

        {/* Brand Drift Analysis */}
        <div className="mb-8">
          <BrandDriftAnalysis />
        </div>

        {/* Action Recommendations */}
        <div className="mb-8">
          <ActionRecommendations />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Generate Brand Report</p>
                  <p className="text-xs text-gray-500">Export comprehensive brand DNA analysis</p>
                </div>
              </button>
              <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left">
                <Users className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Train New Agent</p>
                  <p className="text-xs text-gray-500">Create AI agent from brand patterns</p>
                </div>
              </button>
              <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-left">
                <Calendar className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Schedule Analysis</p>
                  <p className="text-xs text-gray-500">Set up automated brand monitoring</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};