import { z } from "zod";

export const ProfileSchema = z.object({
    title: z.string().describe("The customized professional title that best aligns with the target role."),
    bio: z.string().describe("A rewritten bio paragraph highlighting the aspects of their background most relevant to the role and company."),
});

export const ProjectSchema = z.object({
    id: z.string(),
    description: z.string().describe("A short line highlighting the aspects of this project that make it relevant to the role."),
});

export const ProjectsSchema = z.array(ProjectSchema);

export const SkillCategorySchema = z.object({
    category: z.string(),
    items: z.array(z.object({
        name: z.string(),
        proficiency: z.enum(["expert", "advanced", "intermediate"]),
        keywords: z.array(z.string()),
        isHighlight: z.boolean().optional().transform(v => v ?? false).describe("Set to true if this specific skill is explicitly requested or highly relevant to the target role/company. Otherwise set to false.")
    }))
}).describe("The categorized skills array rearranged and truncated to prioritize those heavily matching the role context. Set isHighlight to true for the most important matching skills.");

export const SkillCategoriesSchema = z.array(SkillCategorySchema);

export const WhyMeSchema = z.object({
    title: z.string().describe("A clear section title like 'Why I am a Great Fit for Company'"),
    points: z.array(z.string()).describe("3-5 highly persuasive bullet points specifically arguing why the candidate matches the company and role logic."),
    closingStatement: z.string().describe("A short confident closing statement."),
});

export const personalizePrompt = (company: string, role: string, baseData: string) => `
You are an expert career coach and precise technical resume writer. Your task is to rewrite pieces of a developer's portfolio to be perfectly tailored for a specific recruiter visit.

Target Company: ${company}
Target Role: ${role}

Here is the candidate's Base Data in JSON format:
${baseData}

Your goals:
1. Rewrite the "title" and "bio" to emphasize the skills the candidate has that most overlap with the target role. DO NOT hallucinate. Only use facts present in the base data. Maintain their personal tone: confident, slightly raw, and "brutalist".
2. Rewrite the "description" for each project to emphasize the architectural or technical aspects relevant to the target role. (Leave IDs EXACTLY the same as provided).
3. Rearrange the skill categories and items so the ones most relevant to the target role appear first. You may drop completely irrelevant skills.
4. Create a custom "Why Me" pitch that persuasively argues why the candidate is a strong fit for the specific company and role.

Do NOT invent any new work history, projects, or technical proficiencies. If you cannot find a strong connection, highlight their general problem solving, rapid learning, and full-stack capabilities.
`;
