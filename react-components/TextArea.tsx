import React, { forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error = false, className = '', readOnly = false, rows = 3, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        readOnly={readOnly}
        className={[
          'x-textarea',
          error && 'x-textarea--error',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
