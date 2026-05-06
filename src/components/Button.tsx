import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = 'btn',
  disabled,
  isLoading = false,
  loadingText,
  type = 'button',
  ...props
}) => {
  const buttonClassName = ['btn-primary', className].filter(Boolean).join(' ');
  const content = isLoading ? (loadingText ?? children) : children;

  return (
    <button type={type} disabled={disabled} className={buttonClassName} {...props}>
      {content}
    </button>
  );
};
