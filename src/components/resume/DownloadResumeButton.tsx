"use client";

import React, { useEffect, useState } from "react";
import { usePortfolio } from "@/components/portfolio/PortfolioProvider";
import { ResumePDF } from "./ResumePDF";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

// dynamically import PDFDownloadLink is required for Next.js SSR
export function DownloadResumeButton() {
    const { data, context } = usePortfolio();
    const [isClient, setIsClient] = useState(false);
    const [PDFDownloadLink, setPDFDownloadLink] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
        // Dynamically import the PDFDownloadLink to avoid SSR ReferenceErrors
        import("@react-pdf/renderer").then((module) => {
            setPDFDownloadLink(() => module.PDFDownloadLink);
        });
    }, []);

    // Generate filename based on context
    const filename = context
        ? `Rishabh_Tripathi_Resume_${context.company.replace(/\s+/g, "_")}.pdf`
        : `Rishabh_Tripathi_Resume.pdf`;

    if (!isClient || !PDFDownloadLink) {
        return (
            <Button variant="outline" className="opacity-50 cursor-not-allowed">
                <Loader2 size={16} className="animate-spin mr-2" />
                Preparing PDF...
            </Button>
        );
    }

    return (
        <PDFDownloadLink
            document={<ResumePDF data={data} context={context} />}
            fileName={filename}
            className="flex items-center justify-center p-3 rounded-xl border border-border bg-transparent text-secondary hover:text-primary hover:border-accent hover:bg-accent/10 transition-colors duration-200"
            style={{ textDecoration: 'none' }}
        >
            {/* @ts-ignore */}
            {({ loading, error }) =>
                loading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-accent" />
                        Generating PDF...
                    </span>
                ) : (
                    <span className="flex items-center gap-2 font-mono text-sm tracking-wide">
                        <Download size={16} className="text-accent" />
                        Download Tailored Resume
                    </span>
                )
            }
        </PDFDownloadLink>
    );
}
