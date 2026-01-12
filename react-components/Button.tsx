import React, { forwardRef, HTMLAttributes } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  display?: 'button' | 'text' | 'link';
  theme?: 'primary' | 'danger' | 'warning' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
  visited?: boolean;
  loading?: boolean;
  disabled?: boolean;
  url?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      display = 'button',
      theme = 'primary',
      size = 'md',
      outline = false,
      visited = false,
      loading = false,
      disabled = false,
      url,
      icon,
      children,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    const Component = url ? 'a' : 'button';

    const baseClasses = [
      'x-btn',
      `x-btn--${size}`,
      display === 'text' && 'x-btn--text',
      display === 'link' && 'x-btn--link',
      loading && 'x-btn--loading',
      outline && 'x-btn--outline',
      `x-btn--${theme}`,
      disabled && 'x-btn--disabled',
      visited && 'x-btn--visited',
      icon && 'x-btn--w-icon',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (!disabled && !loading && onClick) {
        onClick(event as any);
      }
    };

    const commonProps = {
      className: baseClasses,
      onClick: handleClick,
      ...(url ? { href: url, target: '_blank' } : {}),
      ...(Component === 'button'
        ? { type: 'button' as const, disabled: loading || disabled }
        : {}),
      ...rest,
    };

    return (
      <Component {...commonProps} ref={ref as any}>
        {loading ? (
          <svg
            className="x-btn-spinner"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path
              fill="currentColor"
              d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
            />
          </svg>
        ) : (
          icon && <span className="x-btn-icon">{icon}</span>
        )}
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button };
