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
function predict() {
  const gender = document.getElementById('gender').value;
  const age = Number(document.getElementById('age').value);
  const income = Number(document.getElementById('income').value);
  const score = Number(document.getElementById('score').value); // Optional if not used in backend

  if (!gender || !age || !income || !score) {
    alert('Please fill in all fields.');
    return;
  }

  const payload = {
    gender: gender,
    age: age,
    income: income
  };

  fetch("https://customer-r-3.onrender.com/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((data) => {
      const resultBox = document.getElementById("result");
      resultBox.style.display = "block";
      resultBox.innerText = `Predicted Customer Segment: Cluster ${data.cluster}\n${data.message}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Prediction failed. Is Flask running?");
    });
}


if __name__ == "__main__":
    app.run(debug=True)
