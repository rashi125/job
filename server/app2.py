# server/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, auth, firestore

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")  # your service account key
firebase_admin.initialize_app(cred)

app = Flask(__name__)
CORS(app)
db = firestore.client()

@app.route("/fetch_quiz_data", methods=["GET"])
def fetch_quiz_data():
    try:
        # ✅ Get Bearer token from frontend
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Missing Authorization header"}), 401

        id_token = auth_header.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]

        # ✅ Fetch quiz data for that user
        quizzes_ref = db.collection("users").document(uid).collection("quizzes")
        docs = quizzes_ref.stream()

        data = []
        for doc in docs:
            d = doc.to_dict()
            d["timestamp"] = d.get("timestamp").isoformat() if "timestamp" in d else None
            data.append(d)

        return jsonify(data)

    except Exception as e:
        print("🔥 Error fetching quiz data:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
