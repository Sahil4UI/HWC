import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { ParticleBackground } from "@/components/ui/ParticleBackground"
import { BLOGS } from "@/data/blogs"
import { BlogSidebar } from "@/components/blogs/BlogSidebar"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

// Generate static params for all blogs
export function generateStaticParams() {
    return BLOGS.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage(props: PageProps) {
    const params = await props.params;
    const post = BLOGS.find((p) => p.slug === params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30">
            <ParticleBackground />
            <Navbar />

            <div className="relative pt-32 pb-20 container mx-auto px-4 lg:px-8 z-10">

                {/* Back Button */}
                <Link href="/blogs" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content Column */}
                    <div className="lg:col-span-8">
                        {/* Article Header */}
                        <div className="mb-10">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.map(tag => (
                                    <span key={tag.id} className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 ${tag.color}`}>
                                        {tag.name}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-heading mb-8 leading-tight text-white tracking-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-mono border-y border-white/10 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-white/10 overflow-hidden relative border border-white/20">
                                        <Image src="/logo-main.png" alt={post.author.name} fill className="object-contain" />
                                    </div>
                                    <div>
                                        <span className="block text-white font-bold">{post.author.name}</span>
                                        <span className="text-xs text-slate-500">{post.author.role}</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                                <span className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" /> {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" /> {post.readTime}
                                </span>
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="relative w-full aspect-video mb-12 rounded-none overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Rich Text Content */}
                        <article className="prose prose-invert prose-lg max-w-none 
                            prose-headings:font-heading prose-headings:font-bold prose-headings:text-white
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
                            prose-h3:text-2xl prose-h3:text-slate-200
                            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-white prose-strong:font-bold
                            prose-a:text-primary prose-a:no-underline prose-a:border-b prose-a:border-primary/50 hover:prose-a:border-primary hover:prose-a:text-white prose-a:transition-colors
                            prose-code:text-purple-400 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-black/80 prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl prose-pre:p-6
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:marker:text-primary
                            prose-li:text-slate-300 prose-li:mb-2
                            selection:bg-primary/30 selection:text-white">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </article>

                        {/* Article Footer */}
                        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span className="text-slate-500 font-mono text-sm">
                                Found this helpful? Share it with your developer friends.
                            </span>
                            <div className="flex gap-2">
                                <button className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest border border-white/10 transition-colors">
                                    <Share2 className="h-4 w-4" /> Share
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4">
                        <BlogSidebar />
                    </div>

                </div>
            </div>
        </div>
    )
}
