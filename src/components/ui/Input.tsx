import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`w-full px-4 py-3 bg-transparent border border-black/10 dark:border-white/10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-primary placeholder:text-secondary/50 ${className}`}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
