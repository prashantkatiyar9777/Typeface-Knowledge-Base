import React from 'react';
import { X } from 'lucide-react';
import { commonStyles } from '../../../styles/common';

interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
}

const variants = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  primary: 'bg-blue-100 text-blue-800 border-blue-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200'
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm'
};

export const Tag: React.FC<TagProps> = ({
  children,
  onRemove,
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false
}) => {
  return (
    <div
      className={`
        inline-flex items-center border
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${commonStyles.fontFamily}
        ${className}
      `}
    >
      <span className="font-medium">{children}</span>
      {onRemove && !disabled && (
        <button
          onClick={onRemove}
          className={`
            ml-1.5 p-0.5
            hover:bg-black hover:bg-opacity-10
            text-current opacity-60 hover:opacity-100
            transition-opacity
          `}
        >
          <X className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        </button>
      )}
    </div>
  );
}; 