import { PercentageCalc } from "@/components/tools/PercentageCalc"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

export const metadata = {
    title: "Percentage Calculator | Hello World Classes",
    description: "Free online percentage calculator. Calculate percentage of a number, percentage change, and more instantly.",
}

export default function PercentagePage() {
    return (
        <ToolLayout
            title="Percentage Calculator"
            subtitle="Solve percent problems instantly. No formulas needed."
        >
            <PercentageCalc />

            <ToolContent
                toolName="Percentage Calculator"
                howToUse={[
                    { title: "Input Numbers", desc: "Enter the values or the percentage you need to find." },
                    { title: "Instant Result", desc: "The answer appears automatically." },
                    { title: "Multiple Modes", desc: "Switch between 'What is X% of Y' and 'X is what % of Y'." }
                ]}
                whyUse={[
                    "Daily Math: Tips, taxes, discounts—solve them fast.",
                    "Student Aid: Check your homework answers.",
                    "No Errors: Avoid manual calculation mistakes."
                ]}
            />
        </ToolLayout>
    )
}
