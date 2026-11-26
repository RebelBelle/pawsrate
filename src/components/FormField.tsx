import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface FormFieldBaseProps {
  label: string;
  hideLabel?: boolean;
  helpText?: string;
  helpTextId?: string;
}

interface InputFormFieldProps
  extends
    FormFieldBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  as?: 'input';
  type: React.HTMLInputTypeAttribute;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  isPasswordVisible?: boolean;
}

interface TextareaFormFieldProps
  extends FormFieldBaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
  showPasswordToggle?: never;
  onTogglePassword?: never;
  isPasswordVisible?: never;
}

interface SelectFormFieldProps
  extends FormFieldBaseProps, SelectHTMLAttributes<HTMLSelectElement> {
  as: 'select';
  showPasswordToggle?: never;
  onTogglePassword?: never;
  isPasswordVisible?: never;
}

type FormFieldProps =
  InputFormFieldProps | TextareaFormFieldProps | SelectFormFieldProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  if (props.as === 'select') {
    const {
      label,
      hideLabel = false,
      className = '',
      children,
      helpText,
      helpTextId,
      ...selectProps
    } = props;

    return (
      <div className="form-field">
        <label
          htmlFor={selectProps.id}
          className={hideLabel ? 'form-label visually-hidden' : 'form-label'}>
          {label}
        </label>
        <select
          className={['form-select', className].filter(Boolean).join(' ')}
          {...selectProps}>
          {children}
        </select>
        {helpText && (
          <div id={helpTextId} className="form-text">
            {helpText}
          </div>
        )}
      </div>
    );
  }

  if (props.as === 'textarea') {
    const {
      label,
      hideLabel = false,
      className = '',
      helpText,
      helpTextId,
      ...textareaProps
    } = props;

    return (
      <div className="form-field">
        <label
          htmlFor={textareaProps.id}
          className={hideLabel ? 'form-label visually-hidden' : 'form-label'}>
          {label}
        </label>
        <textarea
          className={['form-control', className].filter(Boolean).join(' ')}
          {...textareaProps}
        />
        {helpText && (
          <div id={helpTextId} className="form-text">
            {helpText}
          </div>
        )}
      </div>
    );
  }

  const {
    label,
    hideLabel = false,
    type,
    showPasswordToggle = false,
    onTogglePassword,
    isPasswordVisible = false,
    className = '',
    helpText,
    helpTextId,
    ...inputProps
  } = props;
  const Icon = type === 'email' ? Mail : type === 'password' ? Lock : null;
  const showPasswordToggleButton =
    type === 'password' && showPasswordToggle && Boolean(onTogglePassword);
  const input = (
    <input
      type={type === 'password' && isPasswordVisible ? 'text' : type}
      className={['form-control', className].filter(Boolean).join(' ')}
      {...inputProps}
    />
  );

  return (
    <div className="form-field">
      <label
        htmlFor={inputProps.id}
        className={hideLabel ? 'form-label visually-hidden' : 'form-label'}>
        {label}
      </label>
      {Icon || showPasswordToggleButton ? (
        <div className="input-group">
          {Icon && (
            <span className="input-group-text">
              <Icon size={18} className="icon" />
            </span>
          )}
          {input}
          {showPasswordToggleButton && (
            <button
              type="button"
              onClick={onTogglePassword}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              className="btn btn-icon">
              {isPasswordVisible ? (
                <EyeOff size={16} className="icon" />
              ) : (
                <Eye size={16} className="icon" />
              )}
            </button>
          )}
        </div>
      ) : (
        input
      )}
      {helpText && (
        <div id={helpTextId} className="form-text">
          {helpText}
        </div>
      )}
    </div>
  );
};
