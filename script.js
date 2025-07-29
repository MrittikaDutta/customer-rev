// Cluster descriptions — handled entirely on frontend
const clusterDescriptions = {
  0: "Low income, younger group — may need cost-effective offers.",
  1: "Average income, moderate spenders — open to upselling.",
  2: "High income, high spenders — premium products recommended.",
  3: "High income, low spenders — attract with luxury offers.",
  4: "Young high spenders — very responsive to trends."
};

async function predictCluster() {
  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const income = parseFloat(document.getElementById("income").value);
  const score = parseFloat(document.getElementById("score").value);

  if (!gender || isNaN(age) || isNaN(income) || isNaN(score)) {
    alert("Please fill in all fields with valid numbers.");
    return;
  }

  const payload = {
    gender: gender,
    age: age,
    income: income,
    score: score
  };

  try {
    const response = await fetch("https://customer-r-3.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("✅ API response:", data);

    // Safely extract the cluster
    const cluster = data?.cluster;

    // Display only if cluster is a valid number
    if (typeof cluster === "number") {
      const description = clusterDescriptions[cluster] || "No description available.";
      document.getElementById("result").innerText =
        `Predicted Customer Segment: Cluster ${cluster}`;
      document.getElementById("description").innerText = description;
    } else {
      document.getElementById("result").innerText = "Prediction failed: Invalid cluster.";
      document.getElementById("description").innerText = "";
      console.error("❌ Invalid cluster in API response:", data);
    }

  } catch (error) {
    console.error("🚨 Network or server error:", error);
    document.getElementById("result").innerText = "Prediction failed.";
    document.getElementById("description").innerText = "";
  }
}
