import { ErrorExplainer } from "@/components/tools/ErrorExplainer"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

export const metadata = {
    title: "Python Error Explainer | Hello World Classes",
    description: "Paste your Python error and get a simple explanation in Hinglish. Fix SyntaxError, IndentationError, and more instantly.",
}

export default function ErrorExplainerPage() {
    return (
        <ToolLayout
            title="Python Error Explainer"
            subtitle="Paste that scary red error message below. We'll translate it into simple English (and Hinglish) for you."
            videoLink="https://youtube.com" // Placeholder
        >
            <ErrorExplainer />

            <ToolContent
                toolName="Python Error Explainer"
                howToUse={[
                    { title: "Paste Error", desc: "Copy the full traceback from your terminal." },
                    { title: "Analyze", desc: "Click 'Explain Error' to get a human-readable diagnosis." },
                    { title: "Fix", desc: "Follow the suggested solution code." }
                ]}
                whyUse={[
                    "Beginner Friendly: Decodes 'KeyError', 'IndexError', and confusing messages.",
                    "Hinglish Support: Explanation in simple English/Hinglish for Indian students.",
                    "Fast Debugging: Don't spend hours searching StackOverflow."
                ]}
            />
        </ToolLayout>
    )
}
