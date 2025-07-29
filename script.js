const descriptions = {
  0: "Low income, younger group — may need cost-effective offers.",
  1: "Average income, moderate spenders — open to upselling.",
  2: "High income, high spenders — premium products recommended.",
  3: "High income, low spenders — attract with luxury offers.",
  4: "Young high spenders — very responsive to trends."
};

async function predictCluster() {
  const gender = document.getElementById("gender").value;
  const age = Number(document.getElementById("age").value);
  const income = Number(document.getElementById("income").value);
  const score = Number(document.getElementById("score").value);

  if (!gender || !age || !income || !score) {
    alert("Please fill in all fields.");
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

    document.getElementById("result").innerText =
      "Predicted Customer Segment: Cluster " + data.cluster;

    document.getElementById("description").innerText = data.message;

  } catch (error) {
    console.error("Error:", error);
    alert("Prediction failed. Try again later.");
  }
}
