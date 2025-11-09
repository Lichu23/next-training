// app/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const QrCodeScanner = dynamic(() => import("../components/QrCodeScanner"), {
  ssr: false,
});

export default function BarcodeScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    setScanResult(decodedText);
    setError(null);
  };

  const handleScanError = (error: string) => {
    console.error("QR Scan Error:", error);
    setError(`Scan error: ${error}. Please try again.`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <QrCodeScanner
          onScanSuccess={handleScanSuccess}
          onScanError={handleScanError}
        />
      </div>

      {scanResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Scan Result:</h2>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
}
