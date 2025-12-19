import { TextToSpeech } from "@/components/tools/TextToSpeech"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

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

            <ToolContent
                toolName="Text to Speech (TTS)"
                howToUse={[
                    { title: "Input Text", desc: "Type or paste your content. We support long paragraphs for testing." },
                    { title: "Select Voice", desc: "Choose from our wide range of Google Neural voices (multilingual)." },
                    { title: "Listen/Download", desc: "Click play to listen instantly or download as MP3 for offline use." }
                ]}
                whyUse={[
                    "Accessibility: Listen to articles instead of reading.",
                    "Content Creation: Create voiceovers for YouTube/Instagram.",
                    "Language Learning: Practice pronunciation with native-sounding voices."
                ]}
                faq={[
                    { question: "Is there a character limit?", answer: "Currently, you can process standard length paragraphs for free." },
                    { question: "Are the voices royalty-free?", answer: "Yes, you can use the generated audio for your projects." }
                ]}
            />
        </ToolLayout>
    )
}
