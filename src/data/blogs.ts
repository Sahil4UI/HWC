import { BlogPost } from "@/types/blog";

export const BLOGS: BlogPost[] = [
    {
        id: "1",
        slug: "practice-arena-launch",
        title: "Launched: New Practice Arena for Python & C++",
        excerpt: "Master coding with our new LeetCode-style Practice Arena. Solve problems, run code instantly, and track your progress.",
        content: `
            <h2>Practice Arena is Live!</h2>
            <p>We are excited to announce the launch of our new **Practice Arena**. This tool allows you to write and execute Python and C++ code directly in the browser.</p>
            <h3>Features:</h3>
            <ul>
                <li><strong>Real-time Execution:</strong> Run your code and see output instantly.</li>
                <li><strong>Topic-wise Questions:</strong> From Basics to Loops and Arrays.</li>
                <li><strong>Progress Tracking:</strong> Your solved questions are saved automatically.</li>
            </ul>
            <p>Go to the Tools section and start practicing today!</p>
        `,
        coverImage: "/logo-main.png",
        author: {
            name: "Sahil",
            role: "Lead Developer",
            avatar: "/logo.png"
        },
        publishedAt: "2024-12-18T12:00:00Z",
        readTime: "2 min read",
        tags: [
            { id: "1", name: "New Feature", color: "text-green-400" },
            { id: "2", name: "Practice", color: "text-blue-400" }
        ],
        featured: true
    },
    {
        id: "2",
        slug: "cpp-support-added",
        title: "C++ Language Support Now Available",
        excerpt: "You asked, we listened. Support for C++ programming has been added to the Practice Arena with over 40+ questions.",
        content: `
            <h2>C++ is Here.</h2>
            <p>C++ is one of the most important languages for competitive programming and systems development. We have added a dedicated section for C++ in our Practice Arena.</p>
            <p>Start with basic Input/Output and master complex logic with our curated problem set.</p>
        `,
        coverImage: "/logo.png",
        author: {
            name: "Team HWC",
            role: "Content Team",
            avatar: "/logo.png"
        },
        publishedAt: "2024-12-17T10:00:00Z",
        readTime: "1 min read",
        tags: [
            { id: "3", name: "C++", color: "text-purple-400" },
            { id: "4", name: "Update", color: "text-yellow-400" }
        ]
    },
    {
        id: "3",
        slug: "typing-test-tool",
        title: "Improve Your Speed with Typing Test",
        excerpt: "Coding requires speed and accuracy. Test your WPM with our new minimalist Typing Speed Test tool.",
        content: `
            <h2>Type Faster, Code Better.</h2>
            <p>Our new Typing Test tool helps you measure your Words Per Minute (WPM) and accuracy. It features a distraction-free UI and real-time statistics.</p>
            <p>Check it out in the Tools menu!</p>
        `,
        coverImage: "/logo-main.png",
        author: {
            name: "Sahil",
            role: "Lead Developer",
            avatar: "/logo.png"
        },
        publishedAt: "2024-12-16T09:00:00Z",
        readTime: "1 min read",
        tags: [
            { id: "5", name: "Tool", color: "text-pink-400" },
            { id: "6", name: "Productivity", color: "text-cyan-400" }
        ]
    }
];
