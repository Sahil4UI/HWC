import { PracticeGenerator } from "@/components/tools/PracticeGenerator"
import { ToolLayout } from "@/components/tools/ToolLayout"

export const metadata = {
    title: "Python Practice Generator | Hello World Classes",
    description: "Unlimited Python practice questions. Filter by topic and difficulty.",
}

export default function PracticeGeneratorPage() {
    return (
        <ToolLayout
            title="Practice Question Generator"
            subtitle="The best way to learn code is to write code. Generate custom practice questions instantly."
            videoLink="https://youtube.com"
        >
            <PracticeGenerator />
        </ToolLayout>
    )
}
