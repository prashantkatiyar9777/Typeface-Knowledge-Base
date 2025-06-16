import React from 'react';
import { getIcon } from '../../utils/iconMap';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const IconComponent = icon ? getIcon(icon) : null;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};