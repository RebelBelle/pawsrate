import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  labelPosition?: 'left' | 'right';
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  labelPosition = 'right',
  id,
  className = '',
  ...inputProps
}) => {
  const wrapperClass = `checkbox checkbox--${labelPosition}`;
  const inputClass = `checkbox__input ${className}`;

  return (
    <div className={wrapperClass}>
      <input
        type="checkbox"
        id={id}
        className={inputClass}
        {...inputProps}
      />
      <label htmlFor={id} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};
