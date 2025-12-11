import React, { useEffect } from 'react';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Handler to close the modal
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Width of the modal
   */
  width?: string;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * Modal component for dialogs and overlays
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = '600px',
  'aria-label': ariaLabel,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: width,
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
  };

  const headerStyle: React.CSSProperties = {
    padding: '20px 24px',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    color: '#212529',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6c757d',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px',
  };

  return (
    <div
      style={overlayStyle}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
    >
      <div
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div style={contentStyle}>{children}</div>
      </div>
    </div>
  );
};
