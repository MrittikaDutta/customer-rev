const descriptions = {
  0: "Low income, younger group — may need cost-effective offers.",
  1: "Average income, moderate spenders — open to upselling.",
  2: "High income, high spenders — premium products recommended.",
  3: "High income, low spenders — attract with luxury offers.",
  4: "Young high spenders — very responsive to trends."
};

async function predictCluster() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const income = document.getElementById("income").value;
  const score = document.getElementById("score").value;

  const payload = {
    gender: gender,
    age: parseInt(age),
    income: parseFloat(income),
    score: parseFloat(score)
  };

  try {
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const cluster = data.cluster;

    document.getElementById("result").innerText =
      "Predicted Customer Segment: Cluster " + cluster;
    document.getElementById("description").innerText =
      descriptions[cluster] || "No description available.";

  } catch (error) {
    document.getElementById("result").innerText = "Error predicting cluster.";
    document.getElementById("description").innerText = "";
    console.error("Prediction error:", error);
  }
}
