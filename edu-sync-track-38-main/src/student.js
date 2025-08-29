// Student side request
await fetch("http://localhost:5000/mark-attendance", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    studentId: "STUDENT-123",
    qrData: scannedQR // contains { classId, token }
  })
});
