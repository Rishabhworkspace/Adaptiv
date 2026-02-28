import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
}

// Initialize the Google Generative AI client
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use gemini-1.5-flash for the fastest text generation performance
export const textModel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
    },
});
