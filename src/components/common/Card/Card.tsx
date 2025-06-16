import React from 'react';
import { CardProps } from './Card.types';
import { commonStyles } from '../../../styles/common';

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  className = '',
  bodyClassName = '',
  noPadding = false
}) => {
  return (
    <div className={`bg-white border border-gray-200 ${className}`}>
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div>
            {title && (
              <h3 className={`${commonStyles.text.base} font-medium text-gray-900`}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={`${commonStyles.text.base} text-gray-500`}>
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={`${!noPadding ? 'p-4' : ''} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}; 