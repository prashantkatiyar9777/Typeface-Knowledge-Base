import React, { useState } from 'react';
import { X, FileText, Target, MessageSquare, Users, CheckCircle, Edit3, Save, Plus, Trash2 } from 'lucide-react';
import { Category } from '../types';
import { BRAND_DIMENSIONS } from '../data/brandDimensions';

interface ExtractionGuidelinesModalProps {
  category: Category;
  onClose: () => void;
}

interface ExtractionGuideline {
  id: string;
  title: string;
  whatToExtract: string;
  whereToLook: string;
  howToExtract: string;
  whatToAvoid: string;
  examples: string[];
  suggestedLabels: string[];
  isEditing?: boolean;
}

const ExtractionGuidelinesModal: React.FC<ExtractionGuidelinesModalProps> = ({
  category,
  onClose
}) => {
  const [editingGuidelines, setEditingGuidelines] = useState<Record<string, boolean>>({});
  const [guidelines, setGuidelines] = useState<ExtractionGuideline[]>(() => {
    // Generate guidelines based on category and brand dimensions
    return BRAND_DIMENSIONS.map(dimension => ({
      id: dimension.id,
      title: dimension.title,
      whatToExtract: getWhatToExtract(category.name, dimension.id),
      whereToLook: getWhereToLook(category.name, dimension.id),
      howToExtract: getHowToExtract(category.name, dimension.id),
      whatToAvoid: getWhatToAvoid(category.name, dimension.id),
      examples: getExamples(category.name, dimension.id),
      suggestedLabels: getSuggestedLabels(category.name, dimension.id)
    }));
  });

  const toggleEdit = (guidelineId: string) => {
    setEditingGuidelines(prev => ({
      ...prev,
      [guidelineId]: !prev[guidelineId]
    }));
  };

  const updateGuideline = (guidelineId: string, field: keyof ExtractionGuideline, value: string | string[]) => {
    setGuidelines(prev => prev.map(guideline => 
      guideline.id === guidelineId 
        ? { ...guideline, [field]: value }
        : guideline
    ));
  };

  const addExample = (guidelineId: string) => {
    setGuidelines(prev => prev.map(guideline => 
      guideline.id === guidelineId 
        ? { ...guideline, examples: [...guideline.examples, ''] }
        : guideline
    ));
  };

  const removeExample = (guidelineId: string, index: number) => {
    setGuidelines(prev => prev.map(guideline => 
      guideline.id === guidelineId 
        ? { ...guideline, examples: guideline.examples.filter((_, i) => i !== index) }
        : guideline
    ));
  };

  const updateExample = (guidelineId: string, index: number, value: string) => {
    setGuidelines(prev => prev.map(guideline => 
      guideline.id === guidelineId 
        ? { 
            ...guideline, 
            examples: guideline.examples.map((example, i) => i === index ? value : example)
          }
        : guideline
    ));
  };

  const addLabel = (guidelineId: string) => {
    setGuidelines(prev => prev.map(guideline => 
      guideline.id === guidelineId 
        ? { ...guideline, suggestedLabels: [...guideline.suggestedLabels, ''] }
        : guideline
    ));
  };

  const removeLabel = (guidelineId: string, index: number) => {
    setGuidelines(prev => prev.map(guideline => 
      guideline.id === guidelineId 
        ? { ...guideline, suggestedLabels: guideline.suggestedLabels.filter((_, i) => i !== index) }
        : guideline
    ));
  };

  const updateLabel = (guidelineId: string, index: number, value: string) => {
    setGuidelines(prev => prev.map(guideline => 
      guideline.id === guidelineId 
        ? { 
            ...guideline, 
            suggestedLabels: guideline.suggestedLabels.map((label, i) => i === index ? value : label)
          }
        : guideline
    ));
  };

  const saveGuidelines = () => {
    // Here you would save the guidelines to your backend
    console.log('Saving guidelines:', guidelines);
    setEditingGuidelines({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Extraction Guidelines</h2>
              <p className="text-sm text-gray-500">{category.name} - 15 Brand Dimensions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-[#111013]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Overview */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Extraction Guidelines for {category.name}</h3>
              <p className="text-sm text-blue-800">
                These guidelines define how AI agents should extract and analyze content patterns from {category.name}. 
                Each dimension has specific rules for what to extract, where to look, and how to process the information.
              </p>
            </div>

            {/* Guidelines Table */}
            <div className="space-y-6">
              {guidelines.map((guideline) => {
                const isEditing = editingGuidelines[guideline.id];
                const dimension = BRAND_DIMENSIONS.find(d => d.id === guideline.id);
                
                return (
                  <div key={guideline.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${dimension?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center`}>
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">{guideline.title}</h4>
                      </div>
                      <button
                        onClick={() => toggleEdit(guideline.id)}
                        className="flex items-center space-x-2 px-3 py-1 text-sm bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* What to Extract */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">What to Extract</label>
                          {isEditing ? (
                            <textarea
                              value={guideline.whatToExtract}
                              onChange={(e) => updateGuideline(guideline.id, 'whatToExtract', e.target.value)}
                              className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="Describe what specific elements to extract..."
                            />
                          ) : (
                            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{guideline.whatToExtract}</p>
                          )}
                        </div>

                        {/* Where to Look */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Where to Look</label>
                          {isEditing ? (
                            <textarea
                              value={guideline.whereToLook}
                              onChange={(e) => updateGuideline(guideline.id, 'whereToLook', e.target.value)}
                              className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="Specify where in the content to look..."
                            />
                          ) : (
                            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{guideline.whereToLook}</p>
                          )}
                        </div>

                        {/* How to Extract */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">How to Extract - Rules and Patterns</label>
                          {isEditing ? (
                            <textarea
                              value={guideline.howToExtract}
                              onChange={(e) => updateGuideline(guideline.id, 'howToExtract', e.target.value)}
                              className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="Define the extraction rules and patterns..."
                            />
                          ) : (
                            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{guideline.howToExtract}</p>
                          )}
                        </div>

                        {/* What to Avoid */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">What to Avoid</label>
                          {isEditing ? (
                            <textarea
                              value={guideline.whatToAvoid}
                              onChange={(e) => updateGuideline(guideline.id, 'whatToAvoid', e.target.value)}
                              className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="List what should be avoided during extraction..."
                            />
                          ) : (
                            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{guideline.whatToAvoid}</p>
                          )}
                        </div>
                      </div>

                      {/* Examples from Brand Content */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">Examples from Brand Content</label>
                          {isEditing && (
                            <button
                              onClick={() => addExample(guideline.id)}
                              className="flex items-center space-x-1 px-2 py-1 text-xs bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Example</span>
                            </button>
                          )}
                        </div>
                        <div className="space-y-2">
                          {guideline.examples.map((example, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              {isEditing ? (
                                <>
                                  <input
                                    type="text"
                                    value={example}
                                    onChange={(e) => updateExample(guideline.id, index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Enter example..."
                                  />
                                  <button
                                    onClick={() => removeExample(guideline.id, index)}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              ) : (
                                <div className="flex items-center space-x-2 text-sm text-gray-700">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <span>{example}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Suggested Labels */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">Suggested Labels</label>
                          {isEditing && (
                            <button
                              onClick={() => addLabel(guideline.id)}
                              className="flex items-center space-x-1 px-2 py-1 text-xs bg-[#F3F3F4] text-[#111013] hover:bg-[#E9E9EA] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Label</span>
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {guideline.suggestedLabels.map((label, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              {isEditing ? (
                                <div className="flex items-center space-x-1">
                                  <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => updateLabel(guideline.id, index, e.target.value)}
                                    className="px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Label..."
                                  />
                                  <button
                                    onClick={() => removeLabel(guideline.id, index)}
                                    className="p-0.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                  >
                                    <X className="w-2 h-2" />
                                  </button>
                                </div>
                              ) : (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {label}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Best Practices */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-sm font-medium text-green-900 mb-3">💡 Best Practices for {category.name}</h4>
              <ul className="text-xs text-green-800 space-y-2">
                <li>• Upload multiple examples of the same content type for better pattern recognition</li>
                <li>• Include both high-performing and standard content for comprehensive analysis</li>
                <li>• Ensure files are well-formatted with clear headings and structure</li>
                <li>• Review extracted patterns regularly and provide feedback for improvements</li>
                <li>• Customize extraction guidelines based on your specific brand voice and style</li>
                <li>• Test guidelines with sample content before applying to large datasets</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()} • {guidelines.length} dimensions configured
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                saveGuidelines();
                onClose();
              }}
              className="px-4 py-2 bg-[#FAF7F6] text-[#111013] hover:bg-[#F3F3F4] transition-colors"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions to generate content based on category and dimension
function getWhatToExtract(categoryName: string, dimensionId: string): string {
  const extractionMap: Record<string, Record<string, string>> = {
    'Technical Blogs': {
      'tone-voice': 'Technical authority, educational tone, use of "we" vs "you", formality level, confidence indicators',
      'stylistic': 'Code blocks, technical diagrams, bullet points for features, numbered steps, syntax highlighting',
      'structural': 'Problem→Solution→Implementation flow, prerequisites sections, code examples placement',
      'linguistic': 'Technical jargon density, sentence complexity, passive vs active voice, readability for developers',
      'content-strategy': 'Documentation links, demo CTAs, GitHub references, API endpoint mentions',
      'domain-specific': 'Programming languages, frameworks, technical terminology, version numbers, compatibility notes'
    },
    'Marketing Blogs': {
      'tone-voice': 'Persuasive tone, storytelling voice, use of narrative hooks, emotional triggers, urgency indicators',
      'stylistic': 'Use of visuals, infographics, pull quotes, formatting styles, call-out boxes',
      'structural': 'Narrative arc: Hook → Challenge → Solution → CTA, story-driven flow',
      'linguistic': 'Use of power verbs, industry jargon, metaphors, analogies, persuasive language patterns',
      'content-strategy': 'References to broader campaign themes, cross-links to landing pages, lead magnets',
      'domain-specific': 'Use of approved marketing taglines, restricted claims compliance, brand voice consistency'
    }
  };

  return extractionMap[categoryName]?.[dimensionId] || 'Content-specific extraction patterns for this dimension';
}

function getWhereToLook(categoryName: string, dimensionId: string): string {
  const locationMap: Record<string, Record<string, string>> = {
    'Technical Blogs': {
      'tone-voice': 'Intro paragraphs, CTAs, headers, transitions between sections, conclusion statements',
      'stylistic': 'HTML/CSS classes, markdown indicators, layout structure, code block formatting',
      'structural': 'Paragraph flow, transitions, anchor text to sections, heading hierarchy',
      'linguistic': 'Body content, headlines, CTA blocks, technical explanations',
      'content-strategy': 'Internal linking graph, content series references, campaign attribution',
      'domain-specific': 'Style guide citations, CTA sections, claim sentences, disclaimer areas'
    },
    'Marketing Blogs': {
      'tone-voice': 'Intro paragraphs, CTAs, headers, transitions, emotional hooks',
      'stylistic': 'HTML/CSS classes, markdown indicators, layout structure, visual elements',
      'structural': 'Paragraph flow, transitions, anchor text to sections, narrative progression',
      'linguistic': 'Body content, headlines, CTA blocks, persuasive copy',
      'content-strategy': 'Internal linking graph, content series references, campaign themes',
      'domain-specific': 'Style guide citations, CTA sections, claim sentences, compliance areas'
    }
  };

  return locationMap[categoryName]?.[dimensionId] || 'Specific content locations for this dimension';
}

function getHowToExtract(categoryName: string, dimensionId: string): string {
  const methodMap: Record<string, Record<string, string>> = {
    'Technical Blogs': {
      'tone-voice': 'Analyze pronoun usage patterns, measure formality scores, identify confidence markers, assess technical authority',
      'stylistic': 'Count code blocks per 1000 words, identify formatting patterns, measure visual element density',
      'structural': 'Map content flow patterns, identify section types, measure transition effectiveness',
      'linguistic': 'Calculate technical term density, measure sentence complexity, assess readability scores',
      'content-strategy': 'Extract internal link patterns, identify CTA types, map content relationships',
      'domain-specific': 'Match against approved terminology lists, validate technical accuracy, check compliance'
    },
    'Marketing Blogs': {
      'tone-voice': 'Analyze emotional triggers, measure persuasive language density, identify storytelling elements',
      'stylistic': 'Count visual elements, identify formatting patterns, measure engagement indicators',
      'structural': 'Map narrative flow, identify hook effectiveness, measure CTA placement',
      'linguistic': 'Analyze power verb usage, measure metaphor density, assess persuasive patterns',
      'content-strategy': 'Extract campaign references, identify cross-promotional elements, map funnel progression',
      'domain-specific': 'Validate brand voice consistency, check claim compliance, verify tagline usage'
    }
  };

  return methodMap[categoryName]?.[dimensionId] || 'Extraction methodology for this dimension';
}

function getWhatToAvoid(categoryName: string, dimensionId: string): string {
  const avoidanceMap: Record<string, Record<string, string>> = {
    'Technical Blogs': {
      'tone-voice': 'Overly casual language, marketing speak in technical sections, inconsistent authority levels',
      'stylistic': 'Inconsistent code formatting, missing syntax highlighting, poor visual hierarchy',
      'structural': 'Jumping between topics, missing prerequisites, unclear implementation steps',
      'linguistic': 'Unexplained jargon, overly complex sentences, passive voice overuse',
      'content-strategy': 'Broken internal links, missing documentation references, weak CTAs',
      'domain-specific': 'Outdated technical information, unsupported claims, version conflicts'
    },
    'Marketing Blogs': {
      'tone-voice': 'Overly salesy buzzwords, clickbait titles, all-caps headlines, excessive urgency',
      'stylistic': 'Inconsistent formatting, CTA sections, paragraph tone, poor visual balance',
      'structural': 'Weak hooks, unclear value propositions, missing social proof, buried CTAs',
      'linguistic': 'Overuse of superlatives, complex jargon, passive voice, weak verbs',
      'content-strategy': 'Disconnected campaigns, missing attribution, weak cross-references',
      'domain-specific': 'Unsubstantiated claims, trademark violations, compliance violations'
    }
  };

  return avoidanceMap[categoryName]?.[dimensionId] || 'Common pitfalls to avoid for this dimension';
}

function getExamples(categoryName: string, dimensionId: string): string[] {
  const exampleMap: Record<string, Record<string, string[]>> = {
    'Technical Blogs': {
      'tone-voice': [
        '"Our team has extensively tested this approach..."',
        '"You can implement this solution by following these steps..."',
        '"This method provides reliable results in production environments..."'
      ],
      'stylistic': [
        'Code blocks with syntax highlighting',
        'Numbered implementation steps',
        'Technical diagrams and flowcharts'
      ],
      'structural': [
        'Problem statement → Technical analysis → Implementation → Results',
        'Prerequisites → Setup → Configuration → Testing → Deployment'
      ]
    },
    'Marketing Blogs': {
      'tone-voice': [
        '"Imagine transforming your business in just 30 days..."',
        '"Our clients consistently see 40% improvement..."',
        '"Don\'t let your competitors get ahead..."'
      ],
      'stylistic': [
        'Pull quotes from customer testimonials',
        'Infographics showing statistics',
        'Call-out boxes with key benefits'
      ],
      'structural': [
        'Hook → Problem → Solution → Social proof → CTA',
        'Story → Challenge → Transformation → Results → Next steps'
      ]
    }
  };

  return exampleMap[categoryName]?.[dimensionId] || ['Example content for this dimension'];
}

function getSuggestedLabels(categoryName: string, dimensionId: string): string[] {
  const labelMap: Record<string, Record<string, string[]>> = {
    'Technical Blogs': {
      'tone-voice': ['authoritative', 'educational', 'technical', 'professional', 'helpful'],
      'stylistic': ['code-heavy', 'visual', 'structured', 'detailed', 'technical'],
      'structural': ['problem-solution', 'tutorial', 'implementation-focused', 'step-by-step']
    },
    'Marketing Blogs': {
      'tone-voice': ['persuasive', 'engaging', 'story-driven', 'emotional', 'compelling'],
      'stylistic': ['visual-rich', 'quote-heavy', 'formatted', 'engaging', 'branded'],
      'structural': ['narrative', 'hook-driven', 'benefit-focused', 'cta-optimized']
    }
  };

  return labelMap[categoryName]?.[dimensionId] || ['dimension-label', 'content-type', 'brand-voice'];
}

export default ExtractionGuidelinesModal;