export type Question = {
    id: string;
    title: string;
    description: string;
    difficulty: "Easy" | "Medium" | "Hard";
    type: "code" | "text" | "web";
    language?: string;
    initialCode?: string;
    expectedOutput?: string;
    validationRegex?: RegExp;
    hint?: string;
}

export type Topic = {
    title: string;
    questions: Question[];
}

export type TechCategory = {
    id: string;
    title: string;
    icon: string;
    topics: Topic[];
}

export const PRACTICE_DATA: TechCategory[] = [
    {
        id: "python",
        title: "Python 3",
        icon: "🐍",
        topics: [
            {
                title: "Basics & Variables (20 Questions)",
                questions: [
                    { id: "py-b-1", title: "Hello World", description: "Print 'Hello World' to the console.", difficulty: "Easy", type: "code", language: "python", initialCode: "# Print Hello World\n", expectedOutput: "Hello World" },
                    { id: "py-b-2", title: "Name Tag", description: "Create variable `name`='Alice' and print it.", difficulty: "Easy", type: "code", language: "python", initialCode: "name = 'Alice'\n", expectedOutput: "Alice" },
                    { id: "py-b-3", title: "Simple Math", description: "Print the result of 5 + 3.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "8" },
                    { id: "py-b-4", title: "Variable Logic", description: "x=10, y=20. Print x*y.", difficulty: "Easy", type: "code", language: "python", initialCode: "x=10\ny=20\n", expectedOutput: "200" },
                    { id: "py-b-5", title: "String Concat", description: "Print 'Hello' + ' ' + 'World'.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "Hello World" },
                    { id: "py-b-6", title: "Swap", description: "a=1, b=2. Swap and print '2 1'.", difficulty: "Medium", type: "code", language: "python", initialCode: "a=1\nb=2\n# Swap\nprint(a, b)", expectedOutput: "2 1" },
                    { id: "py-b-7", title: "Type Check", description: "Print the type of 5.5 using type().", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "<class 'float'>" },
                    { id: "py-b-8", title: "Integer Cast", description: "Convert '10' to int and add 5. Print result.", difficulty: "Easy", type: "code", language: "python", initialCode: "s='10'\n", expectedOutput: "15" },
                    { id: "py-b-9", title: "Formatted String", description: "age=25. Print 'I am 25'. Use f-string.", difficulty: "Easy", type: "code", language: "python", initialCode: "age=25\n", expectedOutput: "I am 25" },
                    { id: "py-b-10", title: "Boolean Logic", description: "Print True if 10 > 5 else False.", difficulty: "Easy", type: "code", language: "python", initialCode: "print(10 > 5)", expectedOutput: "True" },
                    { id: "py-b-11", title: "Modulo", description: "Print remainder of 10 divided by 3.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "1" },
                    { id: "py-b-12", title: "Exponent", description: "Print 2 to the power of 3.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "8" },
                    { id: "py-b-13", title: "Float Div", description: "Print 10 divided by 4 (float).", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "2.5" },
                    { id: "py-b-14", title: "Floor Div", description: "Print 10 // 4.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "2" },
                    { id: "py-b-15", title: "Multiple Assign", description: "x, y, z = 1, 2, 3. Print z.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "3" },
                    { id: "py-b-16", title: "Reassignment", description: "x=5. x=x+5. Print x.", difficulty: "Easy", type: "code", language: "python", initialCode: "x=5\n", expectedOutput: "10" },
                    { id: "py-b-17", title: "Input Mock", description: "Set name='Bob'. Print 'Hello Bob'.", difficulty: "Easy", type: "code", language: "python", initialCode: "name='Bob'\n", expectedOutput: "Hello Bob" },
                    { id: "py-b-18", title: "Constant Case", description: "PI = 3.14. Print PI.", difficulty: "Easy", type: "code", language: "python", initialCode: "PI=3.14\n", expectedOutput: "3.14" },
                    { id: "py-b-19", title: "String Repeat", description: "Print 'Na' * 5.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "NaNaNaNaNa" },
                    { id: "py-b-20", title: "Length", description: "Print len('Python').", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "6" },
                ]
            },
            {
                title: "Loops (For/While) (20 Questions)",
                questions: [
                    { id: "py-l-1", title: "1 to 5", description: "Print 1 to 5 using a loop (each on new line).", difficulty: "Easy", type: "code", language: "python", initialCode: "for i in range(1, 6):\n    print(i)", expectedOutput: "1\n2\n3\n4\n5" },
                    { id: "py-l-2", title: "Sum 1-10", description: "Calculate sum of 1 to 10. Print result.", difficulty: "Medium", type: "code", language: "python", initialCode: "total = 0\n", expectedOutput: "55" },
                    { id: "py-l-3", title: "Even Numbers", description: "Print even numbers from 2 to 10.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "2\n4\n6\n8\n10" },
                    { id: "py-l-4", title: "Table of 5", description: "Print the table of 5 (5, 10... 50).", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "5\n10\n15\n20\n25\n30\n35\n40\n45\n50" },
                    { id: "py-l-5", title: "List Loop", description: "items=[1,2,3]. Print each item.", difficulty: "Easy", type: "code", language: "python", initialCode: "items=[1,2,3]\n", expectedOutput: "1\n2\n3" },
                    { id: "py-l-6", title: "Countdown", description: "Print 5 to 1.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "5\n4\n3\n2\n1" },
                    { id: "py-l-7", title: "Char Loop", description: "Print each char in 'Code'.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "C\no\nd\ne" },
                    { id: "py-l-8", title: "While Loops", description: "Print 1 to 3 using while loop.", difficulty: "Easy", type: "code", language: "python", initialCode: "i=1\nwhile i<=3:\n    print(i)\n    i+=1", expectedOutput: "1\n2\n3" },
                    { id: "py-l-9", title: "Break Statement", description: "Loop 1-10 but break at 5. Print 1,2,3,4,5.", difficulty: "Medium", type: "code", language: "python", initialCode: "", expectedOutput: "1\n2\n3\n4\n5" },
                    { id: "py-l-10", title: "Continue Statement", description: "Loop 1-5, skip 3. Print 1,2,4,5.", difficulty: "Medium", type: "code", language: "python", initialCode: "", expectedOutput: "1\n2\n4\n5" },
                    { id: "py-l-11", title: "Factorial 5", description: "Calc 5! (120). Print result.", difficulty: "Medium", type: "code", language: "python", initialCode: "", expectedOutput: "120" },
                    { id: "py-l-12", title: "Square Numbers", description: "Print squares of 1,2,3 -> 1,4,9.", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "1\n4\n9" },
                    { id: "py-l-13", title: "Sum List", description: "nums=[10,10,10]. Sum and print.", difficulty: "Easy", type: "code", language: "python", initialCode: "nums=[10,10,10]\n", expectedOutput: "30" },
                    { id: "py-l-14", title: "Max in List", description: "Find max in [5, 1, 9, 2]. Print it.", difficulty: "Medium", type: "code", language: "python", initialCode: "l=[5,1,9,2]\n", expectedOutput: "9" },
                    { id: "py-l-15", title: "Count Vowels", description: "Count 'a' in 'banana'. Print count.", difficulty: "Medium", type: "code", language: "python", initialCode: "s='banana'\n", expectedOutput: "3" },
                    { id: "py-l-16", title: "Nested Loop", description: "Print '1 1', '1 2' for i=1,j=1..2.", difficulty: "Hard", type: "code", language: "python", initialCode: "", expectedOutput: "1 1\n1 2" },
                    { id: "py-l-17", title: "Loop Else", description: "Loop 1-3. After loop print 'Done'.", difficulty: "Medium", type: "code", language: "python", initialCode: "", expectedOutput: "1\n2\n3\nDone" },
                    { id: "py-l-18", title: "Step Range", description: "Print 0, 2, 4. Use range(0,5,2).", difficulty: "Easy", type: "code", language: "python", initialCode: "", expectedOutput: "0\n2\n4" },
                    { id: "py-l-19", title: "Reverse String", description: "Reverse 'abc' using loop. Print 'cba'.", difficulty: "Medium", type: "code", language: "python", initialCode: "s='abc'\n", expectedOutput: "cba" },
                    { id: "py-l-20", title: "Fibonacci 5", description: "Print first 5 fib numbers: 0 1 1 2 3 (newline sep).", difficulty: "Hard", type: "code", language: "python", initialCode: "", expectedOutput: "0\n1\n1\n2\n3" },
                ]
            }
        ]
    },
    {
        id: "cpp",
        title: "C++",
        icon: "⚡",
        topics: [
            {
                title: "Basics & I/O (20 Questions)",
                questions: [
                    { id: "cpp-b-1", title: "Hello World", description: "Print 'Hello World'.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "#include <iostream>\nint main() {\n    // Print Hello World\n}", expectedOutput: "Hello World" },
                    { id: "cpp-b-2", title: "Add Two Integers", description: "Print the sum of 10 and 20.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "#include <iostream>\nint main() {\n    int a = 10, b = 20;\n    std::cout << a+b;\n}", expectedOutput: "30" },
                    { id: "cpp-b-3", title: "Subtract", description: "Print 100 - 50.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "50" },
                    { id: "cpp-b-4", title: "Multiply", description: "Print 5 * 5.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "25" },
                    { id: "cpp-b-5", title: "Divide", description: "Print 10 / 2.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "5" },
                    { id: "cpp-b-6", title: "Modulus", description: "Print 10 % 3.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "1" },
                    { id: "cpp-b-7", title: "Inc/Dec", description: "int x=5; x++; print x.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "6" },
                    { id: "cpp-b-8", title: "Sizeof", description: "Print sizeof(int). (Assuming 4)", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "4" },
                    { id: "cpp-b-9", title: "Char Output", description: "Print 'A'.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "A" },
                    { id: "cpp-b-10", title: "Float Output", description: "Print 3.14.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "3.14" },
                    { id: "cpp-b-11", title: "New Line", description: "Print 'Hi' then 'Bye' on new lines.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "Hi\nBye" },
                    { id: "cpp-b-12", title: "Tab Space", description: "Print 'A\\tB'.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "A\tB" },
                    { id: "cpp-b-13", title: "Boolean", description: "Print 1 (true) or 0 (false) for 5>2.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "1" },
                    { id: "cpp-b-14", title: "Swap logic", description: "a=1, b=2. Swap and print '2 1'.", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "2 1" },
                    { id: "cpp-b-15", title: "Constant", description: "const int X=10; Print X.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "10" },
                    { id: "cpp-b-16", title: "ASCII Value", description: "Print int value of 'A' (65).", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "65" },
                    { id: "cpp-b-17", title: "Simple Interest", description: "P=100, R=5, T=1. Print SI (5).", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "5" },
                    { id: "cpp-b-18", title: "Area Square", description: "Side=4. Print Area (16).", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "16" },
                    { id: "cpp-b-19", title: "Comments", description: "Write a comment and print 'Code'.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "Code" },
                    { id: "cpp-b-20", title: "Type Cast", description: "Print (int)3.9.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "3" },
                ]
            },
            {
                title: "Conditionals & Loops (20 Questions)",
                questions: [
                    { id: "cpp-l-1", title: "Check Even", description: "Print 'Even' if 10 is even.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "Even" },
                    { id: "cpp-l-2", title: "Check Positive", description: "Print 'Pos' if 5 > 0.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "Pos" },
                    { id: "cpp-l-3", title: "Max of Two", description: "Print max of 10, 20.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "20" },
                    { id: "cpp-l-4", title: "Grade Check", description: "Score=90. If >=90 print 'A'.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "A" },
                    { id: "cpp-l-5", title: "For Loop 1-5", description: "Print 1 to 5.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "1\n2\n3\n4\n5" },
                    { id: "cpp-l-6", title: "While Loop 1-3", description: "Print 1 2 3 using while.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "1\n2\n3" },
                    { id: "cpp-l-7", title: "Do-While", description: "Print 'Run' once using do-while.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "Run" },
                    { id: "cpp-l-8", title: "Sum 1-10", description: "Sum 1 to 10 loop. Print 55.", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "55" },
                    { id: "cpp-l-9", title: "Factorial 5", description: "Calc 5! (120).", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "120" },
                    { id: "cpp-l-10", title: "Table 2", description: "Print 2,4,6...20.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20" },
                    { id: "cpp-l-11", title: "Reverse 1-5", description: "Print 5 4 3 2 1.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "5\n4\n3\n2\n1" },
                    { id: "cpp-l-12", title: "Break Test", description: "Loop 1-5 break at 3. Print 1 2 3.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "1\n2\n3" },
                    { id: "cpp-l-13", title: "Continue Test", description: "Loop 1-5 skip 3. Print 1 2 4 5.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "1\n2\n4\n5" },
                    { id: "cpp-l-14", title: "Check Vowel", description: "Char 'a'. If vowel print 'Vowel'.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "Vowel" },
                    { id: "cpp-l-15", title: "Switch Case", description: "Day=1. Switch 1->'Mon'. Print 'Mon'.", difficulty: "Easy", type: "code", language: "cpp", initialCode: "", expectedOutput: "Mon" },
                    { id: "cpp-l-16", title: "Powers of 2", description: "Print 2, 4, 8, 16.", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "2\n4\n8\n16" },
                    { id: "cpp-l-17", title: "Nested Loop", description: "Print '*' 2x2 grid.", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "**\n**" },
                    { id: "cpp-l-18", title: "Prime Check", description: "Is 7 prime? Print 'Yes'.", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "Yes" },
                    { id: "cpp-l-19", title: "Count Digits", description: "Num 123. Count digits (3).", difficulty: "Medium", type: "code", language: "cpp", initialCode: "", expectedOutput: "3" },
                    { id: "cpp-l-20", title: "Reverse Num", description: "123 -> 321. Print 321.", difficulty: "Hard", type: "code", language: "cpp", initialCode: "", expectedOutput: "321" },
                ]
            }
        ]
    },
    {
        id: "web",
        title: "HTML & CSS",
        icon: "🌐",
        topics: [
            {
                title: "HTML Structure (10 Questions)",
                questions: [
                    { id: "web-1", title: "Button", description: "Create a <button> with text 'Go'.", difficulty: "Easy", type: "text", validationRegex: /<button>Go<\/button>/i },
                    { id: "web-2", title: "Bold Text", description: "Make 'Hello' bold using <b>.", difficulty: "Easy", type: "text", validationRegex: /<b>Hello<\/b>/i },
                    { id: "web-3", title: "Image", description: "Img tag with src='a.jpg'.", difficulty: "Easy", type: "text", validationRegex: /<img\s+src=['"]a\.jpg['"]\s*\/?>/i },
                    { id: "web-4", title: "Link", description: "Anchor link to 'google.com'.", difficulty: "Easy", type: "text", validationRegex: /<a\s+href=['"]google\.com['"]>.*<\/a>/i },
                    { id: "web-5", title: "Input", description: "Text input field.", difficulty: "Easy", type: "text", validationRegex: /<input\s+type=['"]text['"]\s*\/?>/i },
                    { id: "web-6", title: "Paragraph", description: "P tag with 'Text'.", difficulty: "Easy", type: "text", validationRegex: /<p>Text<\/p>/i },
                    { id: "web-7", title: "Div", description: "Empty div with class 'box'.", difficulty: "Easy", type: "text", validationRegex: /<div\s+class=['"]box['"]><\/div>/i },
                    { id: "web-8", title: "Heading 1", description: "H1 with 'Title'.", difficulty: "Easy", type: "text", validationRegex: /<h1>Title<\/h1>/i },
                    { id: "web-9", title: "Line Break", description: "br tag.", difficulty: "Easy", type: "text", validationRegex: /<br\s*\/?>/i },
                    { id: "web-10", title: "List Item", description: "li with 'Item'.", difficulty: "Easy", type: "text", validationRegex: /<li>Item<\/li>/i },
                ]
            }
        ]
    },
    {
        id: "excel",
        title: "Excel Formulas",
        icon: "📊",
        topics: [
            {
                title: "Basic Math (10 Questions)",
                questions: [
                    { id: "xl-1", title: "Sum", description: "Sum A1 to A5.", difficulty: "Easy", type: "text", validationRegex: /^=SUM\(A1:A5\)$/i },
                    { id: "xl-2", title: "Average", description: "Avg B1 to B5.", difficulty: "Easy", type: "text", validationRegex: /^=AVERAGE\(B1:B5\)$/i },
                    { id: "xl-3", title: "Count", description: "Count numbers in C1:C5.", difficulty: "Easy", type: "text", validationRegex: /^=COUNT\(C1:C5\)$/i },
                    { id: "xl-4", title: "Max", description: "Max of D1:D5.", difficulty: "Easy", type: "text", validationRegex: /^=MAX\(D1:D5\)$/i },
                    { id: "xl-5", title: "Min", description: "Min of E1:E5.", difficulty: "Easy", type: "text", validationRegex: /^=MIN\(E1:E5\)$/i },
                    { id: "xl-6", title: "Today", description: "Current date formula.", difficulty: "Easy", type: "text", validationRegex: /^=TODAY\(\)$/i },
                    { id: "xl-7", title: "Upper", description: "Uppercase A1.", difficulty: "Easy", type: "text", validationRegex: /^=UPPER\(A1\)$/i },
                    { id: "xl-8", title: "Lower", description: "Lowercase B1.", difficulty: "Easy", type: "text", validationRegex: /^=LOWER\(B1\)$/i },
                    { id: "xl-9", title: "Len", description: "Length of text in C1.", difficulty: "Easy", type: "text", validationRegex: /^=LEN\(C1\)$/i },
                    { id: "xl-10", title: "Trim", description: "Trim spaces A2.", difficulty: "Easy", type: "text", validationRegex: /^=TRIM\(A2\)$/i },
                ]
            }
        ]
    },
    {
        id: "sql",
        title: "SQL / MySQL",
        icon: "🗄️",
        topics: [
            {
                title: "SELECT Queries",
                questions: [
                    { id: "sql-1", title: "Select All", description: "Select all data from 'employees'.", difficulty: "Easy", type: "code", language: "sql", initialCode: "-- Write query below\n", expectedOutput: "id|name|role\n1|Alice|Dev", hint: "SELECT * FROM ..." },
                    { id: "sql-2", title: "Filter WHERE", description: "Select names from 'users' where age > 18.", difficulty: "Medium", type: "code", language: "sql", initialCode: "SELECT name FROM users WHERE ...", expectedOutput: "Bob\nCharlie" }
                ]
            }
        ]
    }
]
