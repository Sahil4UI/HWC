"use server"

import { gemini25Flash, gemini20Flash, geminiFlashLatest } from "@/lib/gemini";

// Helper to try multiple models
async function generateWithFallback(prompt: string) {
    // Try simplest/latest names first as found in your API list
    const models = [gemini25Flash, gemini20Flash, geminiFlashLatest];
    let lastError: any;

    for (const model of models) {
        try {
            console.log(`Attempting with model: ${model.model || 'unknown'}`);
            const result = await model.generateContent(prompt);
            return result;
        } catch (error: any) {
            console.warn(`Model failed: ${error.message}`);
            lastError = error;
        }
    }

    // IF ALL SUCCEED TO FAIL: Debug available models
    try {
        console.log("All models failed. Fetching available models...");
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            const list = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const data = await list.json();
            console.log("AVAILABLE MODELS:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error("Failed to list models:", e);
    }

    throw lastError; // Throw the last error if all failed
}

export async function explainErrorAction(errorLog: string) {
    if (!process.env.GEMINI_API_KEY) {
        return {
            success: false,
            error: "API Key not configured. Please add GEMINI_API_KEY to .env.local"
        };
    }

    try {
        const prompt = `
        You are a friendly Python Tutor for beginners.
        Analyze this error log and explain it in simple Hinglish (Hindi + English).
        
        Error Log:
        ${errorLog}

        Return response in JSON format:
        {
            "title": "Name of Error",
            "severity": "Low/Medium/High",
            "explanation": "Simple explanation in Hinglish",
            "fix": "Specific step-by-step fix"
        }
        `;

        const result = await generateWithFallback(prompt);
        const response = result.response.text();
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : response;

        return { success: true, data: JSON.parse(jsonStr) };
    } catch (error: any) {
        console.error("Gemini Error:", error);
        return { success: false, error: `AI Error: ${error.message || "Unknown error"}` };
    }
}

export async function generatePracticeAction(topic: string, difficulty: string) {
    if (!process.env.GEMINI_API_KEY) return { success: false, error: "API Key Missing" };

    try {
        const prompt = `
        Generate 5 unique Python practice questions about "${topic}" with difficulty "${difficulty}".
        Return raw JSON array format (no markdown):
        [
            { "id": 1, "topic": "${topic}", "difficulty": "${difficulty}", "question": "Question text here" }
        ]
        `;

        const result = await generateWithFallback(prompt);
        const response = result.response.text();
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        const jsonStr = jsonMatch ? jsonMatch[0] : response;

        return { success: true, data: JSON.parse(jsonStr) };
    } catch (error: any) {
        console.error("Practice Gen Error:", error);
        return { success: false, error: error.message || "AI Busy" };
    }
}

export async function cleanTextAction(text: string, mode: 'grammar' | 'simplify' | 'professional' | 'remove_special') {
    if (!process.env.GEMINI_API_KEY) return { success: false, error: "API Key Missing" };

    try {
        let prompt = "";
        if (mode === 'grammar') prompt = "Fix grammar and spelling errors. Keep tone natural.";
        if (mode === 'simplify') prompt = "Simplify this text for a 5-year-old. Make it super easy to read.";
        if (mode === 'professional') prompt = "Rewrite this to sound professional, suitable for LinkedIn or Emails.";
        if (mode === 'remove_special') prompt = "Remove emojis, hashtags, and special characters. Keep only text and punctuation.";

        const finalPrompt = `${prompt}\n\nInput Text:\n${text}\n\nOutput only the cleaned text.`;

        const result = await generateWithFallback(finalPrompt);
        return { success: true, data: result.response.text() };
    } catch (error: any) {
        // Return exact error message to help debug
        return { success: false, error: `AI Failed: ${error.message}` };
    }
}

export async function explainMethodDifferenceAction(lang: string, method1: string, method2: string) {
    if (!process.env.GEMINI_API_KEY) return { success: false, error: "API Key Missing" };

    try {
        const prompt = `
        Explain the difference between the methods "${method1}" and "${method2}" in the programming language "${lang}".
        
        Return a JSON object with this exact structure (no markdown):
        {
            "title": "${method1} vs ${method2}",
            "explanation": "A concise explanation of the main difference.",
            "keyDistinction": "One specific key difference (e.g. return value, in-place modification).",
            "codeExample": "A short code snippet demonstrating the difference."
        }
        `;

        const result = await generateWithFallback(prompt);
        const response = result.response.text();
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : response;

        return { success: true, data: JSON.parse(jsonStr) };
    } catch (error) {
        return { success: false, error: "AI Analysis Failed" };
    }
}

export async function generateAssignmentAction(subject: string, topic: string, difficulty: string) {
    if (!process.env.GEMINI_API_KEY) return { success: false, error: "API Key Missing" };

    try {
        const prompt = `
        Create a practice assignment/worksheet for a student learning "${subject}" specifically about "${topic}".
        Difficulty Level: ${difficulty}.
        
        Generate 6 questions in this mix:
        - 2 Multiple Choice Questions (MCQs)
        - 2 Short Answer/Fill in the blanks
        - 2 Practical/Code Tasks from real world
        
        Return RAW JSON (no markdown) with this structure:
        {
            "title": "Worksheet Title",
            "questions": [
                { "id": 1, "type": "mcq", "question": "Question text", "options": ["A", "B", "C", "D"], "answer": "Correct Option" },
                { "id": 3, "type": "short", "question": "Question text", "answer": "Expected Answer" },
                { "id": 5, "type": "code", "question": "Practical Task Description", "hint": "Useful tip" }
            ]
        }
        `;

        const result = await generateWithFallback(prompt);
        const response = result.response.text();
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : response;

        return { success: true, data: JSON.parse(jsonStr) };
    } catch (error: any) {
        console.error("Assignment Gen Error:", error);
        return { success: false, error: error.message || "AI Busy" };
    }
}
