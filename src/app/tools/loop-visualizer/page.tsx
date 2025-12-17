import { LoopVisualizer } from "@/components/tools/LoopVisualizer"
import { ToolLayout } from "@/components/tools/ToolLayout"

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
        </ToolLayout>
    )
}
