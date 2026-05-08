let startTime;

function startTimer() {
  startTime = new Date();
  
  document.getElementById("screen1").style.display = "none";
  document.getElementById("screen2").style.display = "block";
}

function stopTimer() {
  const stopTime = new Date();

  const data = {
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    reason: document.getElementById("reason").value,
    start: startTime,
    stop: stopTime,
    duration: (stopTime - startTime) / 60000
  };

  console.log(data);

  alert("Saved! Check console for data.");
}
