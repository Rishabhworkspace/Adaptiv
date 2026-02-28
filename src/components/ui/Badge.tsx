import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    variant?: 'default' | 'glow' | 'outline' | 'glass';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors';

    const variants = {
        default: 'bg-bg-glass-hover text-text-primary',
        glow: 'bg-accent-primary/20 text-accent-secondary border border-accent-secondary/40 shadow-teal-glow',
        outline: 'bg-transparent border border-text-muted text-text-secondary',
        glass: 'backdrop-blur-md bg-bg-glass border border-border-glass text-text-primary',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
}
