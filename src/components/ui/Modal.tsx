import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden flex flex-col shadow-md`}>
        <div className="flex items-center justify-between p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 font-sans">{title}</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};