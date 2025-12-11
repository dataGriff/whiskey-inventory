import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToasterProps {
  /**
   * Array of toasts to display
   */
  toasts: Toast[];
  /**
   * Handler to remove a toast
   */
  onRemove: (id: string) => void;
  /**
   * Position of the toaster
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Individual toast component
 */
const ToastItem: React.FC<{
  toast: Toast;
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const colors = {
    success: { bg: '#28a745', border: '#218838' },
    error: { bg: '#dc3545', border: '#c82333' },
    warning: { bg: '#ffc107', border: '#e0a800' },
    info: { bg: '#17a2b8', border: '#138496' },
  };

  const toastStyle: React.CSSProperties = {
    backgroundColor: colors[toast.type].bg,
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '4px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '300px',
    maxWidth: '400px',
    opacity: isExiting ? 0 : 1,
    transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer',
    marginLeft: '12px',
    padding: '0',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      style={toastStyle}
      role="alert"
      aria-live="polite"
    >
      <span>{toast.message}</span>
      <button
        style={closeButtonStyle}
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

/**
 * Toaster component for displaying toast notifications
 */
export const Toaster: React.FC<ToasterProps> = ({
  toasts,
  onRemove,
  position = 'top-right',
}) => {
  const positions = {
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
  };

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    ...positions[position],
    zIndex: 9999,
  };

  return (
    <div style={containerStyle} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};
