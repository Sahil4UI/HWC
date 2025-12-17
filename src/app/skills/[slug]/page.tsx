"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, Terminal, Code2, Database, Layout, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { Card } from "@/components/ui/Card"

// Skill Data Configuration
const skillsData: Record<string, {
    title: string;
    description: string;
    icon: any; // using any for component
    color: string;
    gradient: string;
    modules: string[];
    youtubeId?: string;
}> = {
    "python": {
        title: "Python Programming",
        description: "The most versatile language for beginners. Master Python from scratch to advanced concepts like OOP and Data Science libraries.",
        icon: Terminal,
        color: "text-yellow-400",
        gradient: "from-yellow-400 to-orange-500",
        modules: [
            "Introduction to Python & Variables",
            "Control Flow (If/Else, Loops)",
            "Functions & Modules",
            "Data Structures (Lists, Dicts)",
            "Object Oriented Programming (OOP)",
            "File Handling & Error Management",
            "Project: Build a CLI Tool"
        ]
    },
    "web-dev": {
        title: "Web Development",
        description: "Become a modern web developer. Learn HTML, CSS, JavaScript, and React to build stunning interactive websites.",
        icon: Code2,
        color: "text-blue-400",
        gradient: "from-blue-400 to-cyan-500",
        modules: [
            "HTML5 Semantic Structure",
            "CSS3 Styling & Flexbox/Grid",
            "JavaScript Basics to ES6+",
            "DOM Manipulation",
            "React Fundamentals",
            "State Management",
            "Project: Portfolio Website"
        ]
    },
    "full-stack": {
        title: "Full-Stack Development",
        description: "Master both frontend and backend. Build complete web applications using Next.js, Node.js, and Databases.",
        icon: Layout,
        color: "text-purple-400",
        gradient: "from-purple-400 to-pink-500",
        modules: [
            "Next.js App Router",
            "API Routes & Server Actions",
            "Database Design (PostgreSQL/MongoDB)",
            "Authentication (Auth.js)",
            "Deployment & DevOps",
            "Project: E-commerce Platform"
        ]
    },
    "data-analytics": {
        title: "Data Analytics",
        description: "Turn data into actionable insights. Learn SQL, Pandas, and Data Visualization techniques.",
        icon: Database,
        color: "text-green-400",
        gradient: "from-green-400 to-emerald-500",
        modules: [
            "SQL Fundamentals",
            "Python for Data Science",
            "Pandas & NumPy",
            "Data Cleaning & Preprocessing",
            "Visualization with Matplotlib",
            "Project: Sales Dashboard"
        ]
    }
}

export default function SkillDetailPage() {
    const params = useParams()
    const slug = params?.slug as string
    const skill = skillsData[slug]

    if (!skill) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-black text-white mb-4">404 - Skill Not Found</h1>
                <p className="text-slate-400 mb-8">The learning path you are looking for does not exist yet.</p>
                <Link href="/skills">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Skills
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30">
            <ParticleBackground />

            <div className="relative pt-24 pb-16 overflow-hidden">
                {/* Hero Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/skills" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to All Skills
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1">
                            <span className={`inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase mb-6 ${skill.color}`}>
                                Learning Path
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter mb-6 leading-tight">
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${skill.gradient} glitch-text`} data-text={skill.title}>
                                    {skill.title}
                                </span>
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed font-mono max-w-2xl mb-8 border-l-4 border-white/10 pl-6">
                                {skill.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className={`bg-white text-black hover:bg-slate-200 border-0 h-14 px-8 text-lg font-black uppercase tracking-widest rounded-none shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform clip-path-polygon`}>
                                    <Play className="mr-2 h-5 w-5 fill-black" />
                                    Start Learning
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 h-14 px-8 text-lg font-bold uppercase tracking-widest rounded-none">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    View Syllabus
                                </Button>
                            </div>
                        </div>

                        {/* Visual / Icon */}
                        <div className="relative hidden md:block">
                            <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} blur-[100px] opacity-20`}></div>
                            <div className="relative bg-white/5 border border-white/10 p-12 backdrop-blur-sm shadow-2xl">
                                <skill.icon className={`h-32 w-32 ${skill.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Section */}
            <section className="py-20 bg-black/50 border-t border-white/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black font-heading mb-12 flex items-center gap-3">
                        <Terminal className="h-8 w-8 text-primary" />
                        COURSE MODULES
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skill.modules.map((module, index) => (
                            <Card key={index} className="bg-white/5 border-white/10 p-6 flex items-start gap-4 hover:border-primary/50 transition-colors group rounded-none">
                                <div className={`mt-1 h-6 w-6 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-slate-400 group-hover:border-${skill.color.split('-')[1]}-400 group-hover:text-${skill.color.split('-')[1]}-400 transition-colors`}>
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{module}</h3>
                                    <p className="text-sm text-slate-500 font-mono">Core Concept • 2 Hours</p>
                                </div>
                                <CheckCircle className="ml-auto h-5 w-5 text-white/10 group-hover:text-primary transition-colors" />
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
