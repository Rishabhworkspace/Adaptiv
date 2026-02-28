export interface Profile {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    location: string;
    photo: string;
    links: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
        instagram?: string;
        leetcode?: string;
    };
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    techStack: string[];
    category: string[];
    liveUrl?: string;
    githubUrl?: string;
    image: string;
    highlights: string[];
}

export interface SkillCategory {
    category: string;
    items: Array<{
        name: string;
        proficiency: "expert" | "advanced" | "intermediate";
        keywords: string[];
    }>;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    highlights: string[];
    techUsed: string[];
}
