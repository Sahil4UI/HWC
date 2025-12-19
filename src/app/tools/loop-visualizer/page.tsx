import { LoopVisualizer } from "@/components/tools/LoopVisualizer"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

export const metadata = {
    title: "Loop Logic Visualizer | Hello World Classes",
    description: "Visualize how for loops and while loops work step-by-step. Perfect for beginners struggling with iteration.",
}

export default function LoopVisualizerPage() {
    return (
        <ToolLayout
            title="Loop Logic Visualizer"
            subtitle="Loops are hard to visualize in your head. Watch them run step-by-step here."
            videoLink="https://youtube.com"
        >
            <LoopVisualizer />

            <ToolContent
                toolName="Loop Logic Visualizer"
                howToUse={[
                    { title: "Configure Loop", desc: "Choose For Loop or While Loop and set start/end values." },
                    { title: "Step Through", desc: "Use the arrow keys or buttons to move step-by-step." },
                    { title: "Visualize", desc: "Watch how variables (i, count) change in real-time." }
                ]}
                whyUse={[
                    "Mental Model: 'See' the loop logic instead of just reading code.",
                    "Debug Skills: Learn how execution flow jumps around.",
                    "Beginner Friendly: Perfect for those stuck on iteration."
                ]}
            />
        </ToolLayout>
    )
}
