"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

type NavItem = {
    name: string
    href: string
    badge?: string
}

const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: "Tools", href: "/tools" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || isOpen ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary/10 p-2 rounded-full border border-primary/20 group-hover:border-primary/50 transition-all">
                            <Image src="/logo.png" alt="Hello World Classes Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block">
                            HELLO<span className="text-primary">WORLD</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-bold transition-colors relative group",
                                    pathname === item.href ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" : "text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                                )}
                            >
                                {item.name}
                                {item.badge && (
                                    <span className="absolute -top-3 -right-6 text-[10px] font-bold bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                                    pathname === item.href ? "w-full" : ""
                                )} />
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div
                className={cn(
                    "md:hidden fixed inset-x-0 top-16 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl",
                    isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="flex flex-col p-4 gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-primary/5",
                                pathname === item.href ? "bg-primary/10 text-primary" : "text-foreground"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                {item.name}
                                {item.badge && (
                                    <span className="text-xs font-bold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}
