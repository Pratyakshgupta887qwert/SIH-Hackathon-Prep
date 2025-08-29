// import { useState } from "react";
// import QrScanner from "react-qr-scanner"; // ✅ use react-qr-scanner
// import axios from "axios";

// export default function QRScanner({ studentId }) {
//   const [message, setMessage] = useState("");

//   const handleScan = async (data) => {
//     if (data) {
//       try {
//         const qrData = data.text || data; // react-qr-scanner returns object with `text`

//         const res = await axios.post("http://localhost:5000/mark-attendance", {
//           studentId,
//           qrData,
//         });

//         setMessage(res.data.message);
//       } catch (err) {
//         setMessage(err.response?.data?.message || "Error marking attendance");
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setMessage("QR Scan error");
//   };

//   return (
//     <div>
//       <QrScanner
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: "100%" }}
//       />
//       <p>{message}</p>
//     </div>
//   );
// }


// import { useState, useRef } from "react";
// import QrScanner from "react-qr-scanner";
// import Webcam from "react-webcam";
// import axios from "axios";

// export default function QRScanner({ studentId }) {
//   const [message, setMessage] = useState("");
//   const [qrPayload, setQrPayload] = useState(null);
//   const [verified, setVerified] = useState(false);
//   const [mode, setMode] = useState(null); // "face" or "fingerprint"

//   const webcamRef = useRef(null);

//   const handleScan = (data) => {
//     if (!data) return;

//     try {
//       const qrString = typeof data === "string" ? data : data?.text;
//       if (!qrString) return;

//       const parsed = JSON.parse(qrString); // { classId, token }
//       setQrPayload(parsed);
//       setMessage("✅ QR Scanned! Please verify your identity.");
//     } catch (err) {
//       console.error("QR parsing error:", err);
//       setMessage("❌ Invalid QR Code");
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scan error:", err);
//     setMessage("❌ QR Scan error");
//   };

//   const captureFace = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     try {
//       setMessage("🔍 Verifying with Face Recognition...");

//       const res = await axios.post("http://localhost:5000/verify-face", {
//         studentId,
//         classId: qrPayload.classId,
//         token: qrPayload.token,
//         image: imageSrc, // base64 image
//       });

//       setVerified(true);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "❌ Face verification failed");
//     }
//   };

//   const verifyBiometric = async () => {
//     try {
//       setMessage("🔍 Waiting for biometric verification...");

//       const credential = await navigator.credentials.get({
//         publicKey: {
//           challenge: new Uint8Array([ // simple dummy challenge for demo
//             0x8C, 0xFA, 0x1D, 0x3C
//           ]),
//           timeout: 60000,
//           userVerification: "required",
//         },
//       });

//       if (credential) {
//         const res = await axios.post("http://localhost:5000/verify-biometric", {
//           studentId,
//           classId: qrPayload.classId,
//           token: qrPayload.token,
//           credential,
//         });

//         setVerified(true);
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Biometric verification failed");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-xl font-bold mb-2">Scan Attendance QR</h2>

//       {/* Show scanner only if no QR scanned yet */}
//       {!qrPayload && (
//         <QrScanner
//           delay={500}
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: "300px", height: "300px" }}
//         />
//       )}

//       {/* After QR scanned, show verification options */}
//       {qrPayload && !verified && !mode && (
//         <div className="mt-4 flex flex-col items-center gap-4">
//           <p className="font-medium">{message}</p>
//           <button
//             onClick={() => setMode("face")}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Verify with Face Recognition
//           </button>
//           <button
//             onClick={() => setMode("fingerprint")}
//             className="px-4 py-2 bg-green-500 text-white rounded-lg"
//           >
//             Verify with Fingerprint
//           </button>
//         </div>
//       )}

//       {/* Face Recognition Mode */}
//       {mode === "face" && !verified && (
//         <div className="mt-4 flex flex-col items-center">
//           <Webcam
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width={300}
//             height={300}
//             videoConstraints={{ facingMode: "user" }}
//           />
//           <button
//             onClick={captureFace}
//             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
//           >
//             Capture & Verify
//           </button>
//         </div>
//       )}

//       {/* Biometric Mode */}
//       {mode === "fingerprint" && !verified && (
//         <div className="mt-4">
//           <p>👉 Please use your device's biometric scanner.</p>
//           <button
//             onClick={verifyBiometric}
//             className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
//           >
//             Start Biometric Verification
//           </button>
//         </div>
//       )}

//       {/* After successful verification */}
//       {verified && <p className="mt-4 font-medium">{message}</p>}
//     </div>
//   );
// }



import { useState, useRef } from "react";
import QrScanner from "react-qr-scanner";
import Webcam from "react-webcam";
import axios from "axios";

export default function QRScanner({ studentId }) {
  const [message, setMessage] = useState("");
  const [qrPayload, setQrPayload] = useState(null);
  const [verified, setVerified] = useState(false);
  const [mode, setMode] = useState(null); // "face" or "fingerprint"

  const webcamRef = useRef(null);

  const handleScan = (data) => {
    if (!data) return;

    try {
      const qrString = typeof data === "string" ? data : data?.text;
      if (!qrString) return;

      const parsed = JSON.parse(qrString); // { classId, token }
      setQrPayload(parsed);
      setMessage("✅ QR Scanned! Please verify your identity.");
    } catch (err) {
      console.error("QR parsing error:", err);
      setMessage("❌ Invalid QR Code");
    }
  };

  const handleError = (err) => {
    console.error("QR Scan error:", err);
    setMessage("❌ QR Scan error");
  };

  const captureFace = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      setMessage("🔍 Verifying with Face Recognition...");

      const res = await axios.post("http://localhost:5000/verify-face", {
        studentId,
        classId: qrPayload.classId,
        token: qrPayload.token,
        image: imageSrc, // base64 image
      });

      setVerified(true);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Face verification failed");
    }
  };

  const verifyBiometric = async () => {
    try {
      setMessage("🔍 Waiting for biometric verification...");

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([ // simple dummy challenge for demo
            0x8C, 0xFA, 0x1D, 0x3C
          ]),
          timeout: 60000,
          userVerification: "required",
        },
      });

      if (credential) {
        const res = await axios.post("http://localhost:5000/verify-biometric", {
          studentId,
          classId: qrPayload.classId,
          token: qrPayload.token,
          credential,
        });

        setVerified(true);
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Biometric verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Scan Attendance QR</h2>

      {/* Show scanner only if no QR scanned yet */}
      {!qrPayload && (
        <QrScanner
          delay={500}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px", height: "300px" }}
        />
      )}

      {/* After QR scanned, show verification options */}
      {qrPayload && !verified && !mode && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <p className="font-medium">{message}</p>
          <button
            onClick={() => setMode("face")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg" 
          >
            Verify with Face Recognition
          </button>
          <button
            onClick={() => setMode("fingerprint")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Verify with Fingerprint
          </button>
        </div>
      )}

      {/* Face Recognition Mode */}
      {mode === "face" && !verified && (
        <div className="mt-4 flex flex-col items-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            height={300}
            videoConstraints={{ facingMode: "user" }}
          />
          <button
            onClick={captureFace}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Capture & Verify
          </button>
        </div>
      )}

      {/* Biometric Mode */}
      {mode === "fingerprint" && !verified && (
        <div className="mt-4">
          <p>👉 Please use your device's biometric scanner.</p>
          <button
            onClick={verifyBiometric}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Start Biometric Verification
          </button>
        </div>
      )}

      {/* After successful verification */}
      {verified && <p className="mt-4 font-medium">{message}</p>}
    </div>
  );
}