export type LessonCategory = "Touch Typing" | "Key Drills" | "Word Drills" | "Code Drills";

export interface Lesson {
    id: string;
    title: string;
    category: LessonCategory;
    content: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const TYPING_LESSONS: Lesson[] = [
    // 1. Touch Typing Basics (Home Row)
    {
        id: "tt-1",
        title: "Home Row Basics (asdf jkl;)",
        category: "Touch Typing",
        content: "asdf jkl; asdf jkl; aa ss dd ff jj kk ll ;; asdf jkl; dad fad sad lad flask jask",
        difficulty: "Beginner"
    },
    {
        id: "tt-2",
        title: "Top Row (qwerty uiop)",
        category: "Touch Typing",
        content: "qwerty uiop qwerty uiop q w e r t y u i o p quiet porter power top tree were yet",
        difficulty: "Beginner"
    },
    {
        id: "tt-3",
        title: "Bottom Row (zxcv nm,.)",
        category: "Touch Typing",
        content: "zxcvbnm zxcv bnm z x c v b n m zebra xenon come van ban man name moon vertex",
        difficulty: "Beginner"
    },

    // 2. Key Drills (Special Characters)
    {
        id: "kd-1",
        title: "Brackets & Parentheses",
        category: "Key Drills",
        content: "() [] {} () [] {} (left right) [array index] {object scope} function() { returnArr[0]; }",
        difficulty: "Intermediate"
    },
    {
        id: "kd-2",
        title: "Symbols & Numbers",
        category: "Key Drills",
        content: "!@#$%^&*() 1234567890 email@example.com #hashtag $price 100% *pointer &reference",
        difficulty: "Intermediate"
    },

    // 3. Word Drills
    {
        id: "wd-1",
        title: "Common Programming Keywords",
        category: "Word Drills",
        content: "function return const let var if else switch case break continue while for import export class extends interface type",
        difficulty: "Intermediate"
    },
    {
        id: "wd-2",
        title: "Most Common English Words",
        category: "Word Drills",
        content: "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what",
        difficulty: "Beginner"
    },

    // 4. Code Drills
    {
        id: "cd-1",
        title: "Python Function",
        category: "Code Drills",
        content: "def calculate_factorial(n): if n == 0: return 1 else: return n * calculate_factorial(n-1) print(calculate_factorial(5))",
        difficulty: "Advanced"
    },
    {
        id: "cd-2",
        title: "React Component",
        category: "Code Drills",
        content: "const Button = ({ onClick, children }) => { return <button onClick={onClick} className='btn'>{children}</button>; }; export default Button;",
        difficulty: "Advanced"
    }
];
