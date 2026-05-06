import React, { InputHTMLAttributes } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  type: 'email' | 'password' | 'text';
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  isPasswordVisible?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  showPasswordToggle = false,
  onTogglePassword,
  isPasswordVisible = false,
  className = '',
  ...inputProps
}) => {
  const Icon = type === 'email' ? Mail : Lock;

  return (
    <div className="form-field">
      <label htmlFor={inputProps.id} className="form-label">
        {label}
      </label>
      <div className="form-input-wrapper">
        <Icon size={18} className="icon" />
        <input
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          className={`form-input ${className}`}
          {...inputProps}
        />
        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            className="btn btn-icon"
          >
            {isPasswordVisible ? (
              <EyeOff size={16} className="icon" />
            ) : (
              <Eye size={16} className="icon" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};