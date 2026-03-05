import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
    templateId: string;
    inputs: {
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
            items: Array<{
                name: string;
                proficiency: "expert" | "advanced" | "intermediate";
            }>;
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
    };
    generatedContent?: Record<string, unknown>;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
    {
        templateId: { type: String, required: true, index: true },
        inputs: { type: Schema.Types.Mixed, required: true },
        generatedContent: { type: Schema.Types.Mixed, default: {} },
        slug: { type: String, required: true, unique: true, index: true },
    },
    { timestamps: true }
);

// Prevent model recompilation in dev
const Portfolio: Model<IPortfolio> =
    mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
