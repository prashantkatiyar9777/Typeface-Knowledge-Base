import React, { forwardRef, useEffect, useRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { CheckboxProps, CheckboxGroupProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  hint,
  containerClassName = '',
  labelClassName = '',
  indeterminate = false,
  disabled = false,
  ...props
}, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Handle both function and object refs
  useEffect(() => {
    if (!ref) return;
    
    if (typeof ref === 'function') {
      ref(internalRef.current);
    } else {
      ref.current = internalRef.current;
    }
  }, [ref]);

  return (
    <div className={containerClassName}>
      <label className="inline-flex items-center">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={internalRef}
            disabled={disabled}
            className="absolute w-4 h-4 opacity-0"
            {...props}
          />
          <div
            className={`
              w-4 h-4 border flex items-center justify-center
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${props.checked || indeterminate ? 'bg-blue-500 border-blue-500' : ''}
            `}
          >
            {props.checked && (
              <Check className="w-3 h-3 text-white" />
            )}
            {indeterminate && !props.checked && (
              <Minus className="w-3 h-3 text-white" />
            )}
          </div>
        </div>
        {label && (
          <span
            className={`ml-2 text-sm ${
              disabled ? 'text-gray-400' : 'text-gray-700'
            } ${labelClassName}`}
          >
            {label}
          </span>
        )}
      </label>

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

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  error,
  hint,
  containerClassName = '',
  options,
  value,
  onChange,
  disabled = false
}) => {
  const handleCheckboxChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="space-y-2">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            disabled={disabled || option.disabled}
          />
        ))}
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
};

Checkbox.displayName = 'Checkbox'; 