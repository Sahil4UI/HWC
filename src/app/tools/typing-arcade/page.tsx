import { TypingArcade } from "@/components/tools/TypingArcade"
import { ToolLayout } from "@/components/tools/ToolLayout"

export const metadata = {
    title: "Typing Arcade | Hello World Classes",
    description: "Play addictive typing games to improve speed. Cyber Defense, Neon Rush, and more.",
}

export default function TypingArcadePage() {
    return (
        <ToolLayout
            title="Typing Arcade"
            subtitle="Level up your typing skills with these high-octane games. From chill vibes to hardcore boss battles."
            fullWidth={true}
        >
            <TypingArcade />
        </ToolLayout>
    )
}
