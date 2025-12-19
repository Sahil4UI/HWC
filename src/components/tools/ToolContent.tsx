import React from 'react';
import { Lightbulb, CheckCircle2, HelpCircle, BookOpen } from 'lucide-react';

interface ToolContentProps {
    toolName: string;
    howToUse: { title: string; desc: string }[];
    whyUse: string[];
    faq?: { question: string; answer: string }[];
}

export function ToolContent({ toolName, howToUse, whyUse, faq }: ToolContentProps) {
    return (
        <div className="mt-16 border-t border-white/10 pt-16">
            <div className="grid lg:grid-cols-2 gap-12">

                {/* How to Use Section */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold text-white">How to use {toolName}?</h2>
                    </div>
                    <div className="space-y-6">
                        {howToUse.map((step, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold border border-white/10 group-hover:bg-primary group-hover:text-black transition-colors">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-200 text-lg mb-1">{step.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use Section */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Lightbulb className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-2xl font-bold text-white">Why use this tool?</h2>
                    </div>
                    <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 space-y-4">
                        {whyUse.map((reason, idx) => (
                            <div key={idx} className="flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300 leading-relaxed">{reason}</span>
                            </div>
                        ))}
                    </div>

                    {/* Hello World Classes Branding */}
                    <div className="mt-8 bg-black/40 rounded-xl p-6 border border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h3 className="text-lg font-bold text-white mb-2 relative z-10">Trusted by Hello World Classes</h3>
                        <p className="text-sm text-slate-400 relative z-10">
                            We build these free tools to help our community of Indian developers and students save time.
                            No ads, no data collection—just utility.
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Section (Optional) */}
            {faq && faq.length > 0 && (
                <div className="mt-16">
                    <div className="flex items-center gap-3 mb-6">
                        <HelpCircle className="w-6 h-6 text-purple-400" />
                        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faq.map((item, idx) => (
                            <div key={idx} className="bg-zinc-900 border border-white/5 rounded-lg p-5">
                                <h4 className="font-bold text-white mb-2">{item.question}</h4>
                                <p className="text-slate-400 text-sm">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
