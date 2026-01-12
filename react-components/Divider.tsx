import React from 'react';
import './Divider.css';

export interface DividerProps {
  variant?: 'middle' | 'fullWidth';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({
  variant = 'middle',
  size = 'md',
  className = '',
  orientation = 'horizontal',
}: DividerProps) {
  const sizeClass = variant !== 'fullWidth' ? `divider--${size}` : '';
  const orientationClass = orientation === 'vertical' ? 'divider--vertical' : '';

  return (
    <hr
      className={`divider ${sizeClass} ${orientationClass} ${className}`}
      data-qa-xui="Divider"
    />
  );
}
