import React from 'react';
import { commonStyles } from '../../../styles/common';

interface ProgressProps {
  percentage: number;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  percentage,
  variant = 'primary',
  size = 'md',
  showValue = false,
  className = ''
}) => {
  const getWidth = (percentage: number): string => {
    return `w-[${Math.min(Math.max(percentage, 0), 100)}%]`;
  };

  const getHeight = (size: string): string => {
    switch (size) {
      case 'sm': return 'h-1';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };

  const getVariantClasses = (variant: string): string => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-200';
      default:
        return 'bg-[#111013]';
    }
  };

  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${className}`}>
      <div
        className={`${getWidth(percentage)} ${getHeight(size)} ${getVariantClasses(variant)} rounded-full transition-all duration-300 ease-in-out`}
      />
      {showValue && size === 'lg' && (
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            ${commonStyles.text.base} text-white font-medium
          `}
        >
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}; 