function predictCluster() {
  // Simulate a prediction — replace with actual model call
  const predictedCluster = 4; // You should replace this with real prediction logic

  const descriptions = {
    0: "Low income, younger group — may need cost-effective offers.",
    1: "Average income, moderate spenders — open to upselling.",
    2: "High income, high spenders — premium products recommended.",
    3: "High income, low spenders — attract with luxury offers.",
    4: "Young high spenders — very responsive to trends."
  };

  document.getElementById("result").innerText =
    "Predicted Customer Segment: Cluster " + predictedCluster;
  document.getElementById("description").innerText =
    descriptions[predictedCluster] || "No description available.";
}
