const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");

// Fake DB (replace with real DB)
const db = {
  qr_sessions: [],
  attendance: []
};

function today() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Teacher side - Generate QR
app.post("/generate-qr", async (req, res) => {
  const { classId } = req.body;
  const token = uuidv4(); // unique token
  const expiresAt = Date.now() + 10000; // 10 sec expiry

  // Save session in db (here pushing in array, you can replace with Mongo/Postgres)
  db.qr_sessions.push({ classId, token, expiresAt });

  const qrData = { classId, token };
  const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

  res.json({ qrCode });
});

// Student side - Scan QR
app.post("/mark-attendance", async (req, res) => {
  const { studentId, qrData } = req.body;
  const { classId, token } = JSON.parse(qrData);

  const session = db.qr_sessions.find(s => s.classId === classId && s.token === token);

  if (!session) return res.status(400).json({ message: "Invalid QR" });
  if (Date.now() > session.expiresAt) return res.status(400).json({ message: "QR expired" });

  const alreadyMarked = db.attendance.find(
    a => a.studentId === studentId && a.classId === classId && a.date === today()
  );
  if (alreadyMarked) return res.json({ message: "Already marked present" });

  db.attendance.push({ studentId, classId, date: today(), status: "present" });

  res.json({ message: "Attendance marked successfully" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
