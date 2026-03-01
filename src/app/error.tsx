"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[App Error]", error);
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center section-padding">
            <div className="container-custom max-w-lg text-center space-y-6">
                <p className="font-mono text-accent text-sm tracking-widest">/// ERROR</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Something went wrong.
                </h1>
                <p className="text-secondary text-lg leading-relaxed">
                    An unexpected error occurred. You can try again or head back to the homepage.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <button
                        onClick={reset}
                        className="minimal-button primary px-6 py-3"
                    >
                        Try Again
                    </button>
                    <a href="/" className="minimal-button outline px-6 py-3">
                        Go Home
                    </a>
                </div>
                {error.digest && (
                    <p className="text-xs text-secondary/50 font-mono pt-4">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </main>
    );
}
