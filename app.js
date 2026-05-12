let startTime;
let timerInterval;

// ✅ Employee list
let employeeData = {
  "1001": { name: "Claudia Trevino", department: "EHS", supervisor: "Chris" },
  "1002": { name: "John Smith", department: "Maintenance", supervisor: "Alex" }
};

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

// ✅ FIXED ID LOOKUP
function lookupEmployee() {
  const id = document.getElementById("employeeID").value.toString().trim();
  const welcome = document.getElementById("welcome");

  if (employeeData[id]) {
    const emp = employeeData[id];
    welcome.innerText =
      `✅ Welcome ${emp.name} (${emp.department})\nSupervisor: ${emp.supervisor}`;
    welcome.style.color = "green";
  } else if (id !== "") {
    welcome.innerText = "❌ Employee not found";
    welcome.style.color = "red";
  } else {
    welcome.innerText = "";
  }
}

// STOP BUTTON
function stopTimer() {
  clearInterval(timerInterval);

  const stopTime = new Date();
  const id = document.getElementById("employeeID").value.toString().trim();

  // ✅ VALIDATION
  if (!employeeData[id]) {
    alert("❌ Invalid Employee ID");
    return;
  }

  const emp = employeeData[id];

  const data = {
    employeeID: id,
    name: emp.name,
    department: emp.department,
    supervisor: emp.supervisor,
    reason: document.getElementById("reason").value,
    start: startTime.toLocaleString(),
    stop: stopTime.toLocaleString(),
    duration: ((stopTime - startTime) / 60000).toFixed(2)
  };

  sendToExcel(data);

  alert(`✅ Logged for ${emp.name}`);

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
``
