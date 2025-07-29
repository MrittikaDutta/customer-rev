from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load your trained clustering model
model = joblib.load("model.pkl")

# Mapping of cluster to business insight
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

    # Convert gender to numerical format (0 for Male, 1 for Female)
    gender = 0 if data['gender'].lower() == "male" else 1
    age = data['age']
    income = data['income']
    score = data.get('score', 50)  # Default score if not passed

    # Format input as required by model
    input_data = np.array([[gender, age, income, score]])

    # Predict cluster
    cluster = int(model.predict(input_data)[0])
    message = cluster_messages.get(cluster, "No description available.")

    return jsonify({"cluster": cluster, "message": message})

if __name__ == "__main__":
    app.run(debug=True)
