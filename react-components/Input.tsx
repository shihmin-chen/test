import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: boolean;
  errorIcon?: React.ReactNode;
  message?: string;
  size?: 'sm' | 'md';
  fill?: boolean;
  borderless?: boolean;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  inline?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error = false,
      errorIcon,
      message,
      size = 'md',
      fill = false,
      borderless = false,
      prefix,
      postfix,
      inline = false,
      type = 'text',
      className = '',
      disabled = false,
      readOnly = false,
      required = false,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      type === 'password' ? (showPassword ? 'text' : 'password') : type;

    const isSearch = type === 'search';
    const isPassword = type === 'password';

    return (
      <label
        className={[
          'x-input',
          fill && 'x-input--fill',
          borderless && 'x-input--borderless',
          readOnly && 'x-input--readonly',
          `x-input--${size}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        data-x-input-type={type}
      >
        {label && (
          <span className="x-input-label">
            {label}
            {required && <span className="x-input-label-required-mark">*</span>}
          </span>
        )}

        <div
          className={[
            'x-input-text-container',
            inline && 'x-input-text-container--inline',
            error && 'x-input-text-container--error',
            disabled && 'x-input-text-container--disabled',
            readOnly && 'x-input-text-container--readonly',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {prefix ||
            (isSearch && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  color: disabled
                    ? 'var(--muted-foreground)'
                    : 'var(--muted-foreground)',
                }}
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18.5 18.5l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ))}

          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            className="x-input-input"
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            {...rest}
          />

          {postfix}

          {isPassword && (
            <button
              type="button"
              className="x-input-icon-button"
              disabled={disabled}
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? '隱藏' : '顯示'}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5C8.24 5 5.04 7.18 3.35 10.5c-.15.3-.15.7 0 1C5.04 14.82 8.24 17 12 17s6.96-2.18 8.65-5.5c.15-.3.15-.7 0-1C18.96 7.18 15.76 5 12 5zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                    fill="currentColor"
                  />
                  <circle cx="12" cy="11" r="2" fill="currentColor" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {message && (
          <div
            className={[
              'x-input-msg',
              error && 'x-input-msg--error',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {error && errorIcon && (
              <span className="x-input-msg-icon">{errorIcon}</span>
            )}
            <span className="x-input-msg-text">{message}</span>
          </div>
        )}
      </label>
    );
  }
);

Input.displayName = 'Input';

export { Input };
