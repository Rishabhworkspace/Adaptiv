import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
import { personalizePrompt, ProfileSchema, ProjectsSchema, SkillCategoriesSchema, WhyMeSchema } from "@/lib/ai/prompts";

import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";

// For Vercel Edge caching duration
export const maxDuration = 60; // Max 60 seconds (for generation)
export const dynamic = "force-dynamic"; // Do not statically cache the route handler

const ResponseSchema = z.object({
    profile: ProfileSchema,
    projects: ProjectsSchema,
    skills: SkillCategoriesSchema,
    whyMe: WhyMeSchema,
});

// Simple in-memory cache to save AI costs on warm lambdas
const responseCache = new Map<string, any>();

export async function POST(req: Request) {
    try {
        const { company, role } = await req.json();

        if (!company || !role) {
            return NextResponse.json(
                { error: "Missing company or role parameters" },
                { status: 400 }
            );
        }

        const cacheKey = `${company.trim().toLowerCase()}-${role.trim().toLowerCase()}`;
        if (responseCache.has(cacheKey)) {
            console.log(`[Cache Hit] Returning cached personalization for: ${cacheKey}`);
            return NextResponse.json(responseCache.get(cacheKey));
        }

        const baseData = JSON.stringify({
            profile: profileData,
            projects: projectsData,
            skills: skillsData,
        });

        const prompt = personalizePrompt(company, role, baseData);

        const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

        const { object } = await generateObject({
            model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
            schema: ResponseSchema,
            prompt: prompt,
            providerOptions: { groq: { strictJsonSchema: false } },
        });

        // We only returned differences from AI (descriptions). Map them back into the full data objects.
        const mergedProjects = projectsData.map((baseProj) => {
            const aiProj = object.projects.find((ap) => ap.id === baseProj.id);
            return {
                ...baseProj,
                description: aiProj ? aiProj.description : baseProj.description,
            };
        });

        // Sanitize skills: default isHighlight to false if AI omitted it
        const sanitizedSkills = object.skills.map((cat) => ({
            ...cat,
            items: cat.items.map((item) => ({
                ...item,
                isHighlight: item.isHighlight ?? false,
            })),
        }));

        const responseData = {
            profile: object.profile,
            projects: mergedProjects,
            skills: sanitizedSkills,
            whyMe: object.whyMe,
        };

        responseCache.set(cacheKey, responseData);

        return NextResponse.json(responseData);
    } catch (error) {
        console.error("[AI Personalization Error]", error);
        return NextResponse.json(
            { error: "Failed to generate personalized content." },
            { status: 500 }
        );
    }
}
