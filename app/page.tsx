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
import ZXingBarcodeScanner from "@/components/ZXINGBarcodeScanner";

export function App() {
  return (
    <div>
      <ZXingBarcodeScanner />
    </div>
  );
}
