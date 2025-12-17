import { TopicLayout } from "@/components/layout/TopicLayout"

export default function PythonLoopsPage() {
    return (
        <TopicLayout
            title="Python Loops Explained"
            subtitle="Automate boring tasks by making your code repeat itself."
            toolLink="/tools#code-playground"
            videoLink="https://youtube.com" // Placeholder
            prevTopic={{ name: "Python Basics", href: "/python" }}
            nextTopic={{ name: "Functions", href: "/python-functions" }}
            content={
                <div className="space-y-8 text-gray-700">
                    <p>
                        Imagine you want to print "Hello" 100 times. You could write the print statement 100 times, OR you could use a loop.
                        Loops allow you to execute a block of code multiple times efficiently.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900">1. The For Loop</h3>
                    <p>
                        Best when you know exactly how many times you want to loop (e.g., "for every item in this list").
                    </p>
                    <div className="bg-gray-900 text-gray-200 p-6 rounded-xl font-mono text-sm leading-loose shadow-lg">
                        <span className="text-purple-400">fruits</span> = [<span className="text-green-400">"apple"</span>, <span className="text-green-400">"banana"</span>, <span className="text-green-400">"cherry"</span>]<br />
                        <span className="text-pink-400">for</span> fruit <span className="text-pink-400">in</span> fruits:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">print</span>(fruit)
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mt-8">2. The While Loop</h3>
                    <p>
                        Best when you want to loop UNTIL a condition changes (e.g., "keep asking for password until correct").
                        <strong> Be careful!</strong> If the condition never changes, you'll get an <em>infinite loop</em>.
                    </p>
                    <div className="bg-gray-900 text-gray-200 p-6 rounded-xl font-mono text-sm leading-loose shadow-lg">
                        <span className="text-purple-400">count</span> = 5<br />
                        <span className="text-pink-400">while</span> count &gt; 0:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-400">print</span>(count)<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;count = count - 1
                    </div>
                </div>
            }
        />
    )
}
