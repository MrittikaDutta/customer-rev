from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load("model.pkl")

# Example: Mapping clusters to insight messages
cluster_messages = {
    0: "Low income, younger group — may need cost-effective offers.",
    1: "Average income, moderate spenders — open to upselling.",
    2: "High income, high spenders — premium products recommended.",
    3: "High income, low spenders — attract with luxury offers.",
    4: "Young high spenders — very responsive to trends."
}

@app.route("/")
def home():
    return "Customer Segmentation API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    gender = data.get("gender")
    age = data.get("age")
    income = data.get("income")

    if gender not in ["Male", "Female"] or not isinstance(age, int) or not isinstance(income, int):
        return jsonify({"error": "Invalid input"}), 400

    gender_numeric = 1 if gender == "Male" else 0
    input_data = np.array([[gender_numeric, age, income]])
    
    cluster = int(model.predict(input_data)[0])
    message = cluster_messages.get(cluster, "Segment description not available.")

    return jsonify({"cluster": cluster, "message": message})

if __name__ == "__main__":
    app.run(debug=True)
