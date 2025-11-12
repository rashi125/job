import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { QuizData } from "@/utils/fetchQuizData";

export default function BarChartView({ data }: { data: QuizData[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="course" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
