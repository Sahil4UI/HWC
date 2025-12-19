import { HtmlPdfTool } from "@/components/tools/HtmlPdfTool"
import { ToolLayout } from "@/components/tools/ToolLayout"
import { ToolContent } from "@/components/tools/ToolContent"

export const metadata = {
    title: "HTML to PDF Converter | Hello World Classes",
    description: "Convert HTML/CSS code to high-quality PDF. Live preview, A4/Letter sizing, and instant download for developers and invoices.",
}

export default function HtmlToPdfPage() {
    return (
        <ToolLayout
            title="HTML to PDF Converter"
            subtitle="Developer-friendly tool to convert raw HTML & CSS into professional PDFs. Perfect for invoices, reports, and documentation."
            fullWidth={true} // New prop needed likely, or just adjust layout
        >
            <HtmlPdfTool />

            <ToolContent
                toolName="HTML to PDF Converter"
                howToUse={[
                    { title: "Edit Code", desc: "Paste your HTML & CSS in the dark editor on the left. The default template gives you a head start for invoices." },
                    { title: "Preview", desc: "Watch the live preview on the right. You can zoom in/out or fit to screen to check the layout." },
                    { title: "Export", desc: "Click 'Download PDF' to instantly generate a high-quality PDF file. No server processing—it happens right in your browser." }
                ]}
                whyUse={[
                    "Client-Side Privacy: Your data never leaves your browser.",
                    "Pixel Perfect: What you see in the preview is exactly what you get.",
                    "Free Invoice Generator: Use our template to create professional bills in seconds."
                ]}
                faq={[
                    { question: "Can I use external CSS?", answer: "We recommend inline styles or <style> blocks for the most reliable results." },
                    { question: "Is it free for commercial use?", answer: "Yes! You can generate unlimited PDFs for free." }
                ]}
            />
        </ToolLayout>
    )
}
