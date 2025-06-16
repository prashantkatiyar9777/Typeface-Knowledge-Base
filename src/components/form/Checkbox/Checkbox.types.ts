import { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  labelClassName?: string;
  indeterminate?: boolean;
}

export interface CheckboxGroupProps {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  value: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
} 