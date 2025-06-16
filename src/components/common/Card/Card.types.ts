import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
} 