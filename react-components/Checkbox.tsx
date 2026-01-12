import React, { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
  size?: 'sm' | 'md';
  error?: boolean;
  hideCheckBox?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      size = 'md',
      error = false,
      hideCheckBox = false,
      disabled = false,
      readOnly = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const checkboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label
        className={[
          'x-checkbox',
          `x-checkbox--${size}`,
          readOnly && 'x-checkbox--readonly',
          disabled && 'x-checkbox--disabled',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          ref={(node) => {
            checkboxRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="checkbox"
          className={[
            'x-checkbox-input',
            hideCheckBox && 'x-checkbox-input--hide',
            error && 'x-checkbox-input--error',
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={disabled}
          {...rest}
        />
        {label || children}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
