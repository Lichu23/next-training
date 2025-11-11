'use client';
import { useEffect, useRef, useState } from 'react';
import type ScanbotSDK from 'scanbot-web-sdk/UI';

interface ScanbotBarcodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

export default function ScanbotBarcodeScanner({ onScanSuccess, onScanError }: ScanbotBarcodeScannerProps) {
  const containerId = 'scanbot-barcode-reader';
  const sdkRef = useRef<typeof ScanbotSDK | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const { default: ScanbotSdk } = await import('scanbot-web-sdk/UI');
        sdkRef.current = ScanbotSdk;

        await ScanbotSdk.initialize({
          licenseKey: '', // Replace with your Scanbot license key (empty for trial)
          enginePath: '/wasm/',
        });
        setInitialized(true);
      } catch (err) {
        if (onScanError) onScanError(`Initialization error: ${err}`);
      }
    };

    initializeSDK();

    return () => {
      // Cleanup if needed (SDK doesn't have explicit stop, but container is unmounted)
    };
  }, [onScanError]);

  useEffect(() => {
    const startScanner = async () => {
      if (!initialized || !sdkRef.current) return;

      try {
        const config = new sdkRef.current.UI.Config.BarcodeScannerScreenConfiguration();
        config.containerId = containerId;
        // Optional customizations for single mode (default is single)
        // config.useCase = new sdkRef.current.UI.Config.SingleScanningMode(); // Explicit single mode if needed
        // config.palette.sbColorPrimary = '#1E90FF'; // Example customization

        const result = await sdkRef.current.UI.createBarcodeScanner(config);

        if (result && result.items.length > 0) {
          onScanSuccess(result.items[0].barcode.text);
        }
      } catch (err) {
        if (onScanError) onScanError(`Scan error: ${err}`);
      }
    };

    if (initialized) {
      startScanner();
    }
  }, [initialized, onScanSuccess, onScanError]);

  return <div id={containerId} style={{ width: '100%', height: '500px' }} />; // Adjust height as needed
}