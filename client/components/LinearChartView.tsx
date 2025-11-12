import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { QuizData } from "@/utils/fetchQuizData";

export default function LineChartView({ data }: { data: QuizData[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="course" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="#8b5cf6" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
