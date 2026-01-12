import React, { forwardRef, InputHTMLAttributes, createContext, useContext } from 'react';

interface RadioContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}

const RadioContext = createContext<RadioContextValue>({
  name: 'radio-group',
  error: false,
});

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  error = false,
  children,
  className = '',
}) => {
  return (
    <RadioContext.Provider value={{ name, value, onChange, error }}>
      <div className={`x-radio-group ${className}`}>{children}</div>
    </RadioContext.Provider>
  );
};

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value: string;
  label?: string;
  size?: 'sm' | 'md';
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      size = 'md',
      disabled = false,
      readOnly = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const context = useContext(RadioContext);
    const isSelected = context.value === value;

    const handleChange = () => {
      if (context.onChange && !disabled && !readOnly) {
        context.onChange(value);
      }
    };

    return (
      <label
        className={[
          'x-radio-button',
          `x-radio-button--${size}`,
          readOnly && 'x-radio-button--readonly',
          disabled && 'x-radio-button--disabled',
          context.error && 'x-radio-button--error',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          ref={ref}
          type="radio"
          className="x-radio-button-input"
          name={context.name}
          value={value}
          checked={isSelected}
          disabled={disabled}
          onChange={handleChange}
          {...rest}
        />

        <span className="x-radio-button-icon">
          {isSelected ? (
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z"
                fill="var(--checked-fill)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
                fill="var(--checked-fill)"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
                fill="var(--unchecked-fill)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                fill="var(--unchecked-stroke)"
              />
            </svg>
          )}
        </span>

        {label || children}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };
