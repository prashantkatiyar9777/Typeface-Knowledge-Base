import { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  containerClassName?: string;
  placeholder?: string;
}

export interface SelectGroupOption {
  label: string;
  options: SelectOption[];
}

export interface GroupedSelectProps extends Omit<SelectProps, 'options'> {
  options: SelectGroupOption[];
} 