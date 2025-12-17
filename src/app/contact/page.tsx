import { Navbar } from "@/components/layout/Navbar"
import { Mail, MessageCircle, MapPin } from "lucide-react"

export const metadata = {
    title: "Contact Us | Hello World Classes",
    description: "Get in touch with us.",
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold font-heading mb-6 text-center">Get in <span className="text-primary">Touch</span></h1>
                    <p className="text-center text-gray-600 mb-12">
                        Have questions? Stuck on a bug? Or just want to say hi? We'd love to hear from you.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100 hover:border-primary/20 transition-colors">
                            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <Mail className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold mb-1">Email</h3>
                            <p className="text-sm text-gray-500">support@helloworld.com</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100 hover:border-primary/20 transition-colors">
                            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <MessageCircle className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold mb-1">Discord</h3>
                            <p className="text-sm text-gray-500">Join our community</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100 hover:border-primary/20 transition-colors">
                            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold mb-1">Location</h3>
                            <p className="text-sm text-gray-500">Online Everywhere</p>
                        </div>
                    </div>

                    <form className="space-y-4 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Message</label>
                            <textarea className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
