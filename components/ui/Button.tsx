import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  // Sharp edges, monospace font, uppercase
  const baseStyles = "inline-flex items-center justify-center rounded-none font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-eva-brand disabled:opacity-50 disabled:pointer-events-none border-2";
  
  const variants = {
    primary: "bg-eva-brand border-eva-brand text-white hover:bg-white hover:text-eva-brand shadow-sm",
    secondary: "bg-white border-eva-brand text-eva-brand hover:bg-eva-brand hover:text-white",
    outline: "border-gray-300 bg-transparent text-gray-500 hover:border-eva-brand hover:text-eva-brand",
    ghost: "border-transparent hover:bg-gray-100 text-gray-500 hover:text-eva-dark",
    danger: "bg-transparent border-eva-red text-eva-red hover:bg-eva-red hover:text-white shadow-[0_0_10px_rgba(239,68,68,0.2)]"
  };

  const sizes = {
    sm: "h-8 px-4 text-[10px]",
    md: "h-12 px-6 text-xs",
    lg: "h-14 px-8 text-sm",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};