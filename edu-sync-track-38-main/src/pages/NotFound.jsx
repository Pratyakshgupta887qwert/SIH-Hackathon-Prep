// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// export default function NotFound() {
//   const [text, setText] = useState("");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Generate a random value (you can replace with API, timestamp, etc.)
//       const newValue = `QR-${Date.now()}`; // ✅ fixed with backticks
//       setText(newValue);
//     }, 10000); // 10 seconds

//     return () => clearInterval(interval); // cleanup on unmount
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">Auto Changing QR Code</h1>
//       <p className="mb-2 text-gray-600">Changes every 10 seconds</p>
//       <QRCodeCanvas value={text} size={200} />
//       <p className="mt-4 text-sm text-gray-500">Current Value: {text}</p>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// export default function NotFound() {
//   const [qrData, setQrData] = useState("");

//   // Assume this is the logged-in teacher generating QR for a class
//   const classId = "CSE101"; // example
//   const sessionId = Date.now(); // unique for each session

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Encode QR with dynamic session + class info
//       const payload = {
//         classId,
//         sessionId,
//         timestamp: new Date().toISOString(),
//       };

//       // Convert object to string for QR
//       setQrData(JSON.stringify(payload));
//     }, 10000); // refresh every 10 sec

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">Attendance QR Code</h1>
//       <p className="mb-2 text-gray-600">Scan to mark attendance</p>
//       <QRCodeCanvas value={qrData} size={220} />
//       <p className="mt-4 text-sm text-gray-500">Current QR Data: {qrData}</p>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// export default function NotFound() {
//   const [sessionCode, setSessionCode] = useState("");

//   useEffect(() => {
//     const generateSessionCode = () => {
//       const newCode = `ATTENDANCE-${Date.now()}`;
//       setSessionCode(newCode);
//     };

//     generateSessionCode(); // initial
//     const interval = setInterval(generateSessionCode, 60000); // change every 1 min

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">Class Attendance QR</h1>
//       <p className="mb-2 text-gray-600">Scan this QR to mark your attendance</p>
//       <QRCodeCanvas value={sessionCode} size={250} />
//       <p className="mt-4 text-sm text-gray-500">Session Code: {sessionCode}</p>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// export default function NotFound() {
//   const [sessionCode, setSessionCode] = useState("");

//   useEffect(() => {
//     const generateSessionCode = () => {
//       const newCode = `ATTENDANCE-${Date.now()}`;
//       setSessionCode(newCode);
//     };

//     generateSessionCode(); // initial
//     const interval = setInterval(generateSessionCode, 60000); // change every 1 min

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">Class Attendance QR</h1>
//       <p className="mb-2 text-gray-600">Scan this QR to mark your attendance</p>
//       <QRCodeCanvas value={sessionCode} size={250} />
//       <p className="mt-4 text-sm text-gray-500">Session Code: {sessionCode}</p>
//     </div>
//   );
// }


import { useState, useEffect } from "react";

export default function NotFound() {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      const res = await fetch("http://localhost:5000/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId: "CLASS-101" })
      });

      const data = await res.json();
      setQrCode(data.qrCode);
    };

    fetchQRCode(); // initial call

    // refresh QR every 1 min
    const interval = setInterval(fetchQRCode, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Class Attendance QR</h1>
      {qrCode ? (
        <img src={qrCode} alt="QR Code" className="w-64 h-64" />
      ) : (
        <p>Loading QR...</p>
      )}
    </div>
  );
}
