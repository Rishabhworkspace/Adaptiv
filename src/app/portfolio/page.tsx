import { Suspense } from "react";
import type { Metadata } from "next";
import { PortfolioClient } from "./PortfolioClient";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const params = await searchParams;
    const company = typeof params.company === "string" ? params.company : undefined;
    const role = typeof params.role === "string" ? params.role : undefined;

    let title = "Rishabh Tripathi — Portfolio";
    let description = "A portfolio that adapts to you.";

    if (company && role) {
        title = `Rishabh Tripathi — Portfolio for ${company}`;
        description = `Tailored for the ${role} position at ${company}.`;
    } else if (company) {
        title = `Rishabh Tripathi — Portfolio for ${company}`;
        description = `A custom portfolio prepared for ${company}.`;
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default function PortfolioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-primary flex items-center justify-center">Loading...</div>}>
            <PortfolioClient />
        </Suspense>
    );
}
