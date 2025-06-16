import React from 'react';
import { ChevronDown, ChevronRight, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { getIcon } from '../../../utils/iconMap';
import { BrandDimension } from '../../../data/brandDimensions';

interface DimensionCardProps {
  dimension: BrandDimension;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DimensionCard: React.FC<DimensionCardProps> = ({ dimension, isExpanded, onToggle }) => {
  const IconComponent = getIcon(dimension.icon);
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDown className="w-3 h-3 text-red-500" />;
      default: return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getSummaryText = () => {
    switch (dimension.id) {
      case 'tone-voice': return `${dimension.data.dominant[0].value}% ${dimension.data.dominant[0].label}`;
      case 'stylistic': return `${dimension.data.elements[0].frequency}% use ${dimension.data.elements[0].type.toLowerCase()}`;
      case 'structural': return `${dimension.data.flows[0].frequency}% follow ${dimension.data.flows[0].pattern}`;
      case 'linguistic': return `Avg ${dimension.data.sentenceLength} words/sentence`;
      case 'content-strategy': return `${dimension.data.topCTAs[0].count} "${dimension.data.topCTAs[0].text}" CTAs`;
      case 'domain-specific': return `${dimension.data.brandTerms.length} key brand terms`;
      case 'behavioral': return `${(dimension.data.avgScrollDepth * 100).toFixed(0)}% avg scroll depth`;
      case 'persona-signals': return `${dimension.data.mentions[0].frequency}% target ${dimension.data.mentions[0].role.toLowerCase()}`;
      case 'emotional': return `${dimension.data.emotions[0].mix}% ${dimension.data.emotions[0].type.toLowerCase()}`;
      case 'media-assets': return `${dimension.data.formats[0].percentage}% use ${dimension.data.formats[0].type.toLowerCase()}`;
      case 'localization': return `${dimension.data.coverage[0].percentage}% ${dimension.data.coverage[0].language}`;
      case 'tagging': return `${dimension.data.topTags.length} primary tag categories`;
      case 'repetition': return `${dimension.data.phrases.length} common phrases identified`;
      case 'style-violations': return `${dimension.data.violations.reduce((sum: number, v: any) => sum + v.percentage, 0)}% total violations`;
      case 'compliance': return `${Math.round(dimension.data.coverage.reduce((sum: number, c: any) => sum + c.percentage, 0) / dimension.data.coverage.length)}% avg compliance`;
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full text-left p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${dimension.color} rounded-xl flex items-center justify-center shadow-sm`}>
              {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{dimension.title}</h3>
              <p className="text-sm text-gray-500">{getSummaryText()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {dimension.data.formality?.trend && getTrendIcon(dimension.data.formality.trend)}
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 p-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Extracted Rule</h4>
            <p className="text-sm text-blue-800">{dimension.data.rule}</p>
          </div>

          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View detailed analysis →
          </button>
        </div>
      )}
    </div>
  );
};