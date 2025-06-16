import React from 'react';

const BrandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M4 4h14v16H4z" />
    <path d="M18 4l2 2v14" />
  </svg>
);

export default BrandIcon; 