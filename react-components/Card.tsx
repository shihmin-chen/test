import React, { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children?: ReactNode;
  className?: string;
  busy?: boolean;
}

export interface CardFooterProps {
  children?: ReactNode;
  className?: string;
}

export interface CardIconProps {
  children?: ReactNode;
  className?: string;
}

export function Card({ children, className = '', 'data-testid': testId }: CardProps) {
  return (
    <section className={`card-container ${className}`} data-testid={testId}>
      {children}
    </section>
  );
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '', busy = false }: CardBodyProps) {
  return (
    <div className={`card-body ${className}`} aria-busy={busy}>
      {children}
      <div className="card-body-busy-cover">
        <div className="card-body-spinner" />
      </div>
    </div>
  );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}

export function CardIcon({ children, className = '' }: CardIconProps) {
  return <div className={`card-icon ${className}`}>{children}</div>;
}

// Default export for convenience
export default Card;
