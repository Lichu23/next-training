"use client";

import React, { useState, useEffect, useRef } from "react";

// Declare ZXing types
interface ZXingType {
  BarcodeReader?: {
    new (): {
      decodeFromVideoElement: (
        video: HTMLVideoElement,
        timeout: number
      ) => Promise<{ text: string }>;
      // Add other methods you use
    };
  };
  BrowserMultiFormatReader: {
    new (): {
      decodeFromVideoElement: (
        video: HTMLVideoElement,
        timeout: number
      ) => Promise<{ text: string }>;
      decodeFromImageData: (imageData: ImageData) => Promise<{ text: string }>;
      reset: () => void;
      // Add other methods you use
    };
  };
}

declare global {
  interface Window {
    ZXing: ZXingType;
  }
}

const ZXingBarcodeScanner: React.FC = () => {
  const [scannedCode, setScannedCode] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const codeReaderRef = useRef<InstanceType<ZXingType["BrowserMultiFormatReader"]> | null>(
    null
  );

  useEffect(() => {
    // Load ZXing library from CDN
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@zxing/library@latest/umd/index.min.js";
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      console.log("ZXing library loaded");
    };
    script.onerror = () => {
      setError("Failed to load ZXing library");
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scanFrame = async (): Promise<void> => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      !isScanning ||
      !codeReaderRef.current
    ) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    try {
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Try to decode
      const result = await codeReaderRef.current.decodeFromImageData(imageData);

      if (result) {
        setScannedCode(result.text);
        console.log("Detected:", result);
        stopScanning();
        return;
      }
    } catch (err: unknown) {
      // Type guard to check if error is an object with a name property
      if (err instanceof Error) {
        if (err.name !== "NotFoundException") {
          console.error("Scan error:", err);
        }
      } else if (err !== null && typeof err === "object" && "name" in err) {
        // For non-Error objects that might have a name property
        const errorObj = err as { name?: unknown };
        if (errorObj.name !== "NotFoundException") {
          console.error("Scan error:", err);
        }
      } else {
        // For any other type of error
        console.error("Unknown error occurred:", err);
      }
    }

    // Continue scanning
    animationRef.current = requestAnimationFrame(scanFrame);
  };

  const startScanning = async (): Promise<void> => {
    try {
      setError("");
      setScannedCode("");

      if (isLoading) {
        setError("ZXing library is still loading...");
        return;
      }

      if (!window.ZXing) {
        setError("ZXing library not available");
        return;
      }

      // Create code reader with multiple format support
      const codeReader = new window.ZXing.BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

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

      // Start scanning after camera initializes
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
      animationRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
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
      <h2>ZXing Barcode Scanner</h2>
      <p style={{ color: "#666", fontSize: "14px" }}>
        Using ZXing library (loaded via CDN)
      </p>

      {isLoading && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e3f2fd",
            color: "#1565c0",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "1px solid #2196F3",
          }}
        >
          ⏳ Loading ZXing library...
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
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: isLoading ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
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
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {!isScanning && !scannedCode && (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              color: "#999",
              backgroundColor: "#1a1a1a",
            }}
          >
            <p style={{ fontSize: "18px" }}>Click Start Scanner to begin</p>
          </div>
        )}
      </div>

      {isScanning && (
        <div
          style={{
            marginTop: "15px",
            padding: "12px",
            backgroundColor: "#e8f5e9",
            border: "1px solid #4CAF50",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
            📸 Scanning with ZXing...
          </p>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
            Hold barcode steady in view
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

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          fontSize: "13px",
          color: "#666",
        }}
      >
        <strong>✨ ZXing Features:</strong>
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          <li>Supports all major barcode formats</li>
          <li>High accuracy detection</li>
          <li>Works in all modern browsers</li>
          <li>No npm install required (CDN)</li>
        </ul>
      </div>
    </div>
  );
};

export default ZXingBarcodeScanner;
