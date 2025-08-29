"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";

export default function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          scanner.clear(); // stop scanner
          setShowScanner(false);
        },
        (error) => {
          console.warn(error);
        }
      );

      return () => {
        scanner.clear().catch((err) => console.error("Failed to clear scanner", err));
      };
    }
  }, [showScanner]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Scan QR Button */}
      <Button onClick={() => setShowScanner(true)} className="px-6 py-2">
        Scan QR
      </Button>

      {/* Scanner Area */}
      {showScanner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div id="reader" className="w-[300px] h-[300px]" />
            <Button onClick={() => setShowScanner(false)} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Result */}
      {scanResult && (
        <p className="text-green-600 font-semibold">
          ✅ Scanned: {scanResult}
        </p>
      )}
    </div>
  );
}
