import { CodeOutputPredictor } from "@/components/tools/CodeOutputPredictor"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

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

            <ToolContent
                toolName="Code Output Predictor"
                howToUse={[
                    { title: "Read Snippet", desc: "Analyze the provided Python code snippet carefully." },
                    { title: "Guess Output", desc: "Mentally trace the execution (loops, conditions)." },
                    { title: "Verify", desc: "Click reveal to see if you were right. Great for interview prep." }
                ]}
                whyUse={[
                    "Skill Building: Improve your code tracing abilities.",
                    "Interview Prep: Output prediction is a common technical interview question.",
                    "Debug Faster: Learn to spot logic errors without running code."
                ]}
            />
        </ToolLayout>
    )
}
