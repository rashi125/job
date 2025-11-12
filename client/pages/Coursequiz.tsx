

import { useState } from "react";
import { auth, db } from "@/components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// 🔹 Quiz Data by Course & Level
const quizBank: Record<
  string,
  Record<
    string,
    { question: string; options: string[]; answer: number }[]
  >
> = {
  frontend: {
    easy: [
      {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h1>", "<heading>", "<h6>", "<head>"],
        answer: 0,
      },
      {
        question: "Which CSS property changes text color?",
        options: ["font-color", "color", "text-style", "background-color"],
        answer: 1,
      },
    ],
    medium: [
      {
        question: "Which hook is used to manage state in React?",
        options: ["useData", "useEffect", "useState", "useRef"],
        answer: 2,
      },
      {
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JSON XML",
          "JavaScript Syntax Extra",
        ],
        answer: 0,
      },
    ],
    hard: [
      {
        question: "What is virtual DOM in React?",
        options: [
          "Actual browser DOM",
          "Lightweight copy of real DOM for diffing",
          "Database layer",
          "Server DOM API",
        ],
        answer: 1,
      },
      {
        question: "Which lifecycle method runs after render in class components?",
        options: [
          "componentDidMount",
          "shouldComponentUpdate",
          "componentWillMount",
          "getSnapshotBeforeUpdate",
        ],
        answer: 0,
      },
    ],
  },

  backend: {
    easy: [
      {
        question: "Which is a backend language?",
        options: ["React", "Node.js", "HTML", "CSS"],
        answer: 1,
      },
      {
        question: "Which database uses SQL?",
        options: ["MongoDB", "MySQL", "Firebase", "Redis"],
        answer: 1,
      },
    ],
    medium: [
      {
        question: "Express.js is a framework for?",
        options: ["React", "Node.js", "Python", "PHP"],
        answer: 1,
      },
      {
        question: "What is REST used for?",
        options: [
          "Designing APIs",
          "Rendering UI",
          "Database Querying",
          "Debugging JS",
        ],
        answer: 0,
      },
    ],
    hard: [
      {
        question: "Which HTTP method is idempotent?",
        options: ["POST", "PUT", "DELETE", "GET"],
        answer: 3,
      },
      {
        question: "ORM stands for?",
        options: [
          "Object Relational Mapping",
          "Open Resource Management",
          "Object Resource Model",
          "Operational Relational Method",
        ],
        answer: 0,
      },
    ],
  },

  Java: {
    easy: [
      {
        question: "What is JVM?",
        options: [
          "Java Virtual Machine",
          "Java Visual Machine",
          "Java Variable Method",
          "Just Virtual Machine",
        ],
        answer: 0,
      },
      {
        question: "Which keyword is used to define a class?",
        options: ["class", "define", "object", "struct"],
        answer: 0,
      },
      {
        question: "Java is a ___ language?",
        options: ["Object Oriented", "Functional", "Procedural", "Scripting"],
        answer: 0,
      },
    ],
    medium: [
      {
        question: "Default value of int in Java?",
        options: ["0", "null", "1", "-1"],
        answer: 0,
      },
      {
        question: "Which package contains the Scanner class?",
        options: ["java.util", "java.io", "java.lang", "java.net"],
        answer: 0,
      },
      {
        question: "Which keyword is used for inheritance?",
        options: ["extends", "implements", "inherits", "super"],
        answer: 0,
      },
      {
        question: "Which method is the entry point of a Java program?",
        options: ["main()", "start()", "run()", "init()"],
        answer: 0,
      },
    ],
    hard: [
      {
        question: "Which of these is a Java access modifier?",
        options: ["public", "open", "visible", "internal"],
        answer: 0,
      },
      {
        question: "Which exception is thrown when dividing by zero?",
        options: [
          "ArithmeticException",
          "NullPointerException",
          "IOException",
          "ArrayIndexOutOfBoundsException",
        ],
        answer: 0,
      },
      {
        question: "What does JDK stand for?",
        options: [
          "Java Development Kit",
          "Java Deployment Kit",
          "Java Debug Kit",
          "Java Design Kit",
        ],
        answer: 0,
      },
    ],
  },

  "App Development": {
    easy: [
      {
        question: "Which language is used for Android development?",
        options: ["Java", "Python", "C#", "Kotlin"],
        answer: 0,
      },
      {
        question: "What is APK?",
        options: [
          "Android Package Kit",
          "Application Package Key",
          "Android Program Kit",
          "App Package Key",
        ],
        answer: 0,
      },
      {
        question: "Which layout arranges elements vertically?",
        options: [
          "LinearLayout",
          "RelativeLayout",
          "FrameLayout",
          "ConstraintLayout",
        ],
        answer: 0,
      },
    ],
    medium: [
      {
        question: "Which file contains app resources?",
        options: ["res", "src", "lib", "assets"],
        answer: 0,
      },
      {
        question: "Which file is the main entry point of an Android app?",
        options: [
          "MainActivity.java",
          "App.java",
          "AndroidManifest.xml",
          "Main.xml",
        ],
        answer: 0,
      },
      {
        question: "Which method is called when an activity is created?",
        options: ["onCreate()", "onStart()", "onResume()", "main()"],
        answer: 0,
      },
    ],
    hard: [
      {
        question: "Which language is official for modern Android development?",
        options: ["Kotlin", "Java", "Python", "C++"],
        answer: 0,
      },
      {
        question: "What is the extension of Android app package?",
        options: [".apk", ".jar", ".exe", ".app"],
        answer: 0,
      },
      {
        question: "Which file defines permissions in Android?",
        options: [
          "AndroidManifest.xml",
          "build.gradle",
          "MainActivity.java",
          "res/values/strings.xml",
        ],
        answer: 0,
      },
    ],
  },

  Blockchain: {
    easy: [
      {
        question: "What is Blockchain?",
        options: ["Distributed ledger", "Database", "Cloud", "Server"],
        answer: 0,
      },
      {
        question: "Who created Bitcoin?",
        options: [
          "Satoshi Nakamoto",
          "Vitalik Buterin",
          "Elon Musk",
          "Bill Gates",
        ],
        answer: 0,
      },
      {
        question: "Which consensus algorithm does Bitcoin use?",
        options: [
          "Proof of Work",
          "Proof of Stake",
          "Delegated Proof of Stake",
          "PBFT",
        ],
        answer: 0,
      },
    ],
    medium: [
      {
        question: "A blockchain is composed of ___",
        options: ["Blocks", "Files", "Servers", "Nodes"],
        answer: 0,
      },
      {
        question: "What is a smart contract?",
        options: [
          "Self-executing contract",
          "Legal contract",
          "Manual transaction",
          "Bank contract",
        ],
        answer: 0,
      },
      {
        question: "Which platform is famous for smart contracts?",
        options: ["Ethereum", "Bitcoin", "Ripple", "Litecoin"],
        answer: 0,
      },
    ],
    hard: [
      {
        question: "What is a node in blockchain?",
        options: ["Network participant", "Block", "Transaction", "Ledger"],
        answer: 0,
      },
      {
        question: "What is immutability in blockchain?",
        options: ["Cannot be changed", "Easily modified", "Deleted", "Encrypted"],
        answer: 0,
      },
      {
        question: "Which blockchain type is public and decentralized?",
        options: [
          "Public blockchain",
          "Private blockchain",
          "Consortium blockchain",
          "Centralized ledger",
        ],
        answer: 0,
      },
    ],
  },

  Python: {
    easy: [
      {
        question: "Which keyword defines a function in Python?",
        options: ["def", "func", "function", "lambda"],
        answer: 0,
      },
      {
        question: "Which data type is mutable?",
        options: ["list", "tuple", "string", "int"],
        answer: 0,
      },
      {
        question: "Which operator is used for exponentiation?",
        options: ["**", "^", "*", "%"],
        answer: 0,
      },
    ],
    medium: [
      {
        question: "What does `len()` do?",
        options: [
          "Returns length",
          "Prints value",
          "Deletes value",
          "Converts type",
        ],
        answer: 0,
      },
      {
        question: "Which keyword is used for loops?",
        options: ["for", "while", "Both", "loop"],
        answer: 2,
      },
      {
        question: "Which symbol is used for comments?",
        options: ["#", "//", "/* */", "<!-- -->"],
        answer: 0,
      },
    ],
    hard: [
      {
        question: "What does `import` do?",
        options: ["Imports module", "Declares variable", "Executes code", "None"],
        answer: 0,
      },
      {
        question: "Which function reads user input?",
        options: ["input()", "read()", "scan()", "get()"],
        answer: 0,
      },
      {
        question: "Which method adds an element to a list?",
        options: ["append()", "add()", "insert()", "push()"],
        answer: 0,
      },
    ],
  },
};

// 🔹 MAIN COMPONENT
export default function CourseQuiz() {
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [start, setStart] = useState(false);

  const handleStart = () => {
    if (!course || !level) {
      alert("Please select both course and difficulty level!");
      return;
    }
    setStart(true);
    setCurrent(0);
    setAnswers([]);
    setScore(null);
  };

  const handleAnswer = (index: number) => {
    const newAns = [...answers];
    newAns[current] = index;
    setAnswers(newAns);
  };

  const next = async () => {
    if (answers[current] === undefined)
      return alert("Please select an answer!");

    const totalQ = quizBank[course][level].length;
    if (current === totalQ - 1) {
      const total = quizBank[course][level].reduce(
        (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
        0
      );
      setScore(total);

     
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("❌ No authenticated user found!");
          alert("You must be logged in to save your quiz results.");
          return;
        }
      const idToken = await user.getIdToken();
      console.log("🆔 User ID Token:", idToken);
        const quizRef = collection(db, "users", user.uid, "quizzes"); // consistent name
        await addDoc(quizRef, {
          course,
          level,
          score: total,
          total: totalQ,
          timestamp: new Date(),
        });

        console.log("✅ Quiz data saved successfully!");
      } catch (err) {
        console.error("🔥 Firestore save failed:", err);
        alert("Failed to save quiz results. Check console for details.");
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => current > 0 && setCurrent(current - 1);

  // 🟢 Step 1: Course + Level Selection
  if (!start)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4">
        <div className="backdrop-blur-lg bg-white/40 shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center border border-white/30 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-8 text-indigo-700">
            🎓 Start Your Quiz
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">-- Choose a Course --</option>
                {Object.keys(quizBank).map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">-- Choose Difficulty --</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <button
              onClick={handleStart}
              className="w-full mt-6 bg-indigo-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg"
            >
              🚀 Start Quiz
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    );

  // 🧠 Step 2: Quiz Questions
  const quiz = quizBank[course][level];
  const q = quiz[current];

  if (score !== null)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 p-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-xl w-full animate-fadeIn">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            🎉 Quiz Completed!
          </h2>
          <p className="text-xl mb-6">
            You scored{" "}
            <span className="font-bold">
              {score} / {quiz.length}
            </span>
          </p>
          <button
            onClick={() => {
              setStart(false);
              setCourse("");
              setLevel("");
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-md"
          >
            🔁 Try Another Quiz
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full animate-fadeIn">
        <h2 className="text-center text-4xl font-extrabold mb-8 text-indigo-700 capitalize">
          {course} ({level}) Quiz
        </h2>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {current + 1}. {q.question}
          </h3>

          <div className="grid gap-4 md:gap-6">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className={`block px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  answers[current] === i
                    ? "bg-indigo-200 border-2 border-indigo-500"
                    : "bg-gray-100 hover:bg-indigo-100"
                }`}
              >
                <input
                  type="radio"
                  checked={answers[current] === i}
                  onChange={() => handleAnswer(i)}
                  className="mr-3 accent-indigo-600 scale-125"
                />
                <span className="text-gray-700 text-lg">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all ${
              current === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            ⬅️ Prev
          </button>

          <button
            onClick={next}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition-all"
          >
            {current === quiz.length - 1 ? "Finish ➡️" : "Next ➡️"}
          </button>
        </div>
      </div>
    </div>
  );
}
