// components/QrCodeScanner.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QrCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

export default function QrCodeScanner({ onScanSuccess, onScanError }: QrCodeScannerProps) {
  const scanner = useRef<Html5Qrcode | null>(null);
  const containerId = 'qr-code-reader';

  useEffect(() => {
    scanner.current = new Html5Qrcode(containerId);

    const config = { 
      fps: 10,
      qrbox: { width: 250, height: 250 }
    };

    scanner.current.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        onScanSuccess(decodedText);
      },
      (error) => {
        if (onScanError) {
          onScanError(error);
        }
      }
    ).catch((err) => {
      if (onScanError) {
        onScanError(`Error starting scanner: ${err}`);
      }
    });

    return () => {
      if (scanner.current?.isScanning) {
        scanner.current.stop().catch(() => {
          // Ignore errors during cleanup
        });
      }
    };
  }, [onScanSuccess, onScanError]);

  return <div id={containerId} />;
}