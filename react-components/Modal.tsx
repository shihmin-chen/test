import React, { ReactNode, useEffect, useRef, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export interface ModalProps {
  children?: ReactNode;
  open: boolean;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  top?: string;
  left?: string;
  closeOnBackdrop?: boolean;
  showBackdrop?: boolean;
  className?: string;
  zIndex?: number;
}

export function Modal({
  children,
  open,
  onClose,
  width = 500,
  height = 'auto',
  maxWidth = 'none',
  maxHeight = 'none',
  top,
  left,
  closeOnBackdrop = false,
  showBackdrop = true,
  className = '',
  zIndex = 1000,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      // Focus modal when opened
      modalRef.current?.focus();

      // Handle ESC key
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const modalStyle: CSSProperties = {
    '--modal-z-index': zIndex,
  } as CSSProperties;

  const contentStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    top: top || '50%',
    left: left || '50%',
    transform: top || left ? 'none' : 'translate(-50%, -50%)',
  };

  if (!open) return null;

  return createPortal(
    <div
      ref={modalRef}
      className={`modal-container ${showBackdrop ? 'modal-with-backdrop' : ''}`}
      style={modalStyle}
      onClick={handleBackdropClick}
      tabIndex={-1}
      data-qa-xui="Modal"
    >
      <div
        ref={contentRef}
        className={`modal-content ${className}`}
        style={contentStyle}
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
  className?: string;
}

export function ModalHeader({ children, onClose, className = '' }: ModalHeaderProps) {
  return (
    <div className={`modal-header ${className}`}>
      <div className="modal-header-title">{children}</div>
      {onClose && (
        <button
          className="modal-header-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
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

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
