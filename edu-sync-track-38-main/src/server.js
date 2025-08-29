// Teacher side - Generate QR
app.post("/generate-qr", async (req, res) => {
  const { classId } = req.body;
  const token = uuidv4(); // unique token
  const expiresAt = Date.now() + 10000; // 10 sec expiry

  await db.qr_sessions.insert({ classId, token, expiresAt });

  const qrData = { classId, token };
  const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

  res.json({ qrCode });
});

// Student side - Scan QR
app.post("/mark-attendance", async (req, res) => {
  const { studentId, qrData } = req.body;
  const { classId, token } = JSON.parse(qrData);

  const session = await db.qr_sessions.findOne({ classId, token });

  if (!session) return res.status(400).json({ message: "Invalid QR" });
  if (Date.now() > session.expiresAt) return res.status(400).json({ message: "QR expired" });

  const alreadyMarked = await db.attendance.findOne({ studentId, classId, date: today() });
  if (alreadyMarked) return res.json({ message: "Already marked present" });

  await db.attendance.insert({ studentId, classId, date: today(), status: "present" });

  res.json({ message: "Attendance marked successfully" });
});