import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { BRAND_DIMENSIONS } from '../../data/brandDimensions';
import { CONTENT_FOLDERS } from '../../data/constants';
import { getIcon } from '../../utils/iconMap';
import { Dropdown } from '../common/Dropdown/Dropdown';
import { Bot, BarChart2, Clock, Users, AlertTriangle, FileText, Activity } from 'lucide-react';
import { BrandDimension } from '../../data/brandDimensions';

type Dimension = BrandDimension;

export const FolderLevelInsights: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState('Technical Blogs');
  const [selectedDimension, setSelectedDimension] = useState('tone-voice');

  const currentInsights: Dimension[] = BRAND_DIMENSIONS;
  const currentDimension = currentInsights.find(i => i.id === selectedDimension);

  const toggleDimension = (dimensionId: string) => {
    setSelectedDimension(dimensionId);
  };

  const getDistributionData = (dimension: Dimension) => {
    switch (dimension.id) {
      case 'tone-voice':
        return dimension.data.dominant?.map(tone => ({
          label: tone.label,
          value: tone.value,
          color: tone.color
        }));
      case 'stylistic':
        return dimension.data.elements?.map(element => ({
          label: element.type,
          value: element.frequency,
          color: 'bg-blue-500'
        }));
      case 'structural':
        return dimension.data.flows?.map(flow => ({
          label: flow.pattern,
          value: flow.frequency,
          color: 'bg-purple-500'
        }));
      case 'domain-specific':
        return dimension.data.brandTerms?.map(term => ({
          label: term.term,
          value: term.count,
          color: 'bg-green-500'
        }));
      default:
        return [];
    }
  };

  const getMetricsData = (dimension: Dimension) => {
    const metrics = [];
    
    if (dimension.data.formality) {
      metrics.push({ label: 'Formality Score', value: `${(dimension.data.formality.score * 100).toFixed(0)}%` });
    }
    
    if (dimension.data.passiveVoice) {
      metrics.push({ label: 'Passive Voice', value: `${dimension.data.passiveVoice}%` });
    }
    
    if (dimension.data.pronouns) {
      metrics.push({ label: 'You Usage', value: `${dimension.data.pronouns.you}%` });
      metrics.push({ label: 'We Usage', value: `${dimension.data.pronouns.we}%` });
    }
    
    if (dimension.data.performanceMetrics) {
      metrics.push(
        { label: 'CTR', value: `${dimension.data.performanceMetrics.ctr}%` },
        { label: 'Dwell Time', value: `${dimension.data.performanceMetrics.dwellTime}s` },
        { label: 'Conversion', value: `${dimension.data.performanceMetrics.conversionRate}%` }
      );
    }

    return metrics;
  };

  const renderRuleCard = (dimension: Dimension) => {
    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Extracted Rule</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Auto-Generated</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-1 self-stretch bg-blue-500 rounded-full flex-shrink-0" />
            <p className="text-sm text-gray-600 leading-relaxed">{dimension.data.rule}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderExamplesCard = (dimension: Dimension) => {
    if (!dimension.data.examples) return null;

    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Examples</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
              Top {dimension.data.examples.length} matches
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {dimension.data.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 truncate max-w-[60%]">{example.context}</span>
                  <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full">
                    {example.score}% Match
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">{example.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderDeviationsCard = (dimension: Dimension) => {
    if (!dimension.data.styleViolations) return null;

    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Deviations Detected</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
              {dimension.data.styleViolations.length} issues found
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {dimension.data.styleViolations.map((violation, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[60%]">{violation.type}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    violation.severity === 'critical' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {violation.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Found {violation.count} instances</span>
                  <span className={`text-xs ${
                    violation.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {violation.severity === 'critical' ? 'Needs attention' : 'Monitor'}
                  </span>
                </div>
                {violation.examples.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs font-medium mb-1">Example:</p>
                    <p className="text-xs italic text-gray-600">{violation.examples[0]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderDistributionCard = (dimension: Dimension) => {
    const distributionData = getDistributionData(dimension);

    return (
      <Card className="h-[400px] hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Distribution</h3>
            </div>
            {dimension.data.performanceMetrics && (
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                  {dimension.data.performanceMetrics.engagement}% Engagement
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 overflow-y-auto flex-1">
          <div className="space-y-3">
            {distributionData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-[120px] max-w-[200px]">
                  <div className={`w-2 h-2 ${item.color} rounded-full flex-shrink-0`}></div>
                  <span className="text-sm text-gray-600 truncate">{item.label}</span>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <div className="w-24 bg-gray-200 rounded-full h-1.5">
                    <div className={`${item.color} h-1.5 rounded-full transition-all duration-300`} style={{ width: `${item.value}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderMetricsCard = (dimension: Dimension) => {
    const metricsData = getMetricsData(dimension);

    return (
      <Card className="h-[400px] hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
            </div>
            {dimension.data.performanceMetrics && (
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
                  {dimension.data.performanceMetrics.ctr}% CTR
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metricsData?.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600 mb-1 truncate">{metric.label}</div>
                <div className="text-base font-semibold text-gray-900">{metric.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderTimelineCard = (dimension: Dimension) => {
    if (!dimension.data.timeline) return null;

    return (
      <Card className="h-[300px] hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Evolution Over Time</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
              Last 3 months
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 overflow-y-auto flex-1">
          <div className="space-y-3">
            {dimension.data.timeline.map((point, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-20 truncate">{point.date}</span>
                <div className="flex items-center space-x-3 flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${point.value}%` }}></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12 text-right">{point.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAudienceFitCard = (dimension: Dimension) => {
    if (!dimension.data.audienceMatch) return null;

    return (
      <Card className="h-[300px] hover:shadow-md transition-shadow duration-200">
        <CardHeader className="border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Audience Fit</h3>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
              {dimension.data.audienceMatch.length} Personas
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 overflow-y-auto flex-1">
          <div className="space-y-3">
            {dimension.data.audienceMatch.map((match, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 truncate max-w-[40%]">{match.persona}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#111013] h-1.5 rounded-full" style={{ width: `${match.score}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{match.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-gray-50">
      {/* Left Panel - Dropdown and Dimensions List */}
      <div className="w-80 bg-white shadow-sm flex-shrink-0 fixed h-full overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-6 space-y-4 flex-shrink-0">
            {/* Folder Selector */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 mb-2">Select Folder</label>
              <div className="w-full">
                <Dropdown
                  options={CONTENT_FOLDERS}
                  selectedOption={selectedFolder}
                  onSelect={(folder: string) => setSelectedFolder(folder)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Dimensions List Header */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Select Brand Dimensions</h3>
            </div>
          </div>

          {/* Scrollable Dimensions List */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 space-y-2 pt-2">
              {currentInsights.map((insight: Dimension) => {
                const IconComponent = getIcon(insight.icon);
                const isSelected = selectedDimension === insight.id;

                return (
                  <div key={insight.id} className="relative">
                    <button
                      onClick={() => toggleDimension(insight.id)}
                      className={`w-full flex items-center p-3 text-left rounded-lg transition-all duration-200 ${
                        isSelected 
                          ? 'bg-gray-100 text-gray-900 ring-1 ring-gray-200' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          isSelected ? 'bg-gray-200' : 'bg-gray-100'
                        }`}>
                          {IconComponent && (
                            <IconComponent className={`w-4 h-4 ${
                              isSelected ? 'text-gray-900' : 'text-gray-500'
                            }`} />
                          )}
                        </div>
                        <span className="text-sm font-medium">{insight.title}</span>
                      </div>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Dimension Details */}
      <div className="flex-1 overflow-y-auto ml-80">
        {currentDimension ? (
          <div className="p-6 max-w-[1600px] mx-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {getIcon(currentDimension.icon) && 
                      React.createElement(getIcon(currentDimension.icon), { 
                        className: "w-5 h-5 text-gray-700" 
                      })
                    }
                    <h2 className="text-lg font-semibold text-gray-900 truncate">{currentDimension.title}</h2>
                  </div>
                  <button className="flex items-center space-x-2 h-9 px-4 bg-[#111013] text-white hover:bg-[#2A2A2D] transition-colors rounded-lg text-sm">
                    <Bot className="w-4 h-4" />
                    <span>Train Agent</span>
                  </button>
                </div>
              </div>

              {/* Rule Card */}
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="border-b border-gray-100 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-gray-500" />
                      <h3 className="text-lg font-semibold text-gray-900">Extracted Rule</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Auto-Generated</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-1 self-stretch bg-blue-500 rounded-full flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">{currentDimension.data.rule}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Primary Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  {renderDistributionCard(currentDimension)}
                </div>
                <div className="lg:col-span-4">
                  {renderMetricsCard(currentDimension)}
                </div>
              </div>

              {/* Secondary Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderTimelineCard(currentDimension)}
                {renderAudienceFitCard(currentDimension)}
              </div>

              {/* Tertiary Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentDimension.data.examples && (
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <h3 className="text-lg font-semibold text-gray-900">Examples</h3>
                        </div>
                        <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                          Top {currentDimension.data.examples.length} matches
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {currentDimension.data.examples.map((example, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 truncate max-w-[60%]">{example.context}</span>
                              <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full">
                                {example.score}% Match
                              </span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600">{example.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                {currentDimension.data.styleViolations && (
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-gray-500" />
                          <h3 className="text-lg font-semibold text-gray-900">Deviations Detected</h3>
                        </div>
                        <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                          {currentDimension.data.styleViolations.length} issues found
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {currentDimension.data.styleViolations.map((violation, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900 truncate max-w-[60%]">{violation.type}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                violation.severity === 'critical' 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {violation.severity}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Found {violation.count} instances</span>
                              <span className={`text-xs ${
                                violation.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                              }`}>
                                {violation.severity === 'critical' ? 'Needs attention' : 'Monitor'}
                              </span>
                            </div>
                            {violation.examples.length > 0 && (
                              <div className="bg-gray-50 p-3 rounded">
                                <p className="text-xs font-medium mb-1">Example:</p>
                                <p className="text-xs italic text-gray-600">{violation.examples[0]}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 text-gray-400">
                  {React.createElement(getIcon('document'), { className: "w-8 h-8" })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Dimension</h3>
              <p className="text-gray-500 max-w-sm">Choose a dimension from the left panel to view detailed insights and analytics</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};