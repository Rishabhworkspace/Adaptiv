"use client";

import type { TemplateConfig } from "@/data/templates";
import { MinimalLayout } from "./minimal/MinimalLayout";
import { CreativeLayout } from "./creative/CreativeLayout";
import { CorporateLayout } from "./corporate/CorporateLayout";
import { TerminalLayout } from "./terminal/TerminalLayout";
import { SplitHeroLayout } from "./splitHero/SplitHeroLayout";
import { CardGridLayout } from "./cardGrid/CardGridLayout";
import { MagazineLayout } from "./magazine/MagazineLayout";
import { SidebarLayout } from "./sidebar/SidebarLayout";
import { TimelineLayout } from "./timeline/TimelineLayout";
import { GlassDarkLayout } from "./glassDark/GlassDarkLayout";

export interface PortfolioData {
    profile: {
        name: string;
        title: string;
        bio: string;
        email: string;
        phone?: string;
        location: string;
        photo?: string;
        links?: Record<string, string>;
    };
    skills: Array<{
        category: string;
        items: Array<{ name: string; proficiency: "expert" | "advanced" | "intermediate" }>;
    }>;
    projects: Array<{
        title: string;
        description: string;
        techStack: string[];
        liveUrl?: string;
        githubUrl?: string;
        image?: string;
    }>;
    experience: Array<{
        company: string;
        role: string;
        duration: string;
        description: string;
        highlights: string[];
    }>;
}

interface PortfolioRendererProps {
    template: TemplateConfig;
    inputs: Record<string, unknown>;
}

export function PortfolioRenderer({ template, inputs }: PortfolioRendererProps) {
    const data = inputs as unknown as PortfolioData;

    const layoutMap = {
        minimal: MinimalLayout,
        creative: CreativeLayout,
        corporate: CorporateLayout,
        terminal: TerminalLayout,
        splitHero: SplitHeroLayout,
        cardGrid: CardGridLayout,
        magazine: MagazineLayout,
        sidebar: SidebarLayout,
        timeline: TimelineLayout,
        glassDark: GlassDarkLayout,
    };

    const Layout = layoutMap[template.layoutType];

    return <Layout template={template} data={data} />;
}
