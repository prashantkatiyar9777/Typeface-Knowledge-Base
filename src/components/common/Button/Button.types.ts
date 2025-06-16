import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  className?: string;
} 