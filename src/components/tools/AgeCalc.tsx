"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Calendar, Clock, Cake } from "lucide-react"

export function AgeCalc() {
    const [dob, setDob] = useState("")
    const [age, setAge] = useState<{ years: number, months: number, days: number } | null>(null)
    const [nextBirthday, setNextBirthday] = useState<{ months: number, days: number, isToday: boolean } | null>(null)

    const calculateAge = () => {
        if (!dob) return

        const birthDate = new Date(dob)
        const today = new Date()

        let years = today.getFullYear() - birthDate.getFullYear()
        let months = today.getMonth() - birthDate.getMonth()
        let days = today.getDate() - birthDate.getDate()

        if (days < 0) {
            months--
            // Get days in previous month
            const prevMonthDate = new Date(today.getFullYear(), today.getMonth(), 0)
            days += prevMonthDate.getDate()
        }

        if (months < 0) {
            years--
            months += 12
        }

        setAge({ years, months, days })

        // Next Birthday Calculation
        const currentYear = today.getFullYear()
        let nextBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate())

        if (today > nextBday) {
            nextBday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate())
        }

        // Is it today?
        if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
            setNextBirthday({ months: 0, days: 0, isToday: true })
        } else {
            const diffTime = Math.abs(nextBday.getTime() - today.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

            // Simplification for UI
            setNextBirthday({ months: 0, days: diffDays, isToday: false })
        }
    }

    return (
        <div className="max-w-xl mx-auto">
            <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-8 shadow-2xl">

                {/* Input Section */}
                <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">Select your Date of Birth</h3>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="bg-black/50 border border-white/20 text-white rounded-lg px-8 py-4 text-xl outline-none focus:border-indigo-500 w-full text-center"
                    />
                    <Button
                        onClick={calculateAge}
                        disabled={!dob}
                        className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold h-12 uppercase tracking-widest shadow-lg shadow-indigo-500/20"
                    >
                        Calculate Age
                    </Button>
                </div>

                {/* Output Section */}
                {age && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                        <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-4 text-center">
                            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                <span className="block text-4xl font-black text-indigo-400 mb-1">{age.years}</span>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Years</span>
                            </div>
                            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                <span className="block text-4xl font-black text-purple-400 mb-1">{age.months}</span>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Months</span>
                            </div>
                            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                                <span className="block text-4xl font-black text-pink-400 mb-1">{age.days}</span>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Days</span>
                            </div>
                        </div>

                        {nextBirthday && (
                            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-xl p-6 flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Cake className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Next Birthday</h4>
                                    {nextBirthday.isToday ? (
                                        <p className="text-yellow-400 font-bold animate-pulse">🎉 Happy Birthday! It's Today! 🎂</p>
                                    ) : (
                                        <p className="text-slate-300 text-sm">
                                            Incoming in <span className="text-white font-bold">{nextBirthday.days} days</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}
