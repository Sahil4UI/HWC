import { MethodDifference } from "@/components/tools/MethodDifference"
import { ToolLayout } from "@/components/tools/ToolLayout"

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
        </ToolLayout>
    )
}
