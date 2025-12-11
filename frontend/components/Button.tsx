import React from 'react';

export interface ButtonProps {
  /**
   * Button text content
   */
  children: React.ReactNode;
  /**
   * Visual variant of the button
   */
  variant?: 'primary' | 'secondary' | 'danger';
  /**
   * Size of the button
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * Button component for user interactions
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const baseStyles = {
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#007bff',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: '#ffffff',
    },
    danger: {
      backgroundColor: '#dc3545',
      color: '#ffffff',
    },
  };

  const sizeStyles = {
    small: {
      padding: '6px 12px',
      fontSize: '14px',
    },
    medium: {
      padding: '10px 20px',
      fontSize: '16px',
    },
    large: {
      padding: '14px 28px',
      fontSize: '18px',
    },
  };

  const style = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
