import { TopicLayout } from "@/components/layout/TopicLayout"

export default function PythonFunctionsPage() {
    return (
        <TopicLayout
            title="Python Functions"
            subtitle="Don't Repeat Yourself (DRY). Organize code into reusable blocks."
            toolLink="/tools#code-playground"
            videoLink="https://youtube.com" // Placeholder
            prevTopic={{ name: "Loops", href: "/python-loops" }}
            nextTopic={{ name: "Modules", href: "/python" }}
            content={
                <div className="space-y-8 text-gray-700">
                    <p>
                        A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.
                        A function can return data as a result.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900">Why use functions?</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Reusability:</strong> Write code once, use it many times.</li>
                        <li><strong>Readability:</strong> Give a complex block of code a simple name.</li>
                        <li><strong>Debugging:</strong> Fix an error in one place, and it updates everywhere.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-8">Defining a Function</h3>
                    <p>In Python, a function is defined using the <code>def</code> keyword.</p>

                    <div className="bg-gray-900 text-gray-200 p-6 rounded-xl font-mono text-sm leading-loose shadow-lg">
                        <span className="text-pink-400">def</span> <span className="text-blue-400">greet_student</span>(name):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-green-400">"Hello, "</span> + name + <span className="text-green-400">"!"</span><br />
                        <br />
                        <span className="text-gray-500"># Calling the function</span><br />
                        <span className="text-yellow-400">print</span>(greet_student(<span className="text-green-400">"Sahil"</span>))
                    </div>
                </div>
            }
        />
    )
}
