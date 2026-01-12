import React, { ReactNode } from 'react';
import './Label.css';

export interface LabelProps {
  /** Label text */
  children: ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** HTML for attribute */
  htmlFor?: string;
  /** Custom className */
  className?: string;
  /** Custom required indicator text (default: '*') */
  requiredIndicator?: string;
}

export function Label({
  children,
  required = false,
  htmlFor,
  className = '',
  requiredIndicator = '*',
}: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`}>
      {children}
      {required && (
        <span className="form-label-required" aria-label="required">
          {requiredIndicator}
        </span>
      )}
    </label>
  );
}

export default Label;
