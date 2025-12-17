import Link from "next/link"
import { ArrowLeft, ArrowRight, PlayCircle, Terminal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadges } from "@/components/retention/TrustBadges"

interface TopicLayoutProps {
    title: string
    subtitle: string
    content: React.ReactNode
    toolLink?: string
    videoLink?: string
    prevTopic?: { name: string; href: string }
    nextTopic?: { name: string; href: string }
}

export function TopicLayout({ title, subtitle, content, toolLink, videoLink, prevTopic, nextTopic }: TopicLayoutProps) {
    return (
        <div className="py-32 container mx-auto px-4 max-w-4xl">

            {/* Breadcrumb / Back */}
            <div className="mb-8">
                <Link href="/python" className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Python Hub
                </Link>
            </div>

            {/* Hero */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gray-900">{title}</h1>
                <p className="text-xl text-gray-600 border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
                    {subtitle}
                </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg prose-indigo max-w-none mb-16">
                {content}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                {videoLink && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div>
                            <h3 className="text-xl font-bold text-red-900 mb-2">Watch Video Lesson</h3>
                            <p className="text-red-700 text-sm mb-4">Visual learner? Watch the full explanation on YouTube.</p>
                        </div>
                        <Link href={videoLink} target="_blank">
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-none">
                                <PlayCircle className="mr-2 h-5 w-5" /> Watch Now
                            </Button>
                        </Link>
                    </div>
                )}

                {toolLink && (
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div>
                            <h3 className="text-xl font-bold text-green-900 mb-2">Practice Interactive</h3>
                            <p className="text-green-700 text-sm mb-4">Don't just read. Write code and see the output instantly.</p>
                        </div>
                        <Link href={toolLink}>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white border-none">
                                <Terminal className="mr-2 h-5 w-5" /> Try Playground
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="border-t border-gray-200 pt-12 flex flex-col sm:flex-row justify-between gap-4">
                {prevTopic ? (
                    <Link href={prevTopic.href} className="group flex items-center gap-3 text-left">
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors">
                            <ArrowLeft className="h-5 w-5 text-gray-500 group-hover:text-primary" />
                        </div>
                        <div>
                            <span className="block text-xs text-gray-400 uppercase tracking-wider">Previous</span>
                            <span className="font-semibold text-gray-700 group-hover:text-primary">{prevTopic.name}</span>
                        </div>
                    </Link>
                ) : (<div></div>)}

                {nextTopic ? (
                    <Link href={nextTopic.href} className="group flex items-center gap-3 text-right flex-row-reverse">
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors">
                            <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-primary" />
                        </div>
                        <div>
                            <span className="block text-xs text-gray-400 uppercase tracking-wider">Next</span>
                            <span className="font-semibold text-gray-700 group-hover:text-primary">{nextTopic.name}</span>
                        </div>
                    </Link>
                ) : (<div></div>)}
            </div>

            <div className="mt-20">
                <TrustBadges />
            </div>

        </div>
    )
}
