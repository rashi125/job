import { useEffect, useState } from "react";
import { fetchQuizData, QuizData } from "@/utils/fetchQuizData";
import LineChartView from "@/components/LinearChartView";
import BarChartView from "@/components/BarChartView";

export default function ProgressReport() {
  const [data, setData] = useState<QuizData[]>([]);
  const [viewType, setViewType] = useState<"line" | "bar">("line");

  useEffect(() => {
    (async () => {
      const quizData = await fetchQuizData();
      setData(quizData);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        📊 Your Quiz Progress Report
      </h1>

      <div className="mb-6">
        <button
          className={`px-4 py-2 rounded-l-lg ${
            viewType === "line"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setViewType("line")}
        >
          Line Chart
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${
            viewType === "bar"
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
          viewType === "line" ? (
            <LineChartView data={data} />
          ) : (
            <BarChartView data={data} />
          )
        ) : (
          <p className="text-gray-600 text-center">
            No quiz data found. Take some quizzes to view your progress 📘
          </p>
        )}
      </div>
    </div>
  );
}
