let startTime;
let records = [];

function startTimer() {
  startTime = new Date();

  document.getElementById("screen1").style.display = "none";
  document.getElementById("screen2").style.display = "block";
}

function stopTimer() {
  const stopTime = new Date();

  const record = {
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    reason: document.getElementById("reason").value,
    start: startTime.toLocaleString(),
    stop: stopTime.toLocaleString(),
    duration: ((stopTime - startTime) / 60000).toFixed(2)
  };

  records.push(record);

  downloadCSV();

  alert("✅ Data saved to Excel file!");
}

function downloadCSV() {
  let csv = "Name,Department,Reason,Start Time,Stop Time,Duration (min)\n";

  records.forEach(r => {
    csv += `${r.name},${r.department},${r.reason},${r.start},${r.stop},${r.duration}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "downtime_log.csv";
  a.click();

  window.URL.revokeObjectURL(url);
}
