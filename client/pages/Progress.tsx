import { useEffect, useState } from "react";
import { auth, db } from "@/components/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

interface QuizData {
    course: string;
    level: string;
    score: number;
    total: number;
    timestamp: string;
}

export default function ProgressReport() {
    const [data, setData] = useState<QuizData[]>([]);
    const [viewType, setViewType] = useState<"line" | "bar">("line");

    useEffect(() => {
        const fetchScores = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const quizRef = collection(db, "users", user.uid, "quizzes");
            const snapshot = await getDocs(quizRef);
            const quizData: QuizData[] = snapshot.docs.map((doc) => {
                const d = doc.data();
                return {
                    course: d.course || "Unknown",
                    level: d.level || "N/A",
                    score: d.score || 0,
                    total: d.total || 10,
                    timestamp: new Date(d.timestamp?.seconds * 1000).toLocaleDateString(),
                };
            });
            setData(quizData);
        };
        fetchScores();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-purple-700 mb-6">
                📊 Your Quiz Progress Report
            </h1>

            <div className="mb-6">
                <button
                    className={`px-4 py-2 rounded-l-lg ${viewType === "line"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setViewType("line")}
                >
                    Line Chart
                </button>
                <button
                    className={`px-4 py-2 rounded-r-lg ${viewType === "bar"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setViewType("bar")}
                >
                    Bar Chart
                </button>
            </div>

            <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-4xl">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        {viewType === "line" ? (
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="course" />
                                <YAxis domain={[0, 10]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#8b5cf6"
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        ) : (
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="course" />
                                <YAxis domain={[0, 10]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" fill="#8b5cf6" />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-600 text-center">
                        No quiz data found. Take some quizzes to view your progress 📘
                    </p>
                )}
            </div>
        </div>
    );
}
