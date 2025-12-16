import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY || "");

export interface CareerPathNode {
    id: number;
    name: string;
    status: 'completed' | 'active' | 'locked';
    duration: string;
    lessons: number;
    description?: string;
}

export interface SyllabusItem {
    title: string;
    duration: string;
    completed: boolean;
    description?: string;
}

export const generateCareerRoadmap = async (topic: string): Promise<{ path: CareerPathNode[], syllabus: SyllabusItem[] }> => {
    if (!API_KEY) {
        console.warn("Gemini API Key is missing");
        // Return mock data if no key to prevent crash during demo
        return {
            path: [
                { id: 1, name: `${topic} Basics`, status: 'active', duration: '1 week', lessons: 5 },
                { id: 2, name: 'Intermediate Concepts', status: 'locked', duration: '2 weeks', lessons: 10 },
                { id: 3, name: 'Advanced Techniques', status: 'locked', duration: '3 weeks', lessons: 15 },
            ],
            syllabus: [
                { title: 'Getting Started', duration: '1 hour', completed: false },
                { title: 'Core Syntax', duration: '2 hours', completed: false },
            ]
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
      Create a detailed learning roadmap for "${topic}".
      Return a STRICT JSON object with two arrays:
      1. "path": 5-7 major milestones (nodes). Each node needs: id (number), name (string), status (always 'locked' except first one 'active'), duration (e.g. '2 weeks'), lessons (number).
      2. "syllabus": 5-8 specific topics for the first milestone. Each needs: title (string), duration (e.g. '45 min'), completed (boolean, always false).
      
      Do not include any markdown formatting like \`\`\`json. Just the raw JSON object.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, '').trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating roadmap:", error);
        throw error;
    }
};

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
    console.log("DEBUG: Generating quiz for", topic);
    console.log("DEBUG: API Key available?", !!API_KEY); // Log if key exists (don't log full key for security in logs, but verify presence)

    if (!API_KEY) {
        console.error("Gemini API Key is missing in environment variables");
        alert("System Error: API Key is missing. Please check .env file.");
        // Throwing error to stop mock data flow and force checking
        throw new Error("API Key missing");
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
      Create a skill verification quiz for "${topic}".
      Return a STRICT JSON array of 5 objects. Each object must have:
      - id (number)
      - question (string)
      - options (array of 4 strings)
      - correctIndex (number, 0-3)
      - explanation (string, brief explanation of the answer)
      
      Do not include any markdown formatting. Just the raw JSON array.
    `;

        console.log("DEBUG: Sending prompt to Gemini...");
        const result = await model.generateContent(prompt);
        console.log("DEBUG: Received response from Gemini");
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, '').trim();
        console.log("DEBUG: Parsed text:", text);

        return JSON.parse(text);
    } catch (error: any) {
        console.error("Error generating quiz:", error);
        alert("API Error: " + (error.message || "Unknown error"));
        throw error;
    }
};
