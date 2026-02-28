import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'glass' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-xl border border-transparent shadow-sm';

        const variants = {
            primary: 'bg-text-primary text-bg-primary hover:bg-text-primary/90',
            secondary: 'bg-bg-glass text-text-primary border-border-glass hover:bg-bg-glass-hover',
            glass: 'backdrop-blur-xl bg-bg-glass border-border-glass text-text-primary hover:bg-bg-glass-hover',
            outline: 'bg-transparent border-border-glass text-text-primary hover:bg-bg-glass',
        };

        const sizes = {
            sm: 'text-xs px-3 py-1.5',
            md: 'text-sm px-4 py-2',
            lg: 'text-base px-6 py-3',
        };

        const classes = cn(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
        );

        return (
            <button ref={ref} className={classes} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
