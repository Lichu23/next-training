Get Started
In this guide you will learn step-by-step how to add SparkScan to your application. The general steps are:

Create a new Data Capture Context instance.
Configure the Spark Scan Mode.
Create the SparkScanView with the desired settings and bind it to the application’s lifecycle.
Register the listener to be informed when new barcodes are scanned and update your data whenever this event occurs.
Prerequisites
The latest stable version of Node.js and npm (required only if including and building the SDK as part of an app, instead of just including it as an external resource from a CDN in HTML).
A valid Scandit Data Capture SDK license key. You can sign up for a free test account.
If you have not already done so, see this guide for information on how to add the Scandit Data Capture SDK to your project
note
Devices running the Scandit Data Capture SDK need to have a GPU or the performance will drastically decrease.

Create a New Data Capture Context Instance
The first step to add capture capabilities to your application is to create a new Data Capture Context. The context expects a valid Scandit Data Capture SDK license key during construction.

import { DataCaptureContext } from "@scandit/web-datacapture-core";
import { 
  barcodeCaptureLoader,
  SparkScanSettings, 
  SparkScan, 
  SparkScanViewSettings 
} from "@scandit/web-datacapture-barcode";

await DataCaptureContext.forLicenseKey("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", {
  libraryLocation: new URL("sdc-lib-self-hosted-path", document.baseURI).toString(),
  // or use the cdn https://cdn.jsdelivr.net/npm/@scandit/web-datacapture-barcode@8.0.0/sdc-lib/
  moduleLoaders: [barcodeCaptureLoader()],
});

const dataCaptureContext = await DataCaptureContext.create();


Configure the SparkScan Mode
The SparkScan Mode is configured through SparkScanSettings and allows you to register one or more listeners that are informed whenever a new barcode is scanned.

For this tutorial, we will set up SparkScan for scanning EAN13 codes. Change this to the correct symbologies for your use case (for example, Code 128, Code 39…).

const sparkScanSettings = new SparkScanSettings();
sparkScanSettings.enableSymbologies([Symbology.EAN13UPCA]);

Next, create a SparkScan instance with the settings initialized in the previous step:

const sparkScan = SparkScan.forSettings(this.sparkScanSettings);

Setup the Spark Scan View
The SparkScan built-in user interface includes the camera preview and scanning UI elements. These guide the user through the scanning process.

The SparkScanView appearance can be customized through SparkScanViewSettings.

const sparkScanViewSettings = new SparkScanViewSettings();
// setup the desired appearance settings by updating the fields in the object above

See the SparkScan Workflow Options section for more information.

By adding a SparkScanView, the scanning interface (camera preview and scanning UI elements) will be added automatically to your application.

Add a SparkScanView to your view hierarchy. Construct a new SparkScan view, making sure to call sure to call SparkScanView.prepareScanning(). The SparkScanView is automatically added to the provided parentView:

const sparkScanView = SparkScanView.forElement(
  document.body,
  dataCaptureContext,
  sparkScan,
  sparkScanViewSettings
);
await sparkScanView.prepareScanning();

Additionally, make sure to call SparkScanView.stopScanning() in your app state handling logic. You have to call this for the correct functioning of the SparkScanView.

disconnectedCallback() {
  sparkScanView.stopScanning();
}

handleAppStateChange = async (nextAppState) => {
  if (nextAppState.match(/inactive|background/)) {
    sparkScanView.stopScanning();
  }
}

Register the Listener
To keep track of the barcodes that have been scanned, implement the SparkScanListener interface and register the listener to the SparkScan mode.

// Register a listener object to monitor the spark scan session.
const listener = {
 didScan: (sparkScan, session, frameData) => {
  // Gather the recognized barcode
  const barcode = session.newlyRecognizedBarcode;

  if (barcode != null) {
    // Handle the barcode
  }  
 },
};

sparkScan.addListener(listener);

SparkScanListener.didScan() is called when a new barcode has been scanned. This result can be retrieved from the first object in the provided barcodes list: SparkScanSession.newlyRecognizedBarcode. Please note that this list only contains one barcode entry.

Get Started
This page will guide you through the process of adding ID Capture to your Web application. ID Capture is a mode of the Scandit Data Capture SDK that allows you to capture and extract information from personal identification documents, such as driver's licenses, passports, and ID cards.

The general steps are:

Create a DataCaptureContext.
Access a Camera.
Use IdCaptureSettings to configure the scan process.
Implement an IdCaptureListener to receive scan results.
Set up DataCaptureView and IdCaptureOverlay to see the camera feed and the scan UI.
Begin the scanning by adding an IdCapture to DataCaptureContext and starting a camera.
warning
Using ID Capture at the same time as other modes (e.g. Barcode Capture) is not supported.

Prerequisites
Before starting with adding a capture mode, make sure that you have a valid Scandit Data Capture SDK license key and that you added the necessary dependencies. If you have not done that yet, check out this guide.

tip
You can retrieve your Scandit Data Capture SDK license key by signing in to your Scandit account.

Please note that your license may support only a subset of ID Capture features. If you would like to use additional features please contact us at Scandit Support.

Module Overview
The modules that need to be included in your project depend on the features you want to use. The following table lists what modules you need to include in your project, depending on the features you want to use.

Module	Required for Feature
ScanditCaptureCore	Always
ScanditIdCapture	Always
ScanditIdCaptureBackend	Extract data from VIZ (e.g. front of IDs and driver licenses, human-readable data on Passport, etc.)
ScanditIdAamvaBarcodeVerification	Verify US Driver Licenses
ScanditIdVoidedDetection	Reject voided IDs
tip
Note that your license may support only a subset all ID Capture capabilities. If you need to use additional features, contact us.

Configure and Initialize the Library
In addition to the configuration detailed in the installation guide, there are some additional steps required for ID Capture.

For ID Capture, the result of idCaptureLoader() must be passed to the ConfigureOptions.moduleLoaders option.

In this example, we will scan VIZ documents, so we also need to set IdCaptureLoaderOptions.enableVIZDocuments to true:

import { DataCaptureContext } from "@scandit/web-datacapture-core";
import { idCaptureLoader } from "@scandit/web-datacapture-id";

const context = await DataCaptureContext.forLicenseKey("-- ENTER YOUR SCANDIT LICENSE KEY HERE --", {
 libraryLocation: "/self-hosted-sdc-lib/",
 moduleLoaders: [idCaptureLoader({ enableVIZDocuments: true })],
});


tip
Avoid enabling VIZ documents if you only scan MRZs or barcodes, as it slows down the scanning initialization because more data must be downloaded.

warning
You must await the returned promise as shown to be able to continue.

Create the View
When the scanning process is requested, it is good practice to keep the user informed about what is happening. The SDK may still be loading so you should display a view to the user as soon as possible.

To do that, start by adding a DataCaptureView and attach it to an HTML element in the page. For example, let's display a progress bar while the SDK is loading:

import { DataCaptureView } from "@scandit/web-datacapture-core";

const view = new DataCaptureView();
view.connectToElement(htmlElement);
view.showProgressBar();

tip
You may not need to do this so early if your application loads the SDK in the background (e.g. on startup) and the view is already available when the user requests scanning.

Attach Context to View
If you already created a view earlier (as shown in the "Create the View" section), you should now attach the context to it:

await view.setContext(context);

Add the Camera
You need to also create the Camera:

import { Camera } from "@scandit/web-datacapture-core";
import { IdCapture } from "@scandit/web-datacapture-id";


const camera = Camera.pickBestGuess();
await context.setFrameSource(camera);

const cameraSettings = IdCapture.recommendedCameraSettings;

// Depending on the use case further camera settings adjustments can be made here.

await camera.applySettings(cameraSettings);

Create ID Capture Settings
Use IdCaptureSettings to configure the scanner type to use and the documents that should be accepted and/or rejected.

Check IdCaptureDocumentType for all available options.

tip
By default, anonymized data is not returned in accordance with local regulations for specific documents. This setting can be disabled for testing purposes, but be sure to comply with local laws and requirements in production.

import {
 IdCapture,
 IdCaptureSettings,
 IdCard,
 Region,
 RegionSpecific,
 Passport,
 SingleSideScanner,
 FullDocumentScanner
} from "@scandit/web-datacapture-id";

const settings = new IdCaptureSettings();

// Documents from any region:
settings.acceptedDocuments.push(new IdCard(Region.AnyRegion));
// Only documents issued by a specific country:
settings.acceptedDocuments.push(new IdCard(Region.Germany));
// Regional documents:
settings.acceptedDocuments.push(new RegionSpecific.ApecBusinessTravelCard());
// Reject passports from certain regions:
settings.rejectedDocuments.push(new Passport(Region.Cuba));

// To scan only one-sided documents and a given zone:
// Signature: SingleSideScanner(barcode: boolean, machineReadableZone boolean, visualInspectionZone: boolean)
settings.scannerType = new SingleSideScanner(true, false, false);
// or
settings.scannerType = new SingleSideScanner(false, true, false);
// or
settings.scannerType = new SingleSideScanner(false, false, true);

// To scan both sides of the document:
settings.scannerType = new FullDocumentScanner();


Create a new ID Capture mode with the chosen settings:

const idCapture = await IdCapture.forContext(context, settings);

Implement the Listener
To receive scan results, implement IdCaptureListener. The listener provides two important callbacks: didCaptureId and didRejectId.

import { type CapturedId, RejectionReason } from "@scandit/web-datacapture-id";

idCapture.addListener({
 didCaptureId: (capturedId: CapturedId) => {
  // Success! Handle extracted data here.
 },
 didRejectId: (capturedId: CapturedId, reason: RejectionReason) => {
  // Something went wrong. Inspect the reason to determine the follow-up action.
 }
});

Handling Success
Captured results are delivered as a CapturedId. This class contains data common for all kinds of personal identification documents.

Note that if you scan boths sides of a document using the FullDocumentScanner, this callback will only be executed once both sides have been successfully captured. If the document is known to have only one side, the callback will execute immediately after a successful scan of the first side.

For more specific information, use its non-null result properties (e.g. CapturedId.barcode).

On a successful scan you may read the extracted data from capturedId:

didCaptureId: async (capturedId: CapturedId) => {
 // stop processing new frames, we have a result
 await idCapture.setEnabled(false);

 const fullName = capturedId.fullName;
 const dateOfBirth = capturedId.dateOfBirth;
 const dateOfExpiry = capturedId.dateOfExpiry;
 const documentNumber = capturedId.documentNumber;

 // Process data:
 processData(fullName, dateOfBirth, dateOfExpiry, documentNumber);
}

tip
All data fields are optional, so it's important to verify whether the required information is present if some of the accepted documents may not contain certain data.

Handling Rejection
The ID scanning process may fail for various reasons. Start from inspecting RejectionReason to understand the cause.

Note that some data may still have been captured, you will find them in the first capturedId parameter of the callback.

You may wish to implement the follow-up action based on the reason of failure:

onIdRejected: (capturedId: CapturedId, reason: RejectionReason) => {
 if (reason === RejectionReason.Timeout) {
  // Ask the user to retry, or offer alternative input method.
 } else if (reason === RejectionReason.DocumentExpired) {
  // Ask the user to provide alternative document.
 } else if (reason === RejectionReason.NotAcceptedDocumentType) {
  // Inform the user which documents are accepted.
 }
}

Add an Overlay
The overlay informs and guides the user during the scanning process. Create an instance of IdCaptureOverlay for the existing view like so:

import { IdCaptureOverlay } from "@scandit/web-datacapture-id";

const overlay = await IdCaptureOverlay.withIdCaptureForView(
 idCapture,
 dataCaptureView
);

The overlay chooses the displayed UI automatically, based on the selected IdCaptureSettings.

If you prefer to show a different UI or to temporarily hide it, set the appropriate IdCaptureOverlay.idLayout.

Start the Capture Process
Finally, turn on the camera to start scanning:

import { FrameSourceState } from "@scandit/web-datacapture-core";

// ...

await camera.switchToDesiredState(FrameSourceState.On);

