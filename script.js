<script>
  function predict() {
    const gender = document.getElementById('gender').value;
    const age = Number(document.getElementById('age').value);
    const income = Number(document.getElementById('income').value);
    const score = Number(document.getElementById('score').value); // Optional, not used in backend

    // Input validation
    if (!gender || !age || !income || !score) {
      alert('Please fill in all fields.');
      return;
    }

    // Payload to match backend expectations
    const payload = {
      gender: gender,
      age: age,
      income: income
    };

    // POST request to Flask API
    fetch("https://customer-r-3.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response from backend:", data); // ✅ Debugging line

      const resultBox = document.getElementById("result");
      resultBox.style.display = "block";

      if (data.cluster !== undefined && data.message) {
        resultBox.innerText = `Predicted Customer Segment: Cluster ${data.cluster}\n\n${data.message}`;
      } else if (data.error) {
        resultBox.innerText = `Error: ${data.error}`;
      } else {
        resultBox.innerText = "Unexpected response format from server.";
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      alert("Prediction failed. Please check the backend or your network.");
    });
  }
</script>
