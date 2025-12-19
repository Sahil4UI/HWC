import { OneLinerConverter } from "@/components/tools/OneLinerConverter"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

export const metadata = {
    title: "Python One-Liner Converter | Hello World Classes",
    description: "Turn ugly 4-line loops into beautiful 1-line List Comprehensions. The magic of Python.",
}

export default function OneLinerPage() {
    return (
        <ToolLayout
            title="Loop to One-Liner Converter"
            subtitle="Stop writing boring loops. Start writing elegant 'List Comprehensions'. It's Python magic."
            videoLink="https://youtube.com"
        >
            <OneLinerConverter />

            <ToolContent
                toolName="Python One-Liner"
                howToUse={[
                    { title: "Input Loop", desc: "Paste your standard 3-4 line 'for loop'." },
                    { title: "Convert", desc: "Get the List Comprehension equivalent instantly." },
                    { title: "Compare", desc: "Learn how the syntax maps from one to the other." }
                ]}
                whyUse={[
                    "Pythonic Code: Write cleaner, more professional Python.",
                    "Efficiency: List comprehensions are often faster than loops.",
                    "Show-off: Impress your team with elegant one-liners."
                ]}
            />
        </ToolLayout>
    )
}
