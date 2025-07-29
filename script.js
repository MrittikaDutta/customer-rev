async function predictCluster() {
  const gender = document.getElementById("gender").value;
  const age = Number(document.getElementById("age").value);
  const income = Number(document.getElementById("income").value);
  const score = Number(document.getElementById("score").value);

  // Validate input
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

    // Debug log to inspect the full response
    console.log("Response from backend:", data);

    // Show result and message
    const cluster = data.cluster;
    const message = data.message;

    document.getElementById("result").innerText =
      `Predicted Customer Segment: Cluster ${cluster}`;
    document.getElementById("description").innerText =
      message || "No description available.";

  } catch (error) {
    console.error("Prediction error:", error);
    document.getElementById("result").innerText = "Error predicting cluster.";
    document.getElementById("description").innerText = "";
  }
}

