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

import React, { useState, useEffect, useRef } from "react";

const BarcodeDetectionScanner: React.FC = () => {
  const [scannedCode, setScannedCode] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const barcodeDetectorRef = useRef<any>(null);

  useEffect(() => {
    const checkBarcodeSupport = () => {
      if (!("BarcodeDetector" in window)) {
        setIsSupported(false);
        setError(
          "Barcode Detection API is not supported in this browser. Please use Chrome, Edge, or Samsung Internet on Android."
        );
      }
    };

    checkBarcodeSupport();
  }, []);

  const scanFrame = async (): Promise<void> => {
    if (!videoRef.current || !isScanning || !barcodeDetectorRef.current) return;

    const video = videoRef.current;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      try {
        // Detect barcodes in the video frame
        const barcodes = await barcodeDetectorRef.current.detect(video);

        if (barcodes.length > 0) {
          const barcode = barcodes[0];
          setScannedCode(barcode.rawValue);
          console.log("Detected barcode:", barcode);
          stopScanning();
          return;
        }
      } catch (err) {
        console.error("Detection error:", err);
      }
    }

    // Continue scanning
    animationRef.current = requestAnimationFrame(scanFrame);
  };

  const startScanning = async (): Promise<void> => {
    try {
      setError("");
      setScannedCode("");

      if (!isSupported) {
        setError("Barcode Detection API is not supported in this browser.");
        return;
      }

      // Create BarcodeDetector with supported formats
      barcodeDetectorRef.current = new (window as any).BarcodeDetector({
        formats: [
          "aztec",
          "code_128",
          "code_39",
          "code_93",
          "codabar",
          "data_matrix",
          "ean_13",
          "ean_8",
          "itf",
          "pdf417",
          "qr_code",
          "upc_a",
          "upc_e",
        ],
      });

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsScanning(true);

      // Start scanning
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(scanFrame);
      }, 500);
    } catch (err) {
      const error = err as Error;
      setError(`Error: ${error.message}`);
      console.error(err);
    }
  };

  const stopScanning = (): void => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
  };

  const resetScanner = (): void => {
    setScannedCode("");
    setError("");
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Barcode Detection API Scanner</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        Using native Browser Barcode Detection API
      </p>

      {!isSupported && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fff3cd",
            color: "#856404",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "1px solid #ffc107",
          }}
        >
          <strong>⚠️ Not Supported</strong>
          <p style={{ margin: "10px 0 0 0", fontSize: "14px" }}>
            This browser doesn't support the Barcode Detection API. Please use
            Chrome, Edge, or Samsung Internet on Android.
          </p>
        </div>
      )}

      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
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
              fontWeight: "bold",
            }}
          >
            🔄 Reset & Scan Again
          </button>
        ) : !isScanning ? (
          <button
            onClick={startScanning}
            disabled={!isSupported}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: isSupported ? "#4CAF50" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isSupported ? "pointer" : "not-allowed",
              fontWeight: "bold",
            }}
          >
            📷 Start Scanner
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
              fontWeight: "bold",
            }}
          >
            ⏹️ Stop Scanner
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "1px solid #ef5350",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          position: "relative",
          backgroundColor: "#000",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "auto",
            display: isScanning && !scannedCode ? "block" : "none",
          }}
          playsInline
          muted
          autoPlay
        />
        {!isScanning && !scannedCode && (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "#999",
              backgroundColor: "#1a1a1a",
            }}
          >
            <p style={{ fontSize: "18px" }}>Click "Start Scanner" to begin</p>
          </div>
        )}
      </div>

      {isScanning && (
        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            backgroundColor: "#e3f2fd",
            border: "1px solid #2196F3",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
            📸 Scanning with native API...
          </p>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
            Point camera at barcode
          </p>
        </div>
      )}

      {scannedCode && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px",
            border: "2px solid #4CAF50",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#2e7d32" }}>
            ✅ Barcode Detected!
          </h3>
          <div
            style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Scanned Value:
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "10px 0 0 0",
                wordBreak: "break-all",
                fontFamily: "monospace",
                color: "#1976d2",
              }}
            >
              {scannedCode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeDetectionScanner;
