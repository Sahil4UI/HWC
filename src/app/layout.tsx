import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hello World Classes | Free Coding Courses in Hindi",
    template: "%s | Hello World Classes"
  },
  description: "Learn Python, Web Development, and AI for free in Hindi/Hinglish. Join the best coding community for Indian students. No jargon, just practical skills.",
  keywords: ["Free Coding Course", "Python in Hindi", "Web Development Course Free", "React JS Hindi", "Learn Coding India", "Hello World Classes", "Full Stack Development", "Data Analytics Hindi"],
  authors: [{ name: "Hello World Classes Team" }],
  creator: "Hello World Classes",
  publisher: "Hello World Classes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://helloworldclasses.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hello World Classes | Master Coding in Hindi",
    description: "Free, high-quality coding courses in Python, Web Dev, and AI. Built for Indian students.",
    url: 'https://helloworldclasses.com',
    siteName: 'Hello World Classes',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hello World Classes",
    description: "Learn Coding for Free in Hindi. Python, Web Dev & More.",
    creator: '@helloworldclasses',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} antialiased font-sans bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
