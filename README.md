# Smart Attendance Monitoring and Analytics System

## Overview
A comprehensive attendance tracking system for colleges that automates attendance monitoring using AI photo recognition, QR codes, and biometric verification. The system provides real-time analytics and insights for better academic planning.

## Features

### 🎯 Attendance Methods
- **AI Photo Attendance** - Teachers take class photos for automatic face recognition
- **QR Code Attendance** - Time-limited QR codes with location/WiFi verification  
- **Biometric Verification** - Fingerprint/face authentication for enhanced security
- **Manual Override** - Teachers can manually adjust attendance when needed

### 🔒 Anti-Proxy Security
- Face recognition with 85%+ confidence threshold
- Location verification (campus WiFi requirement)
- Time-limited QR codes (10-second expiry)
- Biometric authentication fallback
- Activity logging for audit trails

### 📊 Analytics & Insights
- Real-time attendance dashboard
- Weekly/monthly attendance trends
- At-risk student identification (< 75% attendance)
- Class-wise performance analytics
- Teacher insights and reports

### 💻 Technology Stack
- **Backend**: Node.js + Express.js
- **Frontend**: React + TypeScript + Vite
- **UI**: Shadcn/UI + Tailwind CSS
- **Database**: JSON-based (easily replaceable with MongoDB/PostgreSQL)
- **Charts**: Recharts
- **QR Codes**: qrcode library

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/Pratyakshgupta887qwert/SIH-Hackathon-Prep.git
cd SIH-Hackathon-Prep
```

### 2. Start the Backend Server
```bash
cd backend
npm install
node server.js
```
Server will start on http://localhost:5000

### 3. Start the Teacher Dashboard
```bash
cd edu-sync-track-38-main
npm install
npm run dev
```
Dashboard will be available at http://localhost:3000

### 4. Start the Student App (Optional)
```bash
cd atten-dash-insight-main
npm install
npm run dev
```
Student app will be available at http://localhost:5173

## Usage

### Teacher Login
- **Email**: smith@college.edu (or any teacher email from the system)
- **Password**: password

### Demo Data
The system comes pre-loaded with:
- 5 students (STU001-STU005)
- 3 classes (CS101, MATH201, ENG101)
- 3 teachers (Prof. Smith, Prof. Johnson, Prof. Davis)

## Demo Screenshot
![Attendance Dashboard](https://github.com/user-attachments/assets/6d8593e0-2be4-4b06-8257-845081e04cad)

The dashboard shows real-time attendance statistics, weekly trends, and quick access to photo and QR attendance features.

---

**Built for Smart India Hackathon 2025**  
Problem Statement: Automated Student Attendance Monitoring and Analytics System for Colleges