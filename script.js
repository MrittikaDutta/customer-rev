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

    console.log("✅ Full Response from Backend:", data);

    if (!("cluster" in data)) {
      console.error("❌ 'cluster' not in response");
    }
    if (!("message" in data)) {
      console.error("❌ 'message' not in response");
    }

    const cluster = data.cluster;
    const message = data.message;

    document.getElementById("result").innerText =
      `Predicted Customer Segment: Cluster ${cluster ?? "?"}`;
    document.getElementById("description").innerText =
      message ?? "No description available.";

  } catch (error) {
    console.error("🚨 Network or Server Error:", error);
    document.getElementById("result").innerText = "Error predicting cluster.";
    document.getElementById("description").innerText = "";
  }
}
