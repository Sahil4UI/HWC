import { PercentageCalc } from "@/components/tools/PercentageCalc"
import { ToolLayout } from "@/components/tools/ToolLayout"

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
        </ToolLayout>
    )
}
