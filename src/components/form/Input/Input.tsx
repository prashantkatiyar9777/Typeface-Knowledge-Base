import React, { forwardRef } from 'react';
import { InputProps, TextAreaProps } from './Input.types';
import { commonStyles } from '../../../styles/common';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  containerClassName = '',
  disabled = false,
  ...props
}, ref) => {
  const baseInputStyles = `
    ${commonStyles.input.base}
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${leftIcon ? 'pl-10' : 'pl-3'}
    ${rightIcon ? 'pr-10' : 'pr-3'}
  `;

  return (
    <div className={containerClassName}>
      {label && (
        <label className={commonStyles.text.label}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center ${
              onLeftIconClick ? 'cursor-pointer' : ''
            }`}
            onClick={onLeftIconClick}
          >
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          disabled={disabled}
          className={baseInputStyles}
          {...props}
        />

        {rightIcon && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              onRightIconClick ? 'cursor-pointer' : ''
            }`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className={commonStyles.text.error}>
          {error}
        </p>
      )}

      {hint && !error && (
        <p className={commonStyles.text.hint}>
          {hint}
        </p>
      )}
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  hint,
  rows = 4,
  containerClassName = '',
  disabled = false,
  ...props
}, ref) => {
  const baseTextAreaStyles = `
    ${commonStyles.input.base}
    ${error ? 'border-red-500' : 'border-gray-300'}
  `;

  return (
    <div className={containerClassName}>
      {label && (
        <label className={commonStyles.text.label}>
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={baseTextAreaStyles}
        {...props}
      />

      {error && (
        <p className={commonStyles.text.error}>
          {error}
        </p>
      )}

      {hint && !error && (
        <p className={commonStyles.text.hint}>
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
TextArea.displayName = 'TextArea'; 