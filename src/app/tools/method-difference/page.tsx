import { MethodDifference } from "@/components/tools/MethodDifference"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

export const metadata = {
    title: "Python Method Difference | Hello World Classes",
    description: "Stop getting confused between append vs extend, pop vs remove. See the difference clearly.",
}

export default function MethodDifferencePage() {
    return (
        <ToolLayout
            title="Method Comparison Tool"
            subtitle="Python has many methods that look similar but act differently. Let's spot the difference."
            videoLink="https://youtube.com"
        >
            <MethodDifference />

            <ToolContent
                toolName="Method Difference"
                howToUse={[
                    { title: "Select Pair", desc: "Choose a pair of similar methods (e.g. append vs extend)." },
                    { title: "Compare", desc: "Read the side-by-side breakdown and code examples." },
                    { title: "Learn", desc: "Understand exactly when to use which method." }
                ]}
                whyUse={[
                    "Interview prep: These 'difference' questions are very common.",
                    "Bug prevention: Using the wrong method causes subtle data errors.",
                    "Python Mastery: Deepen your understanding of list/string manipulation."
                ]}
            />
        </ToolLayout>
    )
}
