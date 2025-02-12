import React, { ReactNode, FormEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: (e: FormEvent) => Promise<void> | void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
