import React from 'react';
import { Search } from 'lucide-react';
import { HeaderProps, HeaderActionProps } from './Header.types';
import { commonStyles } from '../../../styles/common';

export const HeaderAction: React.FC<HeaderActionProps> = ({
  icon,
  label,
  onClick,
  variant = 'secondary',
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      inline-flex items-center px-4 py-2 ${commonStyles.text.base}
      ${variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  searchProps
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-2">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.label}>
                  {index > 0 && <span className={`${commonStyles.text.base} text-gray-500`}>/</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className={`${commonStyles.text.base} text-gray-500 hover:text-gray-700`}
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className={`${commonStyles.text.base} text-gray-500`}>{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-semibold text-gray-900 ${commonStyles.fontFamily}`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`mt-1 ${commonStyles.text.base} text-gray-500`}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {searchProps && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchProps.value}
                  onChange={(e) => searchProps.onChange(e.target.value)}
                  placeholder={searchProps.placeholder || 'Search...'}
                  className={`
                    ${commonStyles.input.base}
                    pl-10
                  `}
                />
              </div>
            )}
            
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}; 