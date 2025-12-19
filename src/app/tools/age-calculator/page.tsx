import { AgeCalc } from "@/components/tools/AgeCalc"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

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

            <ToolContent
                toolName="Age Calculator"
                howToUse={[
                    { title: "Select Date", desc: "Choose your Date of Birth from the calendar." },
                    { title: "Calculate", desc: "Instantly see your age in years, months, and days." },
                    { title: "Fun Stats", desc: "Check how many days are left until your next birthday." }
                ]}
                whyUse={[
                    "Precision: Get accurate calculations accounting for leap years.",
                    "Planning: Know exactly when you turn 18, 21, or 60.",
                    "Fun: Compare your exact age with friends down to the day."
                ]}
            />
        </ToolLayout>
    )
}
