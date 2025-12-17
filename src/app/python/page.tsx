import Link from "next/link"
import { ArrowRight, BookOpen, Terminal, Video } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { TrustBadges } from "@/components/retention/TrustBadges"

export default function PythonHubPage() {
    return (
        <div className="py-32 container mx-auto px-4 text-center max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                Learn <span className="text-gradient">Python 3</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
                The world's most popular programming language. Simple, powerful, and beginner-friendly.
                Start your journey here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-left">
                <Link href="/python-loops" className="group">
                    <Card className="hover:border-primary/50 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                                <Terminal className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary">Master Loops</h3>
                                <p className="text-gray-500 text-sm">Understand For and While loops. Stop writing repetitive code.</p>
                                <span className="text-primary text-sm font-semibold mt-3 inline-flex items-center">
                                    Start Lesson <ArrowRight className="ml-1 h-3 w-3" />
                                </span>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link href="/python-functions" className="group">
                    <Card className="hover:border-primary/50 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary">Functions & Modules</h3>
                                <p className="text-gray-500 text-sm">Write cleaner code by organizing logic into reusable blocks.</p>
                                <span className="text-primary text-sm font-semibold mt-3 inline-flex items-center">
                                    Start Lesson <ArrowRight className="ml-1 h-3 w-3" />
                                </span>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>

            <TrustBadges />
        </div>
    )
}
