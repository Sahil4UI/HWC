import { AgeCalc } from "@/components/tools/AgeCalc"
import { ToolLayout } from "@/components/tools/ToolLayout"

export const metadata = {
    title: "Age Calculator Online | Hello World Classes",
    description: "Calculate your exact age in years, months, and days. Check days until your next birthday.",
}

export default function AgePage() {
    return (
        <ToolLayout
            title="Age Calculator"
            subtitle="How old are you exactly? Find out your age in seconds."
        >
            <AgeCalc />
        </ToolLayout>
    )
}
