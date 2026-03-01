import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    elevated?: boolean;
    className?: string;
    as?: React.ElementType;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, elevated = false, className = "", as: Component = "div", ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={`minimal-card ${className}`}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

GlassCard.displayName = "GlassCard";
