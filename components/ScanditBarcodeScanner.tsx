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

  useEffect(() => {
    let context: DataCaptureContext | null = null;
    let barcodeCapture: BarcodeCapture | null = null;

    const initializeScanner = async () => {
      try {
        // Initialize the SDK
        context = await DataCaptureContext.forLicenseKey(
          "ApjWDwscLAsXNte7teiEdpczBwmkJdThegK6jAY+JhT0CbGU/VT3iqpSLPzfFnKNqkaTGs5n6wvzd/5cyF4XmblM8eqRWiCUV3E3MM8TrQFKDXqhIQtB3VksqBblT8fwekeIZ0xnYILhbMjL6B2P4tBS0F5gbDUHIE6fTN5LDLrGRdAa2Va/HWhbo6EgSqAbgmrHuSFCSJzDRLkfh27unulGCJCVEUbV8nCbhdlkK5RnDc2oUBBZuSt94YVDbthfy3sJGT9bV8JnWgwfoHiXk4Z8qVuGf+7ye05hN7l/lwUzQXAlE3MKmNVTjspZF4Y6PUYskptMbVU7fIsKtFf1Nj9O7+QkQtA4hF9r2ypE+uRhdWGW/kZkuA5/XLPDRF2tAAwLrokdXtSiYBKE8lK1jdFK//W4Z16UoECxTT8Wr2M3Zw14z07EhPtT9uOrGpSILlNL2iR0h6TGbZlnaxpJNJMzq638fmO0MQTYInV5ApmLea961y14Eloh40s9StCIf0wFic5JNG9wCsQnCwwmVlUHa5wqdTYttscIXKufzGHZmIZu978Nr+5+12+NC+iI2M0zom+8etjiJynXN4c4Y+KJOjIJYOVd9AeztMdGYJ9CeDD7W4Bqg6awVl42j2S1oJEEGxlNoH4CFzkOZYwd9wmg5nz5XE1/92Dln8IXePOZXNQy/EDbNWH+EwxBon0OKn97xSpfyCrQZE5Zta3M0BdeRDlmNfSz+sAlpnyw4h8MdUPaks4/iaEdY/h2jrHNzS7tOZOJk4bSt/QB+PyiWr7v6zdy2izo6bH+XjADIZUBroEhsJofB2ifKwfW+RX1tDCjutf0BPcu3i8JYAOofvO5opCiwCNlQcBY8uxvhM+9KFTkOMyHqVyGHR4Eqx8ctQpdPnkgGwo/NKMlEEvsQqn0zLO7VQHwWrnEcPuiODuUqbrEoNM0cnJTN1V21no4GJTOobeNFHBfxNR+UxFQiaky5P0dsYk8Ax+kVwuPm7+yIHrZZWqZlPMJ3y8B10KZgz1j/CmIyeldZRkIk8+fnSMWEGRLXxwTEum0G8KA3425ZVSDXCRakU5qRE/f2G5byQs63ETRrmzB1YSGIeu7Jd+b3RLkPiRvuHDJNV8cHcLA/oUVoo8gozJcS/z++n43EqoMkkV5KK7Ub+zGq5z4apFM8C7V2nIBABLhFtBaVin+Hq+ii6U1HUn/H+HW0/6aMZ4=",
          {
            libraryLocation:
              "https://cdn.jsdelivr.net/npm/@scandit/web-datacapture-barcode@8.0.0/sdc-lib/",
            moduleLoaders: [barcodeCaptureLoader()],
          }
        );

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
