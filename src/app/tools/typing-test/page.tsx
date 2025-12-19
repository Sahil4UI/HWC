import { TypingTest } from "@/components/tools/TypingTest"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

export const metadata = {
    title: "Typing Speed Test | Hello World Classes",
    description: "Test your typing speed (WPM) and accuracy with this minimalist, dark-themed typing tool.",
}

export default function TypingPage() {
    return (
        <ToolLayout
            title="Typing Speed Test"
            subtitle="How fast can you code? Test your WPM and accuracy in this minimalist cyberpunk environment."
            fullWidth={true}
        >
            <TypingTest />

            <ToolContent
                toolName="Typing Speed Test"
                howToUse={[
                    { title: "Choose Duration", desc: "Select 15s, 30s, or 60s test modes depending on your stamina." },
                    { title: "Start Typing", desc: "The timer starts as soon as you hit the first key. Be accurate!" },
                    { title: "Analyze Results", desc: "Check your WPM (Words Per Minute) and Accuracy at the end." }
                ]}
                whyUse={[
                    "Career boost: Many coding jobs require 50+ WPM.",
                    "Productivity: Save hours every week by typing faster.",
                    "Muscle Memory: Train your fingers to find keys without looking."
                ]}
                faq={[
                    { question: "What is a good WPM?", answer: "Average is 40 WPM. Professional developers often aim for 70+." },
                    { question: "How is WPM calculated?", answer: "(Characters / 5) / Time in minutes." }
                ]}
            />
        </ToolLayout>
    )
}
