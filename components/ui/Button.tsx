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
  const baseStyles = "inline-flex items-center justify-center rounded-none font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-eva-yellow disabled:opacity-50 disabled:pointer-events-none border-2";
  
  const variants = {
    primary: "bg-eva-yellow border-eva-yellow text-eva-dark hover:bg-white hover:border-white hover:text-black shadow-[0_0_10px_rgba(250,204,21,0.3)]",
    secondary: "bg-eva-dark border-eva-yellow text-eva-yellow hover:bg-eva-yellow hover:text-eva-dark",
    outline: "border-eva-gray bg-transparent text-gray-300 hover:border-eva-yellow hover:text-eva-yellow",
    ghost: "border-transparent hover:bg-white/10 text-gray-300 hover:text-white",
    danger: "bg-transparent border-eva-red text-eva-red hover:bg-eva-red hover:text-black shadow-[0_0_10px_rgba(239,68,68,0.2)]"
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