import { OneLinerConverter } from "@/components/tools/OneLinerConverter"
import { ToolLayout } from "@/components/tools/ToolLayout"

export const metadata = {
    title: "Python One-Liner Converter | Hello World Classes",
    description: "Turn ugly 4-line loops into beautiful 1-line List Comprehensions. The magic of Python.",
}

export default function OneLinerPage() {
    return (
        <ToolLayout
            title="Loop to One-Liner Converter"
            subtitle="Stop writing boring loops. Start writing elegant 'List Comprehensions'. It's Python magic."
            videoLink="https://youtube.com"
        >
            <OneLinerConverter />
        </ToolLayout>
    )
}
