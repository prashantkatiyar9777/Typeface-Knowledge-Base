import React from 'react';
import { ChevronRight } from 'lucide-react';
import { commonStyles } from '../../../styles/common';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />
}) => {
  return (
    <nav className={`${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2">{separator}</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className={`
                  ${commonStyles.text.base}
                  text-gray-600 hover:text-gray-900
                  hover:bg-gray-100 px-1
                `}
              >
                {item.label}
              </a>
            ) : (
              <span
                className={`
                  ${commonStyles.text.base}
                  text-gray-900 font-medium px-1
                `}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 