import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { BRAND_DIMENSIONS } from '../../data/brandDimensions';
import { CONTENT_FOLDERS } from '../../data/constants';
import { getIcon } from '../../utils/iconMap';
import { Dropdown } from '../common/Dropdown/Dropdown';
import { Bot } from 'lucide-react';

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

interface DimensionData {
  rule: string;
  dominant?: Tone[];
  elements?: Element[];
  flows?: Flow[];
  avgSections?: number;
  topCTAs?: CTA[];
  formality?: { score: number };
  pronouns?: { you: number };
  sentenceLength?: number;
  passiveVoice?: number;
  readabilityGrade?: string;
  mentions?: Mention[];
}

interface Dimension {
  id: string;
  title: string;
  icon: string;
  color: string;
  data: DimensionData;
}

export const FolderLevelInsights: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState('Technical Blogs');
  const [selectedDimension, setSelectedDimension] = useState('tone-voice');

  const currentInsights: Dimension[] = BRAND_DIMENSIONS;
  const currentDimension = currentInsights.find(i => i.id === selectedDimension);

  const toggleDimension = (dimensionId: string) => {
    setSelectedDimension(dimensionId);
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
          <div className="p-8 max-w-5xl mx-auto">
            <div className="space-y-8">
              {/* Header */}
              <div className="flex-shrink-0 bg-white border-b border-gray-200 -mx-8 -mt-8">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {getIcon(currentDimension.icon) && 
                      React.createElement(getIcon(currentDimension.icon), { 
                        className: "w-5 h-5 text-gray-700" 
                      })
                    }
                    <h2 className="text-lg font-semibold text-gray-900">{currentDimension.title}</h2>
                  </div>
                  <button className="flex items-center space-x-2 h-9 px-4 bg-[#111013] text-white hover:bg-[#2A2A2D] transition-colors rounded-lg">
                    <Bot className="w-4 h-4" />
                    <span>Train Agent</span>
                  </button>
                </div>
              </div>

              {/* Rule Preview */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Extracted Rule</h3>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg p-4 border border-blue-100">
                    <p className="text-gray-900">{currentDimension.data.rule}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Charts and Data */}
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Distribution</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    {currentDimension.id === 'tone-voice' && currentDimension.data.dominant && (
                      <div className="space-y-4">
                        {currentDimension.data.dominant.map((tone: Tone, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 ${tone.color} rounded-full`}></div>
                              <span className="text-sm text-gray-600">{tone.label}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className={`${tone.color} h-2 rounded-full w-[${tone.value}%]`}></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 w-8">{tone.value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {currentDimension.id === 'stylistic' && currentDimension.data.elements && (
                      <div className="space-y-3">
                        {currentDimension.data.elements.map((element: Element, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{element.type}</span>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500">{element.per1000}/1000 words</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full w-[${element.frequency}%]"></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900 w-8">{element.frequency}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {currentDimension.id === 'structural' && currentDimension.data.flows && (
                      <div className="space-y-3">
                        {currentDimension.data.flows.map((flow: Flow, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{flow.pattern}</span>
                            <span className="text-sm font-medium text-gray-900">{flow.frequency}%</span>
                          </div>
                        ))}
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Average Sections</span>
                            <span className="text-sm font-medium text-gray-900">{currentDimension.data.avgSections}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentDimension.id === 'content-strategy' && currentDimension.data.topCTAs && (
                      <div className="space-y-3">
                        {currentDimension.data.topCTAs.map((cta: CTA, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">"{cta.text}"</span>
                            <span className="text-sm font-medium text-gray-900">{cta.count} uses</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {!['tone-voice', 'stylistic', 'structural', 'content-strategy'].includes(currentDimension.id) && (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {React.createElement(getIcon(currentDimension.icon), { className: "w-6 h-6 text-gray-400" })}
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Detailed Analysis</h4>
                        <p className="text-gray-500">Comprehensive insights for {currentDimension.title}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Metrics */}
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {currentDimension.id === 'tone-voice' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Formality Score</span>
                            <span className="text-sm font-medium text-gray-900">{currentDimension.data.formality?.score}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Pronoun Usage</span>
                            <span className="text-sm font-medium text-gray-900">
                              "you": {currentDimension.data.pronouns?.you}%
                            </span>
                          </div>
                        </>
                      )}

                      {currentDimension.id === 'linguistic' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Avg Sentence Length</span>
                            <span className="text-sm font-medium text-gray-900">{currentDimension.data.sentenceLength} words</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Passive Voice</span>
                            <span className="text-sm font-medium text-gray-900">{currentDimension.data.passiveVoice}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Readability Grade</span>
                            <span className="text-sm font-medium text-gray-900">{currentDimension.data.readabilityGrade}</span>
                          </div>
                        </>
                      )}

                      {currentDimension.id === 'persona-signals' && currentDimension.data.mentions && (
                        <>
                          {currentDimension.data.mentions.map((mention: Mention, index: number) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-sm text-gray-600">{mention.role}</span>
                              <span className="text-sm font-medium text-gray-900">{mention.frequency}%</span>
                            </div>
                          ))}
                        </>
                      )}

                      {!['tone-voice', 'linguistic', 'persona-signals'].includes(currentDimension.id) && (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">Metrics available for this dimension</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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