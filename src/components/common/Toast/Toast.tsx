import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { commonStyles } from '../../../styles/common';

interface ToastProps {
  type?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
  className?: string;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />
};

const backgrounds = {
  success: 'bg-green-50 border-green-100',
  error: 'bg-red-50 border-red-100',
  info: 'bg-blue-50 border-blue-100',
  warning: 'bg-yellow-50 border-yellow-100'
};

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = ''
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`
        flex items-start p-4 border
        ${backgrounds[type]}
        ${className}
      `}
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      
      <div className="ml-3 flex-1">
        <p className={`${commonStyles.text.base} font-medium text-gray-900`}>
          {title}
        </p>
        {message && (
          <p className={`mt-1 ${commonStyles.text.base} text-gray-600`}>
            {message}
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}; 