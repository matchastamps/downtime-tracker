let startTime;
let timerInterval;

// START BUTTON
function startTimer() {
  startTime = new Date();

  document.getElementById("screen1").style.display = "none";
  document.getElementById("screen2").style.display = "block";

  startClock();
}

// TIMER
function startClock() {
  timerInterval = setInterval(() => {
    const now = new Date();
    const diff = now - startTime;

    const hrs = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    document.getElementById("timer").innerText =
      `${hrs.toString().padStart(2, '0')}:` +
      `${mins.toString().padStart(2, '0')}:` +
      `${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

// ✅ OPTIONAL: SIMPLE ID CHECK (numbers only)
function lookupEmployee() {
  const id = document.getElementById("employeeID").value.trim();
  const welcome = document.getElementById("welcome");

  if (id === "") {
    welcome.innerText = "";
    return;
  }

  if (!/^\d+$/.test(id)) {
    welcome.innerText = "❌ ID must be numbers only";
    welcome.style.color = "red";
  } else {
    welcome.innerText = `✅ ID Accepted: ${id}`;
    welcome.style.color = "green";
  }
}

// STOP BUTTON
function stopTimer() {
  clearInterval(timerInterval);

  const stopTime = new Date();
  const id = document.getElementById("employeeID").value.trim();

  // ✅ Only check if empty or invalid format
  if (id === "" || !/^\d+$/.test(id)) {
    alert("❌ Please enter a valid Employee ID (numbers only)");
    return;
  }

  const data = {
    employeeID: id,
    reason: document.getElementById("reason").value,
    start: startTime.toLocaleString(),
    stop: stopTime.toLocaleString(),
    duration: ((stopTime - startTime) / 60000).toFixed(2) // minutes
  };

  sendToExcel(data);

  alert(`✅ Logged for Employee ID: ${id}`);

  // RESET
  document.getElementById("screen1").style.display = "block";
  document.getElementById("screen2").style.display = "none";
  document.getElementById("welcome").innerText = "";
  document.getElementById("employeeID").value = "";
}

// ✅ SEND TO POWER AUTOMATE
function sendToExcel(data) {
  fetch("PASTE_YOUR_POWER_AUTOMATE_URL_HERE", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => console.log("✅ Sent to Excel"))
  .catch(error => console.error("❌ Error:", error));
}
