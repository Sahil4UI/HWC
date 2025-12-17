import { NumberLogicSolver } from "@/components/tools/NumberLogicSolver"
import { ToolLayout } from "@/components/tools/ToolLayout"

export const metadata = {
    title: "Number Logic Solver | Hello World Classes",
    description: "Check for Prime, Palindrome, Armstrong numbers instantly with step-by-step logic.",
}

export default function NumberLogicPage() {
    return (
        <ToolLayout
            title="Number Logic Solver"
            subtitle="Don't just get the answer. See the step-by-step logic used to solve the problem."
            videoLink="https://youtube.com"
        >
            <NumberLogicSolver />
        </ToolLayout>
    )
}
