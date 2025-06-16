import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animate = true
}) => {
  const baseStyles = 'bg-gray-200';
  const animationStyles = animate ? 'animate-pulse' : '';
  
  const variantStyles = {
    text: 'h-4',
    rectangular: '',
    circular: 'rounded-full'
  };

  const style: React.CSSProperties = {
    width: width,
    height: height || (variant === 'text' ? undefined : '100%')
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${animationStyles}
        ${variantStyles[variant]}
        ${className}
      `}
      style={style}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 