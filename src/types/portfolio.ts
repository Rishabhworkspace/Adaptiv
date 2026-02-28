export interface Profile {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    location: string;
    photo?: string;
    links: {
        github?: string;
        linkedin?: string;
        leetcode?: string;
        instagram?: string;
    };
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    category: string[];
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
    highlights: string[];
}

export interface SkillItem {
    name: string;
    proficiency: "expert" | "advanced" | "intermediate" | "beginner";
    keywords: string[];
}

export interface SkillCategory {
    category: string;
    items: SkillItem[];
}

export interface Experience {
    id: string;
    company?: string;
    role?: string;
    milestone: string;
    duration?: string;
    description: string;
    highlights: string[];
    techUsed?: string[];
}
