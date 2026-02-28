"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10 bg-bg-glass animate-pulse rounded-none" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 bg-bg-glass border border-border-glass text-text-secondary hover:text-bg-primary hover:bg-text-primary transition-all duration-300 relative overflow-hidden group rounded-none"
            aria-label="Toggle theme"
        >
            <div className="relative z-10 transition-transform group-hover:scale-110">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </div>
        </button>
    );
}
