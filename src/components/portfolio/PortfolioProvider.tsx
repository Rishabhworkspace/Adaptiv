"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Profile, Project, SkillCategory, Experience } from "@/types/portfolio";

// Base data imports (fallback)
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";

export interface RecruiterContext {
    company: string;
    role: string;
}

export interface PersonalizedData {
    profile: Profile;
    projects: Project[];
    skills: SkillCategory[];
    experience: Experience[];
    whyMe?: {
        title: string;
        points: string[];
        closingStatement: string;
    };
}

interface PortfolioContextType {
    context: RecruiterContext | null;
    setContext: (ctx: RecruiterContext | null) => void;
    data: PersonalizedData;
    isGenerating: boolean;
    personalize: (company: string, role: string) => Promise<void>;
    reset: () => void;
}

const defaultData: PersonalizedData = {
    profile: profileData as Profile,
    projects: projectsData as Project[],
    skills: skillsData as SkillCategory[],
    experience: experienceData as Experience[],
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
    const [context, setContext] = useState<RecruiterContext | null>(null);
    const [data, setData] = useState<PersonalizedData>(defaultData);
    const [isGenerating, setIsGenerating] = useState(false);

    const personalize = async (company: string, role: string) => {
        setIsGenerating(true);
        setContext({ company, role });

        try {
            const response = await fetch("/api/personalize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ company, role }),
            });

            if (!response.ok) throw new Error("Failed to personalize");

            const result = await response.json();

            setData({
                profile: { ...defaultData.profile, ...result.profile },
                projects: result.projects || defaultData.projects,
                skills: result.skills || defaultData.skills,
                experience: defaultData.experience, // We won't rewrite this for now
                whyMe: result.whyMe,
            });

        } catch (error) {
            console.error("Personalization failed:", error);
            // Fallback to default
            setData(defaultData);
        } finally {
            setIsGenerating(false);
        }
    };

    const reset = () => {
        setContext(null);
        setData(defaultData);
    };

    return (
        <PortfolioContext.Provider value={{ context, setContext, data, isGenerating, personalize, reset }}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolio() {
    const ctx = useContext(PortfolioContext);
    if (ctx === undefined) {
        throw new Error("usePortfolio must be used within a PortfolioProvider");
    }
    return ctx;
}
