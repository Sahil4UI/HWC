import { TypingTest } from "@/components/tools/TypingTest"
import { ToolLayout } from "@/components/tools/ToolLayout"

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
        </ToolLayout>
    )
}
