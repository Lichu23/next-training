"use client";
import { useEffect, useRef } from "react";
import {
  DataCaptureContext,
  Camera,
  FrameSourceState,
} from "@scandit/web-datacapture-core";
import {
  barcodeCaptureLoader,
  BarcodeCapture,
  BarcodeCaptureSettings,
  Symbology,
} from "@scandit/web-datacapture-barcode";

interface ScanditBarcodeScannerProps {
  onScanSuccess: (barcode: string) => void;
  onError?: (error: Error) => void;
}

export default function ScanditBarcodeScanner({
  onScanSuccess,
  onError,
}: ScanditBarcodeScannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<any>(null);
  const licenseKey = process.env.NEXT_PUBLIC_SCANDIT_LICENSE_KEY;
  if (!licenseKey) {
    throw new Error(
      "Scandit license key is not configured. Please set NEXT_PUBLIC_SCANDIT_LICENSE_KEY in your .env.local file"
    );
  }

  useEffect(() => {
    let context: DataCaptureContext | null = null;
    let barcodeCapture: BarcodeCapture | null = null;

    const initializeScanner = async () => {
      try {
        // Initialize the SDK
        context = await DataCaptureContext.forLicenseKey(licenseKey, {
          libraryLocation:
            "https://cdn.jsdelivr.net/npm/@scandit/web-datacapture-barcode@8.0.0/sdc-lib/",
          moduleLoaders: [barcodeCaptureLoader()],
        });

        // Configure which barcode types to recognize
        const settings = new BarcodeCaptureSettings();
        settings.enableSymbologies([
          Symbology.EAN13UPCA,
          Symbology.EAN8,
          Symbology.UPCE,
          Symbology.Code128,
          Symbology.Code39,
          Symbology.QR,
        ]);

        // Create barcode capture mode with the settings
        barcodeCapture = await BarcodeCapture.forContext(context, settings);

        // Set up the barcode capture behavior
        barcodeCapture.addListener({
          didScan: async (barcodeCaptureMode, session) => {
            const barcode = session.newlyRecognizedBarcode;
            if (barcode && barcode.data) {
              onScanSuccess(barcode.data);
            }
          },
        });

        // Get the camera and set it up
        const camera = Camera.pickBestGuess();
        if (camera) {
          await context.setFrameSource(camera);
          await camera.switchToDesiredState(FrameSourceState.On);
        }

        // Create a view to render the camera preview
        if (containerRef.current) {
          const { DataCaptureView } = await import(
            "@scandit/web-datacapture-core"
          );
          const view = new DataCaptureView();
          viewRef.current = view;
          view.connectToElement(containerRef.current);
          view.setContext(context);
        }
      } catch (error) {
        console.error("Error initializing scanner:", error);
        if (onError) onError(error as Error);
      }
    };

    initializeScanner();

    // Cleanup function
    return () => {
      if (context) {
        context.dispose();
      }
      if (viewRef.current) {
        viewRef.current.dispose();
      }
    };
  }, [onScanSuccess, onError]);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
}
