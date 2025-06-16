import React from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { commonStyles } from '../../../styles/common';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
  showIcon?: boolean;
}

const variants = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: <Info className="w-5 h-5 text-blue-500" />
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: <CheckCircle className="w-5 h-5 text-green-500" />
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: <AlertCircle className="w-5 h-5 text-red-500" />
  }
};

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  onClose,
  className = '',
  showIcon = true
}) => {
  const variantStyles = variants[variant];

  return (
    <div
      className={`
        border p-4
        ${variantStyles.bg}
        ${variantStyles.border}
        ${variantStyles.text}
        ${className}
      `}
      role="alert"
    >
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            {variantStyles.icon}
          </div>
        )}
        <div className={`flex-1 ${showIcon ? 'ml-3' : ''}`}>
          {title && (
            <h3 className={`${commonStyles.text.base} font-medium mb-1`}>
              {title}
            </h3>
          )}
          <div className={commonStyles.text.base}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`
              ml-4 flex-shrink-0
              hover:bg-black hover:bg-opacity-10
              p-1
            `}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}; 