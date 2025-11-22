// "use client";
// import { useState } from "react";
// import dynamic from "next/dynamic";

// // Dynamically import the scanner component with SSR disabled
// const ScanditBarcodeScanner = dynamic(
//   () => import("../components/ScanditBarcodeScanner"),
//   { ssr: false }
// );

// export default function BarcodeScannerPage() {
//   const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isScanning, setIsScanning] = useState(true);

//   const handleScanSuccess = (barcode: string) => {
//     setScannedBarcode(barcode);
//     setError(null);
//     setIsScanning(false);
//   };

//   const handleError = (error: unknown) => {
//     console.error("Scanner error:", error);
//     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//     setError(`Error initializing scanner: ${errorMessage}`);
//     setIsScanning(false);
//   };

//   const handleScanAgain = () => {
//     setScannedBarcode(null);
//     setIsScanning(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
//           Barcode Scanner
//         </h1>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-red-500"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-6">
//           {isScanning ? (
//             <ScanditBarcodeScanner
//               onScanSuccess={handleScanSuccess}
//               onError={handleError}
//             />
//           ) : (
//             <div
//               className="flex items-center justify-center bg-gray-100"
//               style={{ height: "400px" }}
//             >
//               <button
//                 onClick={handleScanAgain}
//                 className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//               >
//                 Scan Another Barcode
//               </button>
//             </div>
//           )}
//         </div>

//         {scannedBarcode && (
//           <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-green-500"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-green-800">
//                   Barcode Scanned Successfully!
//                 </h3>
//                 <div className="mt-2 text-sm text-green-700">
//                   <p>
//                     Scanned Code:{" "}
//                     <span className="font-mono bg-green-100 px-2 py-1 rounded">
//                       {scannedBarcode}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const BarcodeScanner = () => {
  const [scannedCode, setScannedCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const startScanning = async () => {
    try {
      setError("");
      const html5QrCode = new Html5Qrcode("reader");
      html5QrCodeRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        formatsToSupport: [
          // Common barcode formats
          "EAN_13",
          "EAN_8",
          "UPC_A",
          "UPC_E",
          "CODE_39",
          "CODE_93",
          "CODE_128",
          "ITF",
          "CODABAR",
          "QR_CODE",
        ],
      };

      await html5QrCode.start(
        { facingMode: "environment" }, // Use back camera
        config,
        (decodedText, decodedResult) => {
          // Stop scanning immediately after successful scan
          setScannedCode(decodedText);
          console.log("Scanned:", decodedText, decodedResult);
          stopScanning();
        },
        (errorMessage) => {
          // Handle scan errors quietly
        }
      );

      setIsScanning(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(`Error starting scanner: ${errorMessage}`);
      console.error(err);
    }
  };

  const stopScanning = async () => {
    if (html5QrCodeRef.current && isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const resetScanner = () => {
    setScannedCode("");
    setError("");
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Barcode Scanner</h2>

      <div style={{ marginBottom: "20px" }}>
        {scannedCode ? (
          <button
            onClick={resetScanner}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset & Scan Again
          </button>
        ) : !isScanning ? (
          <button
            onClick={startScanning}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Start Scanner
          </button>
        ) : (
          <button
            onClick={stopScanning}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Stop Scanner
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div
        id="reader"
        ref={scannerRef}
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          border: isScanning ? "2px solid #4CAF50" : "none",
        }}
      />

      {scannedCode && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e8f5e9",
            borderRadius: "4px",
            border: "1px solid #4CAF50",
          }}
        >
          <h3>Scanned Code:</h3>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              wordBreak: "break-all",
            }}
          >
            {scannedCode}
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
