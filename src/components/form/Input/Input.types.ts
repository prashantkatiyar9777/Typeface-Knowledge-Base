import { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  onLeftIconClick?: () => void;
  containerClassName?: string;
}

export interface TextAreaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string;
  error?: string;
  hint?: string;
  rows?: number;
  containerClassName?: string;
} 