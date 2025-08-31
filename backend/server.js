const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

// Simple JSON-based database
const dbPath = path.join(__dirname, "db.json");

// Initialize database
let db = {
  qr_sessions: [],
  attendance: [],
  students: [
    { id: "STU001", name: "John Doe", email: "john@college.edu", enrollmentYear: 2022 },
    { id: "STU002", name: "Jane Smith", email: "jane@college.edu", enrollmentYear: 2021 },
    { id: "STU003", name: "Bob Johnson", email: "bob@college.edu", enrollmentYear: 2023 },
    { id: "STU004", name: "Alice Brown", email: "alice@college.edu", enrollmentYear: 2022 },
    { id: "STU005", name: "Charlie Wilson", email: "charlie@college.edu", enrollmentYear: 2021 }
  ],
  classes: [
    { id: "CS101", name: "Computer Science Fundamentals", instructor: "Prof. Smith", schedule: "Mon/Wed/Fri 10:00 AM" },
    { id: "MATH201", name: "Calculus II", instructor: "Prof. Johnson", schedule: "Tue/Thu 2:00 PM" },
    { id: "ENG101", name: "English Literature", instructor: "Prof. Davis", schedule: "Mon/Wed 1:00 PM" }
  ],
  teachers: [
    { id: "TCH001", name: "Prof. Smith", email: "smith@college.edu", subject: "Computer Science" },
    { id: "TCH002", name: "Prof. Johnson", email: "johnson@college.edu", subject: "Mathematics" },
    { id: "TCH003", name: "Prof. Davis", email: "davis@college.edu", subject: "English" }
  ]
};

// Load database from file if exists
try {
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf8');
    db = { ...db, ...JSON.parse(data) };
  }
} catch (error) {
  console.log("Starting with fresh database");
}

// Save database to file
function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error("Error saving database:", error);
  }
}

function today() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

function getCurrentTime() {
  return new Date().toISOString();
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Teacher side - Generate QR
app.post("/generate-qr", async (req, res) => {
  const { classId, teacherId } = req.body;
  const token = uuidv4(); // unique token
  const expiresAt = Date.now() + 10000; // 10 sec expiry

  // Save session in db
  db.qr_sessions.push({ classId, teacherId, token, expiresAt, createdAt: getCurrentTime() });
  saveDatabase();

  const qrData = { classId, token };
  const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

  res.json({ qrCode, token, expiresAt });
});

// Student side - Scan QR with location verification
app.post("/mark-attendance", async (req, res) => {
  const { studentId, qrData, location, wifiSSID } = req.body;
  
  try {
    const { classId, token } = JSON.parse(qrData);

    const session = db.qr_sessions.find(s => s.classId === classId && s.token === token);

    if (!session) return res.status(400).json({ message: "Invalid QR" });
    if (Date.now() > session.expiresAt) return res.status(400).json({ message: "QR expired" });

    // Basic location verification (you can enhance this with proper geofencing)
    if (location && wifiSSID) {
      // Check if student is on campus WiFi
      const campusSSIDs = ["CollegeWiFi", "Campus-Network", "EduNet"];
      if (!campusSSIDs.includes(wifiSSID)) {
        return res.status(400).json({ message: "Must be connected to campus WiFi" });
      }
    }

    const alreadyMarked = db.attendance.find(
      a => a.studentId === studentId && a.classId === classId && a.date === today()
    );
    if (alreadyMarked) return res.json({ message: "Already marked present" });

    db.attendance.push({ 
      studentId, 
      classId, 
      date: today(), 
      time: getCurrentTime(),
      status: "present",
      method: "qr",
      location: location || null,
      wifiSSID: wifiSSID || null
    });
    saveDatabase();

    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid QR code format" });
  }
});

// Photo-based attendance (AI face recognition simulation)
app.post("/mark-attendance-photo", async (req, res) => {
  const { classId, teacherId, photoBase64, recognizedStudents } = req.body;

  try {
    // In a real implementation, this would use AI/ML for face recognition
    // For demo purposes, we'll simulate recognition
    const simulatedRecognition = recognizedStudents || [
      { studentId: "STU001", confidence: 0.95 },
      { studentId: "STU002", confidence: 0.92 },
      { studentId: "STU003", confidence: 0.88 }
    ];

    const markedStudents = [];
    
    for (const recognition of simulatedRecognition) {
      if (recognition.confidence > 0.85) { // 85% confidence threshold
        const alreadyMarked = db.attendance.find(
          a => a.studentId === recognition.studentId && a.classId === classId && a.date === today()
        );
        
        if (!alreadyMarked) {
          db.attendance.push({
            studentId: recognition.studentId,
            classId,
            date: today(),
            time: getCurrentTime(),
            status: "present",
            method: "photo",
            confidence: recognition.confidence
          });
          markedStudents.push(recognition.studentId);
        }
      }
    }

    saveDatabase();

    res.json({ 
      message: `${markedStudents.length} students marked present via photo recognition`,
      markedStudents,
      totalRecognized: simulatedRecognition.length
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing photo attendance" });
  }
});

// Face verification for QR attendance
app.post("/verify-face", async (req, res) => {
  const { studentId, classId, token, image } = req.body;

  try {
    const session = db.qr_sessions.find(s => s.classId === classId && s.token === token);
    if (!session) return res.status(400).json({ message: "Invalid session" });
    if (Date.now() > session.expiresAt) return res.status(400).json({ message: "Session expired" });

    // Simulate face verification (in real implementation, use face recognition API)
    const verificationSuccess = Math.random() > 0.1; // 90% success rate for demo

    if (!verificationSuccess) {
      return res.status(400).json({ message: "Face verification failed" });
    }

    const alreadyMarked = db.attendance.find(
      a => a.studentId === studentId && a.classId === classId && a.date === today()
    );
    if (alreadyMarked) return res.json({ message: "Already marked present" });

    db.attendance.push({
      studentId,
      classId,
      date: today(),
      time: getCurrentTime(),
      status: "present",
      method: "face_verification"
    });
    saveDatabase();

    res.json({ message: "✅ Face verified! Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Face verification error" });
  }
});

// Biometric verification
app.post("/verify-biometric", async (req, res) => {
  const { studentId, classId, token, credential } = req.body;

  try {
    const session = db.qr_sessions.find(s => s.classId === classId && s.token === token);
    if (!session) return res.status(400).json({ message: "Invalid session" });
    if (Date.now() > session.expiresAt) return res.status(400).json({ message: "Session expired" });

    // Simulate biometric verification
    const verificationSuccess = credential != null;

    if (!verificationSuccess) {
      return res.status(400).json({ message: "Biometric verification failed" });
    }

    const alreadyMarked = db.attendance.find(
      a => a.studentId === studentId && a.classId === classId && a.date === today()
    );
    if (alreadyMarked) return res.json({ message: "Already marked present" });

    db.attendance.push({
      studentId,
      classId,
      date: today(),
      time: getCurrentTime(),
      status: "present",
      method: "biometric"
    });
    saveDatabase();

    res.json({ message: "✅ Biometric verified! Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Biometric verification error" });
  }
});

// API Endpoints for data management

// Get all students
app.get("/students", (req, res) => {
  res.json(db.students);
});

// Get all classes
app.get("/classes", (req, res) => {
  res.json(db.classes);
});

// Get all teachers
app.get("/teachers", (req, res) => {
  res.json(db.teachers);
});

// Get attendance records
app.get("/attendance", (req, res) => {
  const { classId, date, studentId } = req.query;
  let records = db.attendance;

  if (classId) records = records.filter(r => r.classId === classId);
  if (date) records = records.filter(r => r.date === date);
  if (studentId) records = records.filter(r => r.studentId === studentId);

  res.json(records);
});

// Get attendance analytics
app.get("/analytics/attendance", (req, res) => {
  const { classId, startDate, endDate } = req.query;
  
  try {
    let records = db.attendance;
    
    if (classId) records = records.filter(r => r.classId === classId);
    if (startDate) records = records.filter(r => r.date >= startDate);
    if (endDate) records = records.filter(r => r.date <= endDate);

    // Calculate analytics
    const totalRecords = records.length;
    const uniqueStudents = [...new Set(records.map(r => r.studentId))].length;
    const attendanceByDate = {};
    const attendanceByMethod = {};
    const studentAttendance = {};

    records.forEach(record => {
      // By date
      if (!attendanceByDate[record.date]) {
        attendanceByDate[record.date] = { present: 0, total: 0 };
      }
      attendanceByDate[record.date].present++;
      attendanceByDate[record.date].total++;

      // By method
      const method = record.method || 'manual';
      attendanceByMethod[method] = (attendanceByMethod[method] || 0) + 1;

      // By student
      if (!studentAttendance[record.studentId]) {
        studentAttendance[record.studentId] = { present: 0, total: 0 };
      }
      studentAttendance[record.studentId].present++;
      studentAttendance[record.studentId].total++;
    });

    // Calculate attendance rates
    const overallAttendanceRate = totalRecords > 0 ? (totalRecords / (uniqueStudents * Object.keys(attendanceByDate).length)) * 100 : 0;

    // At-risk students (less than 75% attendance)
    const atRiskStudents = Object.entries(studentAttendance)
      .filter(([studentId, stats]) => {
        const rate = (stats.present / Math.max(stats.total, 1)) * 100;
        return rate < 75;
      })
      .map(([studentId]) => studentId);

    res.json({
      totalRecords,
      uniqueStudents,
      overallAttendanceRate: parseFloat(overallAttendanceRate.toFixed(2)),
      attendanceByDate,
      attendanceByMethod,
      studentAttendance,
      atRiskStudents
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating analytics" });
  }
});

// Get dashboard stats
app.get("/dashboard/stats", (req, res) => {
  try {
    const todayRecords = db.attendance.filter(r => r.date === today());
    const totalStudents = db.students.length;
    const totalClasses = db.classes.length;
    const todayAttendance = todayRecords.length;
    const todayAttendanceRate = totalStudents > 0 ? (todayAttendance / totalStudents) * 100 : 0;

    // Calculate weekly attendance
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyRecords = db.attendance.filter(r => r.date >= oneWeekAgo.toISOString().split('T')[0]);
    
    const weeklyStats = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayRecords = weeklyRecords.filter(r => r.date === dateStr);
      weeklyStats[dateStr] = {
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        present: dayRecords.length,
        total: totalStudents,
        rate: totalStudents > 0 ? (dayRecords.length / totalStudents) * 100 : 0
      };
    }

    // At-risk students calculation
    const studentAttendanceMap = {};
    db.attendance.forEach(record => {
      if (!studentAttendanceMap[record.studentId]) {
        studentAttendanceMap[record.studentId] = 0;
      }
      studentAttendanceMap[record.studentId]++;
    });

    const atRiskStudents = db.students.filter(student => {
      const attendanceCount = studentAttendanceMap[student.id] || 0;
      const totalDays = Math.max(1, Object.keys(weeklyStats).length);
      const attendanceRate = (attendanceCount / totalDays) * 100;
      return attendanceRate < 75;
    });

    res.json({
      totalStudents,
      totalClasses,
      todayAttendance,
      todayAttendanceRate: parseFloat(todayAttendanceRate.toFixed(1)),
      atRiskStudentsCount: atRiskStudents.length,
      weeklyStats: Object.values(weeklyStats),
      atRiskStudents: atRiskStudents.slice(0, 5) // Top 5 at-risk students
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
});

// Teacher login (simplified)
app.post("/teacher/login", (req, res) => {
  const { email, password } = req.body;
  
  // Simplified authentication (in production, use proper auth)
  const teacher = db.teachers.find(t => t.email === email);
  
  if (teacher && password === "password") { // Demo password
    res.json({
      success: true,
      teacher: {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        subject: teacher.subject
      }
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Get unmarked students for a class
app.get("/class/:classId/unmarked-students", (req, res) => {
  const { classId } = req.params;
  const date = req.query.date || today();
  
  const markedStudents = db.attendance
    .filter(a => a.classId === classId && a.date === date)
    .map(a => a.studentId);
  
  const unmarkedStudents = db.students.filter(s => !markedStudents.includes(s.id));
  
  res.json({
    unmarkedStudents,
    markedCount: markedStudents.length,
    totalStudents: db.students.length
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database initialized with ${db.students.length} students, ${db.classes.length} classes, ${db.teachers.length} teachers`);
});
