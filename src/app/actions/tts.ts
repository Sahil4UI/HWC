"use server"

export async function downloadTTSAction(text: string, lang: string) {
    try {
        // Google Translate TTS Endpoint (Unofficial but widely used for lightweight needs)
        // client=tw-ob is often used, or gtx.
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(text)}`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });

        if (!response.ok) {
            throw new Error(`TTS API Error: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        return { success: true, audio: `data:audio/mpeg;base64,${base64}` };
    } catch (error: any) {
        console.error("TTS Download Error:", error);
        return { success: false, error: "Failed to generate audio file." };
    }
}
