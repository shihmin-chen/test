import React, { forwardRef, useEffect, useRef, useState } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md';
  theme?: 'white' | 'grey';
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  prefix?: React.ReactNode;
  minWidth?: string;
  maxWidth?: string;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onChange,
      options = [],
      placeholder = '--',
      size = 'md',
      theme = 'grey',
      error = false,
      disabled = false,
      readOnly = false,
      className = '',
      prefix,
      minWidth = '9rem',
      maxWidth = '18rem',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const currentOption = options.find((opt) => opt.value === value);
    const currentLabel = currentOption?.label || placeholder;

    const handleToggle = () => {
      if (!disabled && !readOnly) {
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (option: SelectOption) => {
      if (!option.disabled && onChange) {
        onChange(option.value);
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled || readOnly) return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const option = options[highlightedIndex];
            if (!option.disabled) {
              handleOptionClick(option);
            }
          } else {
            setIsOpen(true);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) => {
              let next = prev + 1;
              while (next < options.length && options[next].disabled) {
                next++;
              }
              return next < options.length ? next : prev;
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => {
              let next = prev - 1;
              while (next >= 0 && options[next].disabled) {
                next--;
              }
              return next >= 0 ? next : prev;
            });
          }
          break;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    useEffect(() => {
      if (isOpen) {
        setHighlightedIndex(
          options.findIndex((opt) => opt.value === value && !opt.disabled)
        );
      } else {
        setHighlightedIndex(-1);
      }
    }, [isOpen, value, options]);

    return (
      <div className="x-select-wrapper" style={{ position: 'relative' }}>
        <div
          ref={(node) => {
            if (selectRef) {
              (selectRef as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
            }
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={[
            'x-select',
            isOpen && 'x-select--open',
            theme === 'white' && 'x-select--white',
            `x-select--${size}`,
            error && 'x-select--error',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            minWidth,
            maxWidth,
          }}
          tabIndex={disabled ? undefined : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className="x-select-text-container">
            {prefix && (
              <span
                className={[
                  'x-select-prefix',
                  disabled && 'x-select-prefix--disabled',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {prefix}
              </span>
            )}
            <span className="x-select-text">{currentLabel}</span>
          </span>

          <svg
            className={[
              'x-select-arrow',
              isOpen && 'x-select-arrow--open',
            ]
              .filter(Boolean)
              .join(' ')}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div
            ref={menuRef}
            className="x-select-menu"
            role="listbox"
            style={{
              minWidth,
              maxWidth,
            }}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                className={[
                  'x-select-menu-item',
                  value === option.value && 'x-select-menu-item--selected',
                  highlightedIndex === index &&
                    'x-select-menu-item--highlighted',
                  option.disabled && 'x-select-menu-item--disabled',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="option"
                aria-selected={value === option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
