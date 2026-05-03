import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  disabled,
  isLoading = false,
  loadingText,
  type = 'button',
  ...props
}) => {
  const buttonClassName = ['form-panel__submit-button', className].filter(Boolean).join(' ');
  const content = isLoading ? (loadingText ?? children) : children;

  return (
    <button type={type} disabled={disabled} className={buttonClassName} {...props}>
      {content}
    </button>
  );
};
