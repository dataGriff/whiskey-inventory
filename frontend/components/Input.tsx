import React from 'react';

export interface InputProps {
  /**
   * Input type
   */
  type?: 'text' | 'number' | 'email' | 'date' | 'url';
  /**
   * Input name attribute
   */
  name?: string;
  /**
   * Input value
   */
  value?: string | number;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  /**
   * ID for the input element
   */
  id?: string;
}

/**
 * Input component for form fields
 */
export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  onChange,
  'aria-label': ariaLabel,
  id,
}) => {
  const inputId = id || name;

  const containerStyle: React.CSSProperties = {
    marginBottom: '16px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    fontSize: '14px',
    color: '#333',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    border: error ? '2px solid #dc3545' : '1px solid #ced4da',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: disabled ? '#e9ecef' : '#ffffff',
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const errorStyle: React.CSSProperties = {
    marginTop: '4px',
    fontSize: '14px',
    color: '#dc3545',
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
          {required && <span style={{ color: '#dc3545' }}> *</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
        style={inputStyle}
        aria-label={ariaLabel || label}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <div id={`${inputId}-error`} style={errorStyle} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
