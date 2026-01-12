import React, { ReactNode } from 'react';
import './Label.css';

export interface LabelProps {
  children?: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Label({
  children,
  htmlFor,
  required = false,
  className = '',
  size = 'md',
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`label label--${size} ${className}`}
      data-qa-xui="Label"
    >
      {children}
      {required && <span className="label-required">*</span>}
    </label>
  );
}
