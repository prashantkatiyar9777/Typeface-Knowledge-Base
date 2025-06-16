import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { commonStyles } from '../../../styles/common';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [minWidth, setMinWidth] = useState<number>(0);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate width only once when component mounts or options change
  useEffect(() => {
    if (measureRef.current) {
      const maxWidth = Math.max(
        ...options.map(option => {
          measureRef.current!.textContent = option;
          return measureRef.current!.offsetWidth;
        })
      );
      setMinWidth(maxWidth + 56); // Adding padding and icon space
    }
  }, [options]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Hidden element for measuring text width */}
      <div 
        ref={measureRef}
        className="absolute invisible whitespace-nowrap text-[15px] font-medium"
        aria-hidden="true"
      />
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          bg-white text-left px-4 py-2.5 border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          text-[15px] font-medium text-gray-900 whitespace-nowrap
          flex items-center justify-between
          ${className}
        `}
        style={{ minWidth: `${minWidth}px` }}
      >
        <span>{selectedOption}</span>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-500 flex-shrink-0" />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 mt-1 bg-white border border-gray-200 shadow-lg rounded-md py-1 w-full"
          style={{ minWidth: `${minWidth}px` }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 text-[15px] font-medium whitespace-nowrap
                ${option === selectedOption ? 'text-gray-900' : 'text-gray-600'}
                hover:bg-gray-50 flex items-center justify-between
              `}
            >
              <span>{option}</span>
              {option === selectedOption && (
                <Check className="w-4 h-4 text-blue-600 ml-4 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  disabled = false,
  icon,
  className = ''
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full text-left px-4 py-2
      ${commonStyles.text.base}
      ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}
      ${className}
    `}
  >
    <div className="flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </div>
  </button>
);

interface DropdownDividerProps {
  className?: string;
}

export const DropdownDivider: React.FC<DropdownDividerProps> = ({ className = '' }) => (
  <div className={`border-t border-gray-200 my-1 ${className}`} />
);

interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const DropdownLabel: React.FC<DropdownLabelProps> = ({ children, className = '' }) => (
  <div className={`px-4 py-2 ${commonStyles.text.base} text-gray-500 ${className}`}>
    {children}
  </div>
); 