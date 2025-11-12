import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def generate_charts(csv_path="user_quiz_data.csv"):
    # ✅ Compute absolute paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    charts_dir = os.path.join(base_dir, "charts")
    os.makedirs(charts_dir, exist_ok=True)

    csv_path = os.path.join(base_dir, csv_path)

    # ✅ Load CSV
    if not os.path.exists(csv_path):
        print(f"❌ CSV file not found: {csv_path}")
        return

    df = pd.read_csv(csv_path)
    if df.empty:
        print("⚠️ No data found in CSV!")
        return

    print("📊 Generating charts...")

    # ✅ Convert timestamp if available
    if "timestamp" in df.columns:
        df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")

    # 🔹 Line Chart: Quiz scores over time
    plt.figure(figsize=(10, 6))
    sns.lineplot(data=df, x="timestamp", y="score", hue="course", marker="o")
    plt.title("📈 Quiz Scores Over Time")
    plt.xlabel("Date")
    plt.ylabel("Score")
    plt.xticks(rotation=45)
    plt.tight_layout()
    line_path = os.path.join(charts_dir, "quiz_progress_line.png")
    plt.savefig(line_path)
    plt.close()
    print(f"✅ Saved line chart → {line_path}")

    # 🔹 Bar Chart: Average score by course and level
    plt.figure(figsize=(10, 6))
    sns.barplot(data=df, x="course", y="score", ci=None, hue="level")
    plt.title("📊 Average Scores by Course and Level")
    plt.xlabel("Course")
    plt.ylabel("Average Score")
    plt.tight_layout()
    bar_path = os.path.join(charts_dir, "quiz_progress_bar.png")
    plt.savefig(bar_path)
    plt.close()
    print(f"✅ Saved bar chart → {bar_path}")

if __name__ == "__main__":
    generate_charts()
