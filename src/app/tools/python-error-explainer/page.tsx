import { ErrorExplainer } from "@/components/tools/ErrorExplainer"
import { ToolLayout } from "@/components/tools/ToolLayout"

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
        </ToolLayout>
    )
}
