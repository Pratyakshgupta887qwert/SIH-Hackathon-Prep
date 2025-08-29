import { useState } from "react";
import QrScanner from "react-qr-scanner";
import { toast } from "sonner"; // adjust if your export path is different

const QRScanner = () => {
  const [result, setResult] = useState(null);

  const handleScan = (data) => {
    if (data && data.text && data.text !== result) {
      setResult(data.text);
      // TODO: Optionally, send data.text to your backend to mark attendance here.
      toast.success("Attendance marked!");
    }
  };

  const handleError = (err) => {
    toast.error("Scanning failed. Please try again.");
    console.error(err);
  };

  return (
    <div>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>Scan your QR code to mark attendance</p>
      {result && (
        <div style={{ marginTop: 16, color: "green" }}>
          Last scanned: <b>{result}</b>
        </div>
      )}
    </div>
  );
};

export { Toaster } from "sonner";
