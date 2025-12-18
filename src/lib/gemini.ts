import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;

if (!apiKey) {
    console.error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey || "MOCK_KEY_FOR_BUILD");

// Export multiple models for fallback strategy (Updated based on API list)
export const gemini25Flash = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { maxOutputTokens: 8192, temperature: 0.7 }
});

export const gemini20Flash = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { maxOutputTokens: 8192, temperature: 0.7 }
});

export const geminiFlashLatest = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: { maxOutputTokens: 8192, temperature: 0.7 }
});

// Default
export const geminiModel = gemini25Flash;
