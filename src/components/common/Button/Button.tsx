import React from 'react';
import { commonStyles } from '../../../styles/common';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`
        ${commonStyles.button.base}
        ${disabled ? commonStyles.button.disabled : ''}
        ${variant === 'primary' ? commonStyles.button.primary : commonStyles.button.secondary}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}; 