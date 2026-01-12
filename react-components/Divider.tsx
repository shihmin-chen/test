import React from 'react';
import './Divider.css';

export type DividerVariant = 'middle' | 'fullWidth';
export type DividerSize = 'sm' | 'md' | 'lg';

export interface DividerProps {
  /** Variant of divider (default: 'middle') */
  variant?: DividerVariant;
  /** Size/margin of divider (default: 'md') */
  size?: DividerSize;
  /** Custom className */
  className?: string;
  /** HTML element to render (default: 'hr') */
  as?: 'hr' | 'div';
}

export function Divider({
  variant = 'middle',
  size = 'md',
  className = '',
  as: Component = 'hr',
}: DividerProps) {
  const sizeClass = variant !== 'fullWidth' ? `divider--${size}` : '';
  
  return (
    <Component
      className={`divider ${sizeClass} ${className}`.trim()}
    />
  );
}

export default Divider;
