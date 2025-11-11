'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the scanner component with SSR disabled
const ScanditBarcodeScanner = dynamic(
  () => import('../components/ScanditBarcodeScanner'),
  { ssr: false }
);

export default function BarcodeScannerPage() {
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScanSuccess = (barcode: string) => {
    setScannedBarcode(barcode);
    setError(null);
  };

  const handleError = (error: Error) => {
    console.error('Scanner error:', error);
    setError(`Error initializing scanner: ${error.message}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Barcode Scanner</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4 border rounded-lg overflow-hidden">
        <ScanditBarcodeScanner 
          onScanSuccess={handleScanSuccess}
          onError={handleError}
        />
      </div>

      {scannedBarcode && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="font-semibold">Scanned Barcode:</h2>
          <p className="text-lg mt-2">{scannedBarcode}</p>
        </div>
      )}
    </div>
  );
}