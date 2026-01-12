import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Callback when the modal should close */
  onClose?: () => void;
  /** Modal content */
  children?: ReactNode;
  /** Whether to show backdrop (default: true) */
  backdrop?: boolean;
  /** Whether clicking backdrop closes modal (default: false) */
  closeOnBackdrop?: boolean;
  /** Whether pressing ESC closes modal (default: true) */
  closeOnEsc?: boolean;
  /** Modal width in pixels (default: 500) */
  width?: number;
  /** Modal max-width (default: 90vw) */
  maxWidth?: string | number;
  /** Modal height in pixels or 'auto' (default: 'auto') */
  height?: number | 'auto';
  /** Modal max-height (default: 90vh) */
  maxHeight?: string | number;
  /** Custom className for the modal */
  className?: string;
  /** Custom z-index offset (default: 0) */
  zIndexShift?: number;
  /** Test ID */
  'data-testid'?: string;
}

export function Modal({
  open,
  onClose,
  children,
  backdrop = true,
  closeOnBackdrop = false,
  closeOnEsc = true,
  width = 500,
  maxWidth = '90vw',
  height = 'auto',
  maxHeight = '90vh',
  className = '',
  zIndexShift = 0,
  'data-testid': testId,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [zIndex] = useState(1000 + zIndexShift);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc && onClose) {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdrop && onClose) {
      onClose();
    }
  };

  if (!open) return null;

  const modalStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    height: height === 'auto' ? 'auto' : `${height}px`,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    zIndex,
  };

  const containerStyle: React.CSSProperties = {
    zIndex,
  };

  return createPortal(
    <div
      className={`modal-container ${backdrop ? 'modal-backdrop' : ''}`}
      style={containerStyle}
      onClick={handleBackdropClick}
      data-testid={testId}
    >
      <div
        ref={modalRef}
        className={`modal-content ${className}`}
        style={modalStyle}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export interface ModalHeaderProps {
  children?: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export function ModalHeader({
  children,
  onClose,
  showCloseButton = true,
  className = '',
}: ModalHeaderProps) {
  return (
    <div className={`modal-header ${className}`}>
      <div className="modal-title">{children}</div>
      {showCloseButton && onClose && (
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export interface ModalBodyProps {
  children?: ReactNode;
  className?: string;
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return <div className={`modal-body ${className}`}>{children}</div>;
}

export interface ModalFooterProps {
  children?: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return <div className={`modal-footer ${className}`}>{children}</div>;
}

export default Modal;
