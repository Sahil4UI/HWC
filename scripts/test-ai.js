const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// 1. Manually load env
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '../.env.local');
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                process.env[match[1].trim()] = match[2].trim();
            }
        });
    } catch (e) {
        console.error("Could not read .env.local", e.message);
    }
}

loadEnv();

const apiKey = process.env.GEMINI_API_KEY;
console.log("Testing with Key:", apiKey ? (apiKey.substring(0, 5) + "...") : "MISSING");

async function test() {
    if (!apiKey) {
        console.error("FAIL: No API Key found.");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Using the same model as in src/lib/gemini.ts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("Attempting generation...");
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("SUCCESS! Response:", response.text());
    } catch (error) {
        console.error("---------------------------------------------------");
        console.error("API CALL FAILED");
        console.error("Error Message:", error.message);
        console.error("Full Error:", JSON.stringify(error, null, 2));
        console.error("---------------------------------------------------");
    }
}

test();
