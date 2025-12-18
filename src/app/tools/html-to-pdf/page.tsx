import { HtmlPdfTool } from "@/components/tools/HtmlPdfTool"
import { ToolLayout } from "@/components/tools/ToolLayout"

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
        </ToolLayout>
    )
}
