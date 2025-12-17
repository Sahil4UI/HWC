import { CodeOutputPredictor } from "@/components/tools/CodeOutputPredictor"
import { ToolLayout } from "@/components/tools/ToolLayout"

export const metadata = {
    title: "Python Code Output Predictor | Hello World Classes",
    description: "Test your Python knowledge. Guess the output of code snippets and check your understanding.",
}

export default function CodeOutputPage() {
    return (
        <ToolLayout
            title="Code Output Predictor"
            subtitle="Can you think like a computer? Guess the output before revealing the answer."
            videoLink="https://youtube.com"
        >
            <CodeOutputPredictor />
        </ToolLayout>
    )
}
