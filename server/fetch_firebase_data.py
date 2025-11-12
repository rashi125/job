import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd

# 🔹 Initialize Firebase Admin SDK (Service Account)
cred = credentials.Certificate("serviceAccountKey.json")  # <-- download from Firebase Console
firebase_admin.initialize_app(cred)
db = firestore.client()

def fetch_quiz_data(user_id: str) -> pd.DataFrame:
    """
    Fetch quiz data for a specific user and return as a pandas DataFrame.
    """
    quizzes_ref = db.collection("users").document(user_id).collection("quizzes")
    docs = quizzes_ref.stream()

    data = []
    for doc in docs:
        d = doc.to_dict()
        data.append({
            "course": d.get("course", "Unknown"),
            "level": d.get("level", "N/A"),
            "score": d.get("score", 0),
            "total": d.get("total", 10),
            "timestamp": d.get("timestamp")
        })

    df = pd.DataFrame(data)
    if not df.empty:
        df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")
    return df

if __name__ == "__main__":
    user_id = input("Enter user UID: ")
    df = fetch_quiz_data(user_id)
    print("\n✅ User Quiz Data:")
    print(df)
    df.to_csv("user_quiz_data.csv", index=False)
    print("\n📁 Saved as user_quiz_data.csv")
