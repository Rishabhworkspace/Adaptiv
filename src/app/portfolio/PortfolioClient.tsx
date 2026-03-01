"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { WhyMe } from "@/components/portfolio/WhyMe";
import { usePortfolio } from "@/components/portfolio/PortfolioProvider";
import { Skeleton } from "@/components/ui/Skeleton";
import { GlassCard } from "@/components/ui/GlassCard";

export function PortfolioClient() {
    const { data, isGenerating, context, personalize } = usePortfolio();
    const searchParams = useSearchParams();
    const hasPersonalized = useRef<string | null>(null);

    useEffect(() => {
        const company = searchParams.get("company");
        const role = searchParams.get("role");
        const key = company && role ? `${company}-${role}` : null;

        // Only trigger once per unique company+role pair
        if (key && hasPersonalized.current !== key) {
            hasPersonalized.current = key;
            personalize(company!, role!);
        }
    }, [searchParams, personalize]);

    return (
        <>
            <Navbar />
            <main className="container-custom pt-24 min-h-screen">
                {isGenerating && (
                    <div className="fixed top-24 right-8 z-50">
                        <GlassCard className="py-2 px-4 flex items-center gap-3 border-[#00cec9]/50 bg-black/80 backdrop-blur-xl">
                            <Skeleton className="w-4 h-4 rounded-full bg-[#00cec9]" />
                            <span className="text-sm font-mono text-white">Analyzing {context?.company}...</span>
                        </GlassCard>
                    </div>
                )}

                {context && !isGenerating && (
                    <div className="mb-4 inline-block font-mono text-xs text-[#00cec9] border border-[#00cec9]/30 bg-[#00cec9]/5 px-3 py-1 rounded-full">
                        ✨ Tailored for: {context.company} • {context.role}
                    </div>
                )}

                <div className={isGenerating ? "opacity-50 blur-sm pointer-events-none transition-all duration-1000" : "transition-all duration-1000"}>
                    <Hero profile={data.profile} />
                    <About />
                    <Projects projects={data.projects} />
                    <Skills categories={data.skills} />
                    {data.whyMe && <WhyMe whyMe={data.whyMe} context={context} />}
                    <Experience experiences={data.experience} />
                    <Contact email={data.profile.email} />
                </div>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
