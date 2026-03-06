import React from 'react';
import { cn } from '../../utils/cn'; // Updated path to utils/cn

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asChild?: boolean; // simple mock for asChild if they wrap something else, but here we just keep normal
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

    // Instead of complex Tailwind strings, we use the custom CSS classes from index.css 
    // for primary/secondary/glass, and minimal Tailwind for others to keep it clean.
    const variants = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'hover:bg-white/5 text-zinc-400 hover:text-white bg-transparent border-transparent transition-colors',
      glass: 'glass-card hover:bg-white/5 text-white',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-heading font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

