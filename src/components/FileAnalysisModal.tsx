import React, { useState } from 'react';
import { X, FileText, Clock, User, Eye, Download, CheckCircle, AlertCircle, BarChart3, Target, MessageSquare, Code, Volume2, Palette, Layers } from 'lucide-react';
import { BRAND_DIMENSIONS } from '../data/brandDimensions';

interface FileAnalysisModalProps {
  file: {
    id: string;
    filename: string;
    status: string;
    uploadedBy: string;
    uploadTime: string;
    size: string;
    type: string;
    analysisTimestamp?: string;
    extractedData?: {
      toneVoice?: string;
      stylistic?: string;
      structure?: string;
      persona?: string;
      cta?: string;
      keywords?: string[];
      compliance?: string;
      wordCount?: number;
      readingTime?: string;
    };
    issues?: string[];
  };
  onClose: () => void;
}

const FileAnalysisModal: React.FC<FileAnalysisModalProps> = ({ file, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions' | 'feedback'>('overview');
  const [dimensionFeedback, setDimensionFeedback] = useState<Record<string, 'accept' | 'reject' | 'edit' | null>>({});

  const { extractedData } = file;

  // Mock keywords for the overview
  const keywords = ['digital transformation', 'retail', 'ROI', 'efficiency'];

  const handleDimensionFeedback = (dimensionId: string, action: 'accept' | 'reject' | 'edit') => {
    setDimensionFeedback(prev => ({
      ...prev,
      [dimensionId]: action
    }));
  };

  const getIconForDimension = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'Volume2': Volume2,
      'Palette': Palette,
      'Layers': Layers,
      'MessageSquare': MessageSquare,
      'Target': Target,
      'Code': Code,
      'BarChart3': BarChart3
    };
    return iconMap[iconName] || MessageSquare;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{file.filename}</h2>
              <p className="text-sm text-gray-500">Analyzed on {file.analysisTimestamp} • Uploaded by {file.uploadedBy}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-[#111013] border-b-2 border-[#111013] bg-[#FAF7F6]'
                : 'text-gray-500 hover:text-[#111013]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('dimensions')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'dimensions'
                ? 'text-[#111013] border-b-2 border-[#111013] bg-[#FAF7F6]'
                : 'text-gray-500 hover:text-[#111013]'
            }`}
          >
            Dimensions
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'feedback'
                ? 'text-[#111013] border-b-2 border-[#111013] bg-[#FAF7F6]'
                : 'text-gray-500 hover:text-[#111013]'
            }`}
          >
            Feedback
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="p-6 space-y-6">
              {/* Header with buttons */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Full Document</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export Results</span>
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Word Count</p>
                      <p className="text-2xl font-bold text-gray-900">{extractedData?.wordCount?.toLocaleString() || '1,847'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 border border-green-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Reading Time</p>
                      <p className="text-2xl font-bold text-gray-900">{extractedData?.readingTime || '7 min'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keywords & Topics */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Keywords & Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div className="p-6 space-y-4">
              {BRAND_DIMENSIONS.slice(0, 3).map((dimension) => {
                const IconComponent = getIconForDimension(dimension.icon);
                const isExpanded = true; // Show all expanded for demo
                
                return (
                  <div key={dimension.id} className="border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${dimension.color} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">{dimension.title}</h4>
                      </div>
                      <button className="p-1 hover:bg-gray-200">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-4 space-y-4">
                        {dimension.id === 'tone-voice' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Detected Tone</span>
                              <span className="text-sm font-medium text-gray-900">Trust-building, measured</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Formality Score</span>
                              <span className="text-sm font-medium text-gray-900">0.78 / 1.0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Pronoun Usage</span>
                              <span className="text-sm font-medium text-gray-900">"we" = 12, "you" = 4</span>
                            </div>
                          </>
                        )}

                        {dimension.id === 'stylistic' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Detected Style Elements</span>
                              <span className="text-sm font-medium text-gray-900">Bullet points, quote blocks</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Bullet Points</span>
                              <span className="text-sm font-medium text-gray-900">5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Blockquotes</span>
                              <span className="text-sm font-medium text-gray-900">2</span>
                            </div>
                          </>
                        )}

                        {dimension.id === 'structural' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Content Structure</span>
                              <span className="text-sm font-medium text-gray-900">Challenge→Solution→Results</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Section Count</span>
                              <span className="text-sm font-medium text-gray-900">5</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="p-6 space-y-6">
              {/* Feedback Header */}
              <div className="bg-blue-50 p-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Provide Feedback</h3>
                <p className="text-sm text-blue-800">Your feedback improves future extractions for this content type.</p>
              </div>

              {/* Feedback for each dimension */}
              <div className="space-y-6">
                {BRAND_DIMENSIONS.slice(0, 2).map((dimension) => {
                  const IconComponent = getIconForDimension(dimension.icon);
                  const feedback = dimensionFeedback[dimension.id];
                  
                  return (
                    <div key={dimension.id} className="border border-gray-200 p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-8 h-8 ${dimension.color} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">{dimension.title}</h4>
                      </div>

                      {dimension.id === 'tone-voice' && (
                        <>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Detected Tone</span>
                              <span className="text-sm font-medium text-gray-900">Trust-building, measured</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Formality Score</span>
                              <span className="text-sm font-medium text-gray-900">0.78 / 1.0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Pronoun Usage</span>
                              <span className="text-sm font-medium text-gray-900">"we" = 12, "you" = 4</span>
                            </div>
                          </div>
                        </>
                      )}

                      {dimension.id === 'stylistic' && (
                        <>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Detected Style Elements</span>
                              <span className="text-sm font-medium text-gray-900">Bullet points, quote blocks</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Bullet Points</span>
                              <span className="text-sm font-medium text-gray-900">5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Blockquotes</span>
                              <span className="text-sm font-medium text-gray-900">2</span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Feedback Buttons */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleDimensionFeedback(dimension.id, 'accept')}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            feedback === 'accept'
                              ? 'bg-[#FAF7F6] text-[#111013]'
                              : 'bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA]'
                          }`}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDimensionFeedback(dimension.id, 'reject')}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            feedback === 'reject'
                              ? 'bg-[#FAF7F6] text-[#111013]'
                              : 'bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA]'
                          }`}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDimensionFeedback(dimension.id, 'edit')}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            feedback === 'edit'
                              ? 'bg-[#FAF7F6] text-[#111013]'
                              : 'bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA]'
                          }`}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#111013] text-[#FAF7F6] hover:bg-[#2A2A2D] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileAnalysisModal;