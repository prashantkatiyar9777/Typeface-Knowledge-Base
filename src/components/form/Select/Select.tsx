import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  SelectProps,
  GroupedSelectProps
} from './Select.types';

const baseSelectStyles = `
  block w-full border text-sm px-3 py-2 pr-10
  focus:outline-none focus:border-blue-500
  disabled:bg-gray-100 disabled:cursor-not-allowed
  appearance-none
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  hint,
  options,
  containerClassName = '',
  placeholder,
  disabled = false,
  ...props
}, ref) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          className={`
            ${baseSelectStyles}
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export const GroupedSelect = forwardRef<HTMLSelectElement, GroupedSelectProps>(({
  options,
  ...props
}, ref) => {
  return (
    <Select
      ref={ref}
      {...props}
      options={[]}
    >
      {props.placeholder && (
        <option value="" disabled>
          {props.placeholder}
        </option>
      )}
      {options.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </optgroup>
      ))}
    </Select>
  );
});

Select.displayName = 'Select';
GroupedSelect.displayName = 'GroupedSelect'; 