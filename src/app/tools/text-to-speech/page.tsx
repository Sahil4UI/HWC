import { TextToSpeech } from "@/components/tools/TextToSpeech"
import { ToolLayout } from "@/components/tools/ToolLayout"

export const metadata = {
    title: "Text to Speech Converter | Hello World Classes",
    description: "Free online Text to Speech (TTS) converter. Listen to text in Hindi, English, and other languages. Natural sounding voices.",
}

export default function TextToSpeechPage() {
    return (
        <ToolLayout
            title="Text to Speech (TTS)"
            subtitle="Turn your words into voice. Listen to articles, check pronunciation, or create audio content."
        >
            <TextToSpeech />
        </ToolLayout>
    )
}
