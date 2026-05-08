let startTime;
let timerInterval;

// 👇 YOUR EMPLOYEE LIST (replace with your real data)
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

// LIVE TIMER
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

// 👇 LOOKUP EMPLOYEE (runs as they type)
function lookupEmployee() {
  const id = document.getElementById("employeeID").value;
  const welcome = document.getElementById("welcome");

  if (employeeData[id]) {
    const emp = employeeData[id];
    welcome.innerText =
      `✅ Welcome ${emp.name} (${emp.department})\nSupervisor: ${emp.supervisor}`;
    welcome.style.color = "green";
  } else {
    welcome.innerText = "❌ Employee not found";
    welcome.style.color = "red";
  }
}

// STOP BUTTON
function stopTimer() {
  clearInterval(timerInterval);

  const stopTime = new Date();
  const id = document.getElementById("employeeID").value;

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

  // Reset UI
  document.getElementById("screen1").style.display = "block";
  document.getElementById("screen2").style.display = "none";
  document.getElementById("welcome").innerText = "";
  document.getElementById("employeeID").value = "";
}

// SEND TO POWER AUTOMATE
function sendToExcel(data) {
  fetch("YOUR_POWER_AUTOMATE_URL_HERE", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}
