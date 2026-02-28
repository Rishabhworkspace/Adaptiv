import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Hero } from '@/components/portfolio/Hero';
import { Projects } from '@/components/portfolio/Projects';
import { Skills } from '@/components/portfolio/Skills';
import { Experience } from '@/components/portfolio/Experience';
import { Contact } from '@/components/portfolio/Contact';

// In Phase 2, we directly load static JSON data
import profileData from '@/data/profile.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import experienceData from '@/data/experience.json';

import { Profile, Project, SkillCategory, Experience as ExperienceType } from '@/types/portfolio';

// Type casting for base static data
const profile = profileData as Profile;
const projects = projectsData as Project[];
const skills = skillsData as SkillCategory[];
const experiences = experienceData as ExperienceType[];

export default async function PortfolioPage({
    searchParams,
}: {
    searchParams: Promise<{ company?: string; role?: string }>;
}) {
    const params = await searchParams;
    // In Phase 2, we read the query params to fake the URL structure, 
    // but don't do server-side AI generation yet.
    const tailoredFor = params.company ? {
        company: params.company as string,
        role: (params.role as string) || 'Recruiter'
    } : undefined;

    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <Hero profile={profile} tailoredFor={tailoredFor} />

                {/* Sub-components get the base data for Phase 2 */}
                <div className="relative w-full">
                    <Projects projects={projects} />

                    <div className="absolute top-1/2 left-0 w-full h-[800px] bg-[#6c5ce7]/5 blur-[120px] -z-10 pointer-events-none rounded-full transform -translate-y-1/2"></div>

                    {/* Note: In Phase 3 we will extract & separate "Why I'm a Great Fit" logic */}

                    <Skills skillCategories={skills} />
                    <Experience experiences={experiences} />
                    <Contact profile={profile} />
                </div>
            </main>
            <Footer />
        </>
    );
}
