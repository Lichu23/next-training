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
"use client" 

import React, { useState, useEffect, useRef } from 'react';

interface Bar {
  color: 'black' | 'white';
  width: number;
}

interface NormalizedBar {
  color: 'black' | 'white';
  units: number;
}

const NativeBarcodeScanner: React.FC = () => {
  const [scannedCode, setScannedCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  // Simple pattern matching for common barcodes
  const decodeBarPattern = (bars: NormalizedBar[]): string | null => {
    // This is a simplified decoder - in reality, you'd need full implementations
    // of barcode standards like Code 128, Code 39, EAN-13, etc.
    
    // Code 39 start/stop pattern: narrow-wide-narrow (black-white-black-white-black-white-black-white-black)
    // Look for patterns that might indicate a barcode
    
    let hasValidPattern: boolean = false;
    let consecutiveAlternating: number = 0;
    
    for (let i = 1; i < bars.length; i++) {
      if (bars[i].color !== bars[i-1].color) {
        consecutiveAlternating++;
        if (consecutiveAlternating > 15) {
          hasValidPattern = true;
          break;
        }
      } else {
        consecutiveAlternating = 0;
      }
    }
    
    if (hasValidPattern) {
      // Generate a mock barcode for demonstration
      // In a real implementation, you'd decode the actual pattern
      const mockCode: string = generateMockCode(bars);
      return mockCode;
    }
    
    return null;
  };

  // Generate a code based on the pattern (simplified for demo)
  const generateMockCode = (bars: NormalizedBar[]): string => {
    // This would be replaced with actual decoding logic
    // For now, we'll create a hash of the pattern
    let hash: number = 0;
    for (let i = 0; i < Math.min(bars.length, 50); i++) {
      hash = ((hash << 5) - hash) + bars[i].units + (bars[i].color === 'black' ? 100 : 0);
      hash = hash & hash;
    }
    return Math.abs(hash).toString().substring(0, 12);
  };

  const scanFrame = (): void => {
    if (!videoRef.current || !canvasRef.current || !isScanning) return;

    const video: HTMLVideoElement = videoRef.current;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (!ctx) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data from canvas
      const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Try to detect barcode on multiple scan lines for better detection
      const scanLines = [
        Math.floor(canvas.height * 0.4),
        Math.floor(canvas.height * 0.5),
        Math.floor(canvas.height * 0.6)
      ];

      for (const scanY of scanLines) {
        const code: string | null = detectBarcodeAtLine(imageData, scanY);
        if (code) {
          setScannedCode(code);
          stopScanning();
          return;
        }
      }
    }

    // Continue scanning
    animationRef.current = requestAnimationFrame(scanFrame);
  };

  // Modified detection to work on specific scan line
  const detectBarcodeAtLine = (imageData: ImageData, scanY: number): string | null => {
    const { data, width } = imageData;
    
    const scanLine: number[] = [];
    
    // Convert to grayscale and get pixel values
    for (let x = 0; x < width; x++) {
      const index: number = (scanY * width + x) * 4;
      const r: number = data[index];
      const g: number = data[index + 1];
      const b: number = data[index + 2];
      const gray: number = (r + g + b) / 3;
      scanLine.push(gray);
    }
    
    // Find bars (dark and light patterns)
    const threshold: number = 128;
    const bars: Bar[] = [];
    let currentBar: Bar = { color: scanLine[0] < threshold ? 'black' : 'white', width: 1 };
    
    for (let i = 1; i < scanLine.length; i++) {
      const currentColor: 'black' | 'white' = scanLine[i] < threshold ? 'black' : 'white';
      
      if (currentColor === currentBar.color) {
        currentBar.width++;
      } else {
        bars.push(currentBar);
        currentBar = { color: currentColor, width: 1 };
      }
    }
    bars.push(currentBar);
    
    // Check if we have a valid barcode pattern (alternating black/white bars)
    if (bars.length < 15) return null; // Reduced threshold for better detection
    
    // Normalize bar widths (find the smallest bar width as unit)
    const minWidth: number = Math.min(...bars.map(b => b.width));
    const normalizedBars: NormalizedBar[] = bars.map(b => ({
      color: b.color,
      units: Math.round(b.width / minWidth)
    }));
    
    // Try to decode pattern
    const code: string | null = decodeBarPattern(normalizedBars);
    return code;
  };

  const startScanning = async (): Promise<void> => {
    try {
      setError('');
      setScannedCode('');

      // Request camera access with focus optimization
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },  // Reduced for better focus
          height: { ideal: 480 }, // Reduced for better focus
          focusMode: 'continuous' as any,
          advanced: [
            { focusMode: 'continuous' } as any,
            { focusDistance: { ideal: 0.3 } } as any // Focus at 30cm for barcodes
          ]
        }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Apply video track settings for better focus
        const videoTrack = stream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities() as any;
        
        if (capabilities.focusMode && capabilities.focusMode.includes('continuous')) {
          await videoTrack.applyConstraints({
            advanced: [{ focusMode: 'continuous' } as any]
          });
        }
      }

      setIsScanning(true);

      // Start scanning frames
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(scanFrame);
      }, 1000); // Increased delay to allow camera to focus

    } catch (err) {
      const error = err as Error;
      setError(`Camera access denied or unavailable: ${error.message}`);
      console.error(err);
    }
  };

  const stopScanning = (): void => {
    // Stop animation frame
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Stop video stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Clear video
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
  };

  const resetScanner = (): void => {
    setScannedCode('');
    setError('');
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Native Barcode Scanner</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>
        Using pure JavaScript, React & HTML (Canvas API)
      </p>

      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        {scannedCode ? (
          <button
            onClick={resetScanner}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 Reset & Scan Again
          </button>
        ) : !isScanning ? (
          <button
            onClick={startScanning}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            📷 Start Scanner
          </button>
        ) : (
          <button
            onClick={stopScanning}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ⏹️ Stop Scanner
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #ef5350'
          }}
        >
          {error}
        </div>
      )}

      <div style={{ 
        position: 'relative', 
        backgroundColor: '#000', 
        borderRadius: '8px', 
        overflow: 'hidden',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '300px',
            display: isScanning && !scannedCode ? 'block' : 'none',
            objectFit: 'cover'
          }}
          playsInline
          muted
          autoPlay
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: isScanning && !scannedCode ? 'block' : 'none'
          }}
        />
        {isScanning && !scannedCode && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '60px',
            border: '3px solid #00ff00',
            borderRadius: '8px',
            pointerEvents: 'none',
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '2px',
              backgroundColor: '#00ff00',
              transform: 'translateY(-50%)',
              animation: 'scan 2s ease-in-out infinite'
            }} />
          </div>
        )}
        {!isScanning && !scannedCode && (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#999',
            backgroundColor: '#1a1a1a'
          }}>
            <p style={{ fontSize: '18px' }}>Click "Start Scanner" to begin</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 20%; }
          50% { top: 80%; }
        }
      `}</style>

      {isScanning && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>
            📸 Hold barcode 15-20cm from camera
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            Keep steady and align barcode within the green box
          </p>
        </div>
      )}

      {scannedCode && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            border: '2px solid #4CAF50'
          }}
        >
          <h3 style={{ marginTop: 0, color: '#2e7d32' }}>✅ Barcode Detected!</h3>
          <div style={{
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Scanned Value:</p>
            <p
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '10px 0 0 0',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                color: '#1976d2'
              }}
            >
              {scannedCode}
            </p>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#666'
      }}>
        <strong>Note:</strong> This is a simplified native implementation using Canvas API and basic pattern recognition.
        For production use, consider using specialized libraries like QuaggaJS or ZXing for accurate decoding of various barcode formats.
      </div>
    </div>
  );
};

export default NativeBarcodeScanner;