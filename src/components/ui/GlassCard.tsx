import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'interactive' | 'accent';
    className?: string;
}

export function GlassCard({
    children,
    variant = 'default',
    className,
    ...props
}: GlassCardProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'elevated':
                return 'backdrop-blur-3xl bg-bg-glass border border-border-glass shadow-lg';
            case 'interactive':
                return 'cursor-pointer hover:bg-bg-glass-hover hover:border-border-glass-hover hover:-translate-y-1 transition-all duration-300';
            case 'accent':
                return 'relative overflow-hidden before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-accent-primary before:to-accent-secondary before:-z-10 before:rounded-none';
            default:
                return 'backdrop-blur-xl bg-bg-glass border border-border-glass';
        }
    };

    return (
        <div
            className={cn(`rounded-none p-6 ${getVariantStyles()}`, className)}
            {...props}
        >
            {children}
        </div>
    );
}
