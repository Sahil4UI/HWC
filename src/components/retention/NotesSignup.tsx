"use client"

import { useState } from "react"
import { Send, FileDown, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export function NotesSignup() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubmitted(true)
            // Simulating API call
            setTimeout(() => {
                // Reset after a while for demo purposes if needed
                // setSubmitted(false) 
            }, 5000)
        }
    }

    return (
        <Card className="max-w-xl mx-autobg-gradient-to-br from-indigo-50 to-purple-50 border-primary/20 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileDown className="h-32 w-32 text-primary" />
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold font-heading mb-2">Get Free Python Cheatsheets</h3>
                <p className="text-gray-600 mb-6">
                    Don't waste time taking messy notes. We've summarized the entire Python course into beautiful PDFs.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <Button type="submit" className="flex-shrink-0">
                            <Send className="w-4 h-4 mr-2" /> Send Me Notes
                        </Button>
                    </form>
                ) : (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center justify-center gap-2 animate-fade-in">
                        <Check className="h-5 w-5" />
                        <span className="font-semibold">Check your inbox! The notes are on their way.</span>
                    </div>
                )}

                <p className="text-xs text-gray-400 mt-4">
                    We hate spam too. Unsubscribe anytime.
                </p>
            </div>
        </Card>
    )
}
