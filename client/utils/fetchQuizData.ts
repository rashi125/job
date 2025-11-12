// utils/fetchQuizData.ts
import { auth } from "@/components/firebaseConfig";

export interface QuizData {
  course: string;
  level: string;
  score: number;
  total: number;
  timestamp: string;
}

export const fetchQuizData = async (): Promise<QuizData[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("⚠️ No logged-in user found!");
    return [];
  }

  // ✅ Get Firebase ID token securely
  const idToken = await user.getIdToken();

  try {
    const response = await fetch("http://127.0.0.1:5000/fetch_quiz_data", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      console.error("❌ Failed to fetch data:", response.statusText);
      return [];
    }

    const data = await response.json();
    console.log("✅ Received data from backend:", data);
    return data;
  } catch (error) {
    console.error("🔥 Error fetching quiz data:", error);
    return [];
  }
};
