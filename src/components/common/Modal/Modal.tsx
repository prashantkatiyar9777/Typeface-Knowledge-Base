import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ModalProps } from './Modal.types';
import { commonStyles } from '../../../styles/common';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  contentClassName = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4'
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      
      <div
        className={`
          relative z-50 w-full bg-white
          ${sizeClasses[size]}
          ${contentClassName}
        `}
        onClick={e => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            {title && (
              <h2 className={`${commonStyles.text.base} font-medium text-gray-900`}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}; 