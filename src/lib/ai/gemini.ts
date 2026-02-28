import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
}

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// You can define default models here, e.g., gemini-1.5-flash for speed, gemini-1.5-pro for complex reasoning
export const getModel = (modelName: "gemini-1.5-flash" | "gemini-1.5-pro" = "gemini-1.5-flash") => {
    return genAI.getGenerativeModel({ model: modelName });
};
