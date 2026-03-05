import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Portfolio from "@/lib/models/Portfolio";
import { getTemplateById } from "@/data/templates";

function generateSlug(name: string): string {
    const base = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    const random = Math.random().toString(36).substring(2, 8);
    return `${base}-${random}`;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { templateId, inputs } = body;

        if (!templateId || !inputs) {
            return NextResponse.json({ error: "Missing templateId or inputs" }, { status: 400 });
        }

        const template = getTemplateById(templateId);
        if (!template) {
            return NextResponse.json({ error: "Invalid template ID" }, { status: 400 });
        }

        if (!inputs.profile?.name || !inputs.profile?.title || !inputs.profile?.email) {
            return NextResponse.json({ error: "Name, title, and email are required" }, { status: 400 });
        }

        await connectDB();

        // Transform form inputs into the storage format
        const transformedInputs = {
            profile: {
                name: inputs.profile.name,
                title: inputs.profile.title,
                bio: inputs.profile.bio || "",
                email: inputs.profile.email,
                phone: inputs.profile.phone || undefined,
                location: inputs.profile.location || "",
                photo: inputs.profile.photo || undefined,
                links: {
                    ...(inputs.profile.github && { github: inputs.profile.github }),
                    ...(inputs.profile.linkedin && { linkedin: inputs.profile.linkedin }),
                    ...(inputs.profile.twitter && { twitter: inputs.profile.twitter }),
                    ...(inputs.profile.website && { website: inputs.profile.website }),
                },
            },
            skills: (inputs.skills || []).map((cat: { category: string; items: Array<{ name: string; proficiency: string }> }) => ({
                category: cat.category || "General",
                items: cat.items
                    .filter((i: { name: string }) => i.name.trim() !== "")
                    .map((i: { name: string; proficiency: string }) => ({
                        name: i.name,
                        proficiency: i.proficiency || "intermediate",
                    })),
            })).filter((cat: { items: unknown[] }) => cat.items.length > 0),
            projects: (inputs.projects || [])
                .filter((p: { title: string }) => p.title.trim() !== "")
                .map((p: { title: string; description: string; techStack: string; liveUrl: string; githubUrl: string }) => ({
                    title: p.title,
                    description: p.description || "",
                    techStack: (p.techStack || "").split(",").map((s: string) => s.trim()).filter(Boolean),
                    liveUrl: p.liveUrl || undefined,
                    githubUrl: p.githubUrl || undefined,
                })),
            experience: (inputs.experience || [])
                .filter((e: { company: string }) => e.company.trim() !== "")
                .map((e: { company: string; role: string; duration: string; description: string; highlights: string }) => ({
                    company: e.company,
                    role: e.role || "",
                    duration: e.duration || "",
                    description: e.description || "",
                    highlights: (e.highlights || "").split("\n").map((h: string) => h.trim()).filter(Boolean),
                })),
        };

        const slug = generateSlug(inputs.profile.name);

        const portfolio = await Portfolio.create({
            templateId,
            inputs: transformedInputs,
            generatedContent: {},
            slug,
        });

        return NextResponse.json({
            slug: portfolio.slug,
            id: portfolio._id,
        });
    } catch (error) {
        console.error("Generate API error:", error);
        return NextResponse.json(
            { error: "Failed to generate portfolio" },
            { status: 500 }
        );
    }
}
