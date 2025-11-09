Example app for the Scanbot Web Barcode Scanner and Document Scanner SDK
This example app shows how to integrate the Scanbot Barcode Scanner SDK, Document Scanner SDK, and Data Capture functionalities into your web applications.

What is the Scanbot SDK?
The Scanbot SDK is a set of high-level APIs that lets you integrate barcode and document scanning, as well as data extraction functionalities, into your website. It runs in all common web browsers, such as Chrome, Safari, Firefox, or Edge, and operates entirely on the user's device. No data is transmitted to our or third-party servers.

The SDK can be implemented into your web app with just a few lines of code and comes with Ready-To-Use UI components.

💡 For more details about the Scanbot Web SDK, please see our Barcode Scanner or Document Scanner documentation.

How to run this example app?
React App
The React example app relies on the Scanbot SDK's npm package.

To run the React example app:

cd react-js/
npm install
npm start
Vue.js App
Like the React example app, the Vue.js example app relies on the Scanbot SDK's npm package.

To run the Vue.js example app:

cd vue-js/
npm install
npm run dev
Plain JavaScript App
The vanilla JavaScript app needs to download the SDK from npm. To do this, run the script

plain-js/download-sdk.sh
To run the JavaScript example:

cd plain-js/
php -S localhost:8000
Overview of the Scanbot SDK
Barcode Scanner SDK
The Scanbot Barcode Scanner SDK for the web allows you to integrate fast and accurate barcode scanning capabilities into your web apps.

Barcodes are scanned in just 0.04 seconds, and scans remain precise even under challenging conditions, including damaged, small, or distant barcodes and low-light environments.

Out-of-the-box barcode scanning workflows
The Scanbot Barcode Scanner SDK offers the following scan modes, available out-of-the-box in our ready-to-use UI:

Single Scanning
Batch & Multi Scanning
Find & Pick
Scan & Count
Batch Scanning	Multi Scanning	Find and Pick
Scanning barcodes from an image
The Scanbot Web Barcode Scanner SDK also supports still images, enabling you to scan barcodes and QR Codes from JPG and other image files. It supports single-image and multi-image detection and returns a list with the recognized barcodes.

Supported barcode formats
The Web Barcode Scanner library supports all common 1D- or 2D barcodes and multiple postal symbologies, including:

Barcode type	Barcode symbologies
1D Barcodes	EAN, UPC, Code 128, GS1-128, Code 39, Codabar, ITF, Code 25, Code 32, Code 93, Code 11, MSI Plessey, Standard 2 of 5, IATA 2 of 5, Databar (RSS), GS1 Composite
2D Barcodes	QR Code, Micro QR Code, Aztec Code, PDF417 Code, Data Matrix Code, GiroCode, NTIN Code, PPN, UDI, Royal Mail Mailmark, MaxiCode
Postal Symbologies	USPS Intelligent Mail Barcode (IMb), Royal Mail RM4SCC Barcode, Australia Post 4-State Customer Code, Japan Post 4-State Customer Code, KIX
💡 Please visit our docs for a complete overview of the supported barcode symbologies.

Data Parsers
The Scanbot Web Barcode Scanner SDK supports a variety of data parsers that extract structured information from 2D barcodes such as QR Codes and Data Matrix. These include parsers for documents such as driving licences (AAMVA), boarding passes, medical certificates, SEPA forms, Swiss QR codes and vCard business cards.

💡 Please refer to our documentation for a full list of supported data parsers.

Document Scanner SDK
The Scanbot Web Document Scanner SDK offers the following features:

User guidance: Ease of use is crucial for large user bases. Our on-screen user guidance helps even non-tech-savvy users create perfect scans.

Automatic capture: The SDK automatically captures the document when the device is optimally positioned over the document. This reduces the risk of blurry or incomplete document scans compared to manually-triggered capture.

Automatic cropping: Our document scanning SDK automatically straightens and crops scanned documents, ensuring high-quality document scan results.

Document Quality Analyzer: This feature automatically rates the quality of the scanned pages from “very poor” to “excellent.” If the quality is below a specified threshold, the SDK prompts the user to rescan.

Export formats: The SDK supports various formats for exporting and processing documents (JPG, PDF, TIFF, and PNG). This ensures your downstream solutions receive the best format to store, print, or share the digitized document – or to process it further.

User guidance	Automatic capture	Automatic cropping
Data Capture Modules
The Scanbot SDK Data Capture Modules allow you to extract data from a wide range of documents, including MRZ codes on identity documents, Checks, U.S. and German driver’s licenses, EHICs, German ID cards, and German residence permit cards and to integrate OCR text recognition capabilities.



Additional information
Free integration support
Need help integrating or testing our Barcode Scanner or Document Scanner SDKs? We offer free developer support via Slack, MS Teams, or email.

As a customer, you also get access to a dedicated support Slack or Microsoft Teams channel to talk directly to your Customer Success Manager and our engineers.

Licensing and pricing
These examples will run one minute per session without a license. After that, all functionalities and UI components will stop working.

To try the Scanbot SDK without the one-minute limit, you can request a free, no-strings-attached 7-day trial license.

Alternatively, check out our demo apps to test the SDK.

Our pricing model is simple: Unlimited barcode scanning for a flat annual license fee, full support included. There are no tiers, usage charges, or extra fees. Contact our team to receive your quote.

Other supported platforms
The Scanbot SDK is also available as a native SDK or for most common cross-plattform frameworks:

Barcode Scanner SDK
Android (native)
iOS (native)
React Native
Flutter
Capacitor & Ionic
Cordova & Ionic
Compose Multiplatform / KMP
Xamarin & Xamarin.Forms
UWP
Linux


Web Document Scanner SDK
		
Overview
The Web Document Scanner SDK is a powerful and easy-to-integrate software development kit for turning smartphones and tablets into fast and reliable document scanners.

Features include:

User guidance: Ease of use is crucial for large user bases. The on-screen user guidance helps even non-tech-savvy users create perfect scans.

Automatic capture: The SDK automatically captures the document when the device is optimally positioned over the document. This reduces the risk of blurry or incomplete document scans compared to manually triggered captures.

Automatic cropping: The SDK automatically straightens and crops scanned documents, ensuring high-quality document scan results.

Image filters: Every document scanning use case has specific image requirements. With the SDK’s custom filters, you can tailor the document scanning image output to your backend system. They include grayscale options, multiple binarizations, and other settings to optimize your document scanning for various document types.

Document Quality Analyzer: This feature automatically rates the quality of the scanned pages from “very poor” to “excellent.” If the quality is below a specified threshold, the SDK prompts the user to rescan.

Multiple export formats: The SDK supports several output formats for exporting digitized documents, like JPG, PDF, and TIFF. This ensures your downstream solutions receive the best format to store, print, or share the digitized document – or to process it further.

With the Ready-To-Use UI Components (RTU UI), you can integrate the SDK's scanning functionalities with only a few lines of code. This way, you can benefit from tried-and-true UX design and straightforward integration while still being able to customize the visual appearance to match your brand.

If you want full control over the scanner's appearance, you can instead use the SDK's Classic UI Components (Classic UI) to build a fully customized scanning experience yourself.

Visit our website for more information about our other products.

Requirements
Since the Web SDK is based on WebAssembly, older browsers are unfortunately not supported.

WebAssembly and the Scanbot Web Document Scanner SDK are supported as of the following versions:

Edge 16+
Firefox 53+
Chrome 57+
Safari 11+
The Scanbot Web Document Scanner SDK is optimized for mobile browsers.

The latest versions of the following mobile browsers are supported:

Android: Chrome, Firefox, Edge
iOS 14.5+: Safari, Chrome, Firefox, Edge

Work with the Scanbot SDK:
Quick start for the Web Document Scanner SDK
In this section, you'll learn how to set up the Scanbot Web Document Scanner SDK in just a few minutes – thanks to its Ready-to-Use UI!

Add the dependency
First, simply add the script tag of the SDK to your HTML file. Make sure to put it before your main script.

<html>
    <head>
        <title>ScanbotSDK Quickstart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div id="document-scanner-container" style="width: 100%; height: 100%;"></div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/scanbot-web-sdk@latest/bundle/ScanbotSDK.ui2.min.js"></script>
    <script src="./main.js"></script>
</html>


warning
CDNs like jsDelivr should only be used for quick prototyping.

For your production environment, please download the SDK and host it on your server.

Initialize the Scanbot SDK
Since most environments do not allow top-level await, you need to wrap your code in an async function.

(async function() {
    const sdk = await ScanbotSDK.initialize({
        licenseKey: "",
        enginePath: "https://cdn.jsdelivr.net/npm/scanbot-web-sdk@latest/bundle/bin/complete/"
    });
})();

Start the scanner and process the results
Remember to wrap the scanner creation into the same async block as the initialization.

// Configure the scanner as needed
const config = new ScanbotSDK.UI.Config.DocumentScanningFlow();
// Create the scanner with the config object
const result = await ScanbotSDK.UI.createDocumentScanner(config);
// Result can be null if the user cancels the scanning process
console.log(result.document);

🚀 That's it! 🚀 You have successfully integrated a full-featured document scanner as an RTU UI controller into your app.

Installing the Web Document Scanner SDK
npm
The Scanbot SDK is available as an npm package:

npm install scanbot-web-sdk --save

You can then import the SDK in your JavaScript or Typescript project:

import ScanbotSDK from 'scanbot-web-sdk'

All SDK modules are available under this ScanbotSDK object.

When using the ScanbotSDK object in Typescript projects, most types can be inferred automatically. However, if necessary, Typescript projects may explicitly include typings by including them from scanbot-web-sdk/@types, e.g.:

import ScanbotSDK from 'scanbot-web-sdk'
import type { IDocumentScannerHandle } from 'scanbot-web-sdk/@types'

class MyPage {
  // We need to explicitly mention the field's type here. We obtain the type via an `import type` statement from `scanbot-web-sdk/@types`.
  private documentScanner: IDocumentScannerHandle;
  constructor() {
    this.documentScanner = ScanbotSDK.createDocumentScanner();
  }
}


Manual packing
If you are not using npm in your project, you can still use npm as a one-time command to download the Scanbot Web SDK package:

# Use npm pack to download the SDK package as a tarball
npm pack scanbot-web-sdk

# Extract the tarball
tar -xf scanbot-web-sdk-*.tgz

Now, you can place a <script src="package/bundle/ScanbotSDK.min.js"></script> tag in your index.html. The script puts the SDK entry point into a global variable named ScanbotSDK.

Initializing the SDK
After downloading and importing the SDK, you need to initialize it with your license key.

Want to scan longer than one minute?
Generate a free trial license to test the Scanbot SDK thoroughly.

Get free trial license

Initializing the Web Document Scanner SDK
Free Developer Support
We provide free technical support for the implementation and testing of the Scanbot SDK. If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate framework or features, please send us an email.

To run the Scanbot SDK plugin functionality within your production app, you have to purchase and use a valid Scanbot SDK license. The SDK will run for one minute in trial mode without a license.

const myLicenseKey = "";
scanbotSDK = await ScanbotSDK.initialize({
    licenseKey: myLicenseKey
});

Leave the license key empty to enter the trial mode of one minute.

To get a free 7-day trial license, please submit the trial license form.

The initializer also serves as the main entry point of the SDK, meaning that the scanbotSDK object returned upon initialize serves as your entry point to use any other SDK features.

Initialization location & timing
React
In your class-based client-side React project, you should initialize the SDK in the componentDidMount lifecycle method of your App.tsx component:

override async componentDidMount(): Promise<void> {
    const sdk = await ScanbotSDK.initialize({ licenseKey: myLicenseKey, enginePath: "see below" });
}


If you're using functional components, make use of the useEffect hook:

useEffect(() => {
    (async () => {
        const sdk = await ScanbotSDK.initialize({ licenseKey: myLicenseKey, enginePath: "see below" });
    })();
}, []);

Engine flavor & location
The SDK needs additional JS and WASM files during runtime. These files will be loaded by the browser when the SDK is initialized.

During initialization, you need to specify the enginePath to point the browser to a location where it can download these files.

Assuming the files are available in the /wasm/ folder, you can initialize the SDK as follows:

scanbotSDK = await ScanbotSDK.initialize({
    // ...
    enginePath: "/wasm/"
});

The SDK WASM files come in three different flavors: complete, barcode-scanner, and document-scanner. Note that the WASM file sizes for the complete flavor are larger than for the other flavors.

You should only use the complete flavor if the features you need are not entirely covered by the barcode-scanner or document-scanner flavors.

The following table shows the features covered by each flavor:

Feature	complete	barcode-scanner	document-scanner
Barcode Scanner	✅	✅	❌
Document Scanner	✅	❌	✅
Image filters	✅	❌	✅
Document Quality Analyzer	✅	❌	✅
PDF generation	✅	❌	✅
TIFF generation	✅	❌	❌
Text Pattern Scanner	✅	❌	❌
MRZ Scanner	✅	❌	❌
Document Data Extractor	✅	❌	❌
VIN Scanner	✅	❌	❌
Check Scanner	✅	❌	❌
You need to make sure that the engine files are accessible by the browser. How to do this depends your project setup.

In the following sections, we provide examples for some common setups.

Option 1: Public folder
You can provide the engine files to the browser by placing them in a public folder that your web server can serve.

If you installed the SDK via npm, you can obtain the engine files from the node_modules folder. Assuming your public folder is public/wasm, you can copy the engine files as follows:

cp -R node_modules/scanbot-web-sdk/bundle/bin/barcode-scanner/* public/wasm/

You can add this command to your npm postinstall scripts to automatically copy the engine files after installing updates to the SDK.

If you are not using npm in your project, you can still use npm as a one-time command to download the binaries:

# Use npm pack to download the SDK package as a tarball
npm pack scanbot-web-sdk

# Extract the tarball to get the engine files
tar -xf scanbot-web-sdk-*.tgz

Option 2: Webpack
For webpack-based projects, you can use the CopyWebpackPlugin (webpack 5 and newer) or the File-Loader Plugin (webpack 4 and older) to copy the necessary files to the public folder.

Please refer to the respective documentation for more information on how to use these plugins.

Option 3: Vite
For Vite-based projects, you can use the vite-plugin-static-copy plugin to automatically copy the necessary files to the public folder.

After installing this plugin, extend your vite.config.js as follows:

export default defineConfig({
   // ...,
  plugins: [
    // ...,
    viteStaticCopy({
      // Make the files necessary for running the Scanbot SDK WebAssembly modules available as static files
      targets: [
        {
          src: 'node_modules/scanbot-web-sdk/bundle/bin/complete/*',
          dest: 'wasm'
        }
      ],
      structured: false
    })
  ],
  // ...
})


License check in production apps
If your Scanbot SDK license has expired, any call to the Scanbot SDK API will terminate your app or result in an error.

To prevent this, you should always check for license expiration during the runtime by calling the method scanbotSDK.getLicenseInfo().

This method returns a LicenseInfo object as a result. You can use the method isValid() to check validity of the license.

const licenseInfo = await scanbotSDK.getLicenseInfo();
const isValid = licenseInfo.isValid();

if (isValid) {
    // You can now safely make calls to Scanbot SDK API
}

If the result of the isValid() method returns false, you should disable any usage of the Scanbot SDK functions or UI components in your app.

class LicenseInfo {
    // String representing the license status, e.g. "OKAY", "TRIAL", "FAILURE_NOT_SET".
    status: LicenseStatus;
    // Human-readable description for the status
    licenseStatusMessage: string;
    // When your license will expire, seconds since epoch
    expirationTimestamp: number;
    // Returns true only if the status equals Okay or Trial.
    // The license status changes to FailureNotSet when the trial period is over.
    isValid(): boolean;
}

Cache busting
When updating to the latest version of the SDK, we want to avoid any issues arising from browsers caching resources. To this end, we use a cache-busting mechanism that appends a request parameter to the requests of any resources loaded by the SDK. E.g., by default, we request the file ScanbotSDK.Asm.wasm as ScanbotSDK.Asm.wasm?VERSION (where the VERSION is the current version of the SDK). This behavior can be configured or disabled using the requestSuffix config option during SDK initialization.

scanbotSDK = await ScanbotSDK.initialize({
    requestSuffix: "?v=1.2.3"
});

The parameter requestSuffix defaults to ?VERSION, where VERSION is the current version of the SDK.

Content-Security-Policy header
If your site uses a Content-Security-Policy (CSP) header, you need to allow the following resources:

script-src needs to allow:
wasm-unsafe-eval
The scripts that are inside the enginePath directory (see above). E.g., if you load the SDK from the same domain as your HTML page, this could be covered by 'self' or your domain name.
worker-src needs to allow:
blob:
data:
The scripts that are inside the enginePath directory (see above), same as for script-src.
Here is an example of a CSP header that allows the Scanbot SDK to work:

Content-Security-Policy: script-src 'self' 'wasm-unsafe-eval'; worker-src 'self' blob: data:;
``

Handling the Web Document Scanner SDK license
License key
To run the Scanbot SDK within your production app, you must purchase and use a valid Scanbot SDK license.

Each license key is valid only for a given app bundle identifier. You will be unable to use any of the SDK features if the license key is corrupted, expired, or invalid in any other way.

Getting a trial license
The Scanbot SDK will run without a license for one minute per session.

To get a free 7-day trial license, please submit the trial license form.

Please note that a trial license may only be used in a development and staging environment.

You are not allowed to publish your app to the App Store, Play Store, or any third-party app store with a trial license.

Purchasing a production license
To get pricing information and purchase a production license for the Scanbot SDK, please request a quote.

License check in production apps
If your Scanbot SDK license has expired, any call to the Scanbot SDK API will terminate your app or result in an error.

To prevent this, you should always check for license expiration during the runtime by calling the method scanbotSDK.getLicenseInfo().

This method returns a LicenseInfo object as a result. You can use the method isValid() to check validity of the license.

const licenseInfo = await scanbotSDK.getLicenseInfo();
const isValid = licenseInfo.isValid();

if (isValid) {
    // You can now safely make calls to Scanbot SDK API
}

If the result of the isValid() method returns false, you should disable any usage of the Scanbot SDK functions or UI components in your app.

class LicenseInfo {
    // String representing the license status, e.g. "OKAY", "TRIAL", "FAILURE_NOT_SET".
    status: LicenseStatus;
    // Human-readable description for the status
    licenseStatusMessage: string;
    // When your license will expire, seconds since epoch
    expirationTimestamp: number;
    // Returns true only if the status equals Okay or Trial.
    // The license status changes to FailureNotSet when the trial period is over.
    isValid(): boolean;
}

Utilities included with the Web Document Scanner SDK
In addition to numerous view and image processing functions, the Scanbot Web SDK also features various utility functions.

Please note that utilities are available after initialization, under the instance returned by initialize. Therefore, if the SDK initialization fails, the utilities are not available either.

isCameraSupported(): Checks whether the browser or device supports camera access. Please note that this functionality is specifically located under utils because the Scanbot SDK cannot guarantee the reliability of this functionality. Browsers and their functions are, by design, not backwards-compatible or future-proof. In niche situations (browsers, devices) it is bound to produce false positives. Other SDK features (importing an image, applying a filter, etc.) are still available even if the camera is not.
flash(): A simple flash animation that you can call in the detection callback to add a bit of flare to your application.
saveImageAsJpeg(data: Uint8Array, name?: string): A function to save a scanned document as a JPEG file. It accepts the document as a Uint8Array data and an optional argument name to be used as a resulting file name. The default value of name is a randomly generated file name with a .jpeg extension.

How to work with the Web Document Scanner's image objects
JavaScript has various forms of image representation, such as ArrayBuffer, Uint8Array and ImageData. Sometimes they are encoded into a certain format like JPEG or PNG, sometimes they contain raw pixel data.

Furthermore, if you fetch your image from an external API or upload it from the user's device, you might end up with a Blob or a File object.

To provide a simple and unified interface to work with, the Scanbot SDK uses special image objects.

Usage
Creating an image object from any of the aforementioned image representations is straightforward. All you have to do is to pass your data to static Image construction functions. Below are some examples of this.

Uploading an image
When you have an image file from the user's device, you can do the following:

Picker
static async pick() {
    const picker = document.createElement("input") as HTMLInputElement;
    document.body.appendChild(picker);
    picker.id = "picker";
    picker.type = "file";
    picker.click();

    picker.onchange = (e) => {
        e.preventDefault();
        const reader = new FileReader();

        const files = picker.files!;
        reader.readAsArrayBuffer(files[0]);

        reader.onload = async () => {
            const buffer = reader.result as ArrayBuffer;
            const image = ScanbotSDK.Config.Image.fromEncodedBinaryData(buffer);
            console.log("Picked image:", image);
        }
    }
}

See full example on GitHub
Downloading an image
If the image is on the server, you can fetch it and create an image object as follows:

Fetch
static async fetch() {
    const image = await ScanbotSDK.Config.Image.fromUrl("/favicon.ico");
    console.log("Fetched image:", image);
}

See full example on GitHub
Extracting from a canvas
If you're working with a Canvas element, you can extract the image data and create an image object like this:

Canvas
static async draw() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const data = context!.getImageData(0, 0, canvas.width, canvas.height);
    const image = ScanbotSDK.Config.Image.fromImageData(data)
    console.log("Created image from ImageData:", image);
}

Advanced features included in the Web Document Scanner SDK
Threading
For multi-threading support, please use the config parameter allowThreads: true on SDK initialization:

this.scanbotSDK = await ScanbotSDK.initialize({
  licenseKey: myLicenseKey,
  allowThreads: true,
});

For this feature to function properly, the following HTTP response headers also need to be set up on your server:

Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Access-Control-Allow-Origin: *
Cross-Origin-Resource-Policy: cross-origin

To test if multi-threading is working correctly, set the initialization options allowThreads = true and verboseLogging = true.

Now, if anything is preventing multi-threading, an error message will be logged to the console.

For more information, please refer to Setting up cross-origin isolation in the tfjs repository.

ImageCapture API
The ImageCapture interface of the MediaStream Image Capture API provides methods to enable the capture of images or photos from a camera or other photographic device. It provides an interface for capturing images from a photographic device referenced through a valid MediaStreamTrack (see also the mdn entry).

The Scanbot SDK now supports capturing full-resolution document images, resulting in a substantially more crisp image quality. Specifically, this attempts to take a single exposure using the video capture device.

To enable it, simply set the useImageCaptureAPI property of the DocumentScannerConfiguration to true:

const config: DocumentScannerConfiguration = {
    useImageCaptureAPI: true
}

Warning
Please note that, at the time of writing this, the underlying browser API itself is still experimental and reliably only works on Android devices with Google Chrome. If enabled, this only affects extraction after the document outline has been identified.

This may also trigger your device's default "snap" animation, making scanbotSDK.utils.flash() irrelevant.

Debugging on a mobile device
Debugging the Scanbot Web SDK on an actual mobile device is inconvenient because modern browsers do not allow camera access over the insecure HTTP protocol. HTTPS is required.

And that, in turn, is inconvenient because making your localhost connection secure is possible, but not trivial, and, even if correctly set up, an ERR_CERT_AUTHORITY_INVALID error will still be shown in the window.

The most straightforward solution is to host your website on a server with a valid SSL certificate. But there are alternative approaches.

ngrok
ngrok is a tool that allows you to expose your local server via tunneling to a domain they provide.

This is easier to set up than AWS S3 and allows for more customization.

Simply create an account on the ngrok website, set up a domain, and download the binary.

You'll be able to configure it with the following command:

./ngrok config add-authtoken <your-token>

Then, in another terminal window, go to your build folder and start your localhost with your favorite tool:

php -S localhost:8000

or

python -m http.server

Then, simply run the following command while making sure the port numbers match:

./ngrok http 8000

You should see the following tunnel activated:


Session Status                online
Account                       <redacted> (Plan: Free)
Version                       3.3.2
Region                        Europe (eu)
Latency                       77ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://fe45-91-129-103-222.ngrok-free.app -> http://localhost:8000

And that's it! Your localhost is now available at the example URL provided in the output.

However, this will provide you with a different UUID (subdomain) every time you start the tunnel and the Scanbot SDK license cannot contain an endless amount of randomly generated subdomains.

To solve this, we recommend using a static domain, as explained in Static domains for all ngrok users on the ngrok blog.

This allows you to reserve a randomly generated subdomain that will stay on your account, and add it to your license.

For more information, please refer to the ngrok documentation.

S3
If your site routing does not require a server environment, turning an S3 bucket into a static HTML-serving site will work well.

This paragraph assumes you have the AWS CLI installed and configured.

The legacy option is to simply create a debug domain in your server environment and upload it there.

This is also what we have been doing here at Scanbot SDK.

The simplest option is to serve your website from an S3 bucket at AWS.

That way, you get a convenient HTTPS domain and a handy way to actually upload to it.

Here's an AWS CLI command to create a bucket:


NAME="<your-bucket-name>";

# Create bucket
aws s3api create-bucket \
 	--bucket ${NAME} \
 	--region eu-west-1  \
 	--create-bucket-configuration LocationConstraint=eu-west-1

# Ease blocking, this is required for newly-created buckets (as of July 2023)
aws s3api put-public-access-block \
    --bucket ${NAME} \
    --public-access-block-configuration BlockPublicPolicy=false

# Set the policy to allow public access
aws s3api put-bucket-policy \
 	--bucket "${NAME}" \
 	--policy file://bucket-policy.json

Here's an example of a bucket-policy.json:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<your-bucket-name>/*"
        }
    ]
}

To sync your local build files to that bucket, simply use the following command:

aws s3 sync ./build s3://${NAME} --delete

However, if your site requires custom routing rules, serving it as static HTML from a bucket won't work.

Handling errors with the Web Document Scanner SDK
Opening a scanning screen might fail for various reasons, e.g., an unsupported browser, permissions were denied, the camera does not exist etc.

The Scanbot SDK attempts to handle these cases as best as possible, however, as hardware access API in the browser is not backwards compatible or future-proof, this is an ongoing challenge. To prevent false positives, we keep error handling to a minimum.

If the user has denied camera permission, the Promise for creating a scanner (createDocumentScanner, createBarcodeScanner, createMrzScanner, etc.), will be rejected with MediaPermissionError.

If it is an unsupported browser (specifically, mediaDevices are not available), the Promise will be rejected with UnsupportedMediaDevicesError.

If the matching media is not available, the Promise will be rejected with MediaNotAvailableError.

The Promise will be rejected with LicenseError when a client calls any of the Scanbot SDK functions while having a license error.

If the encountered error is not one of the errors above and not specified in scanner specific documentation pages, it will be rejected with UnknownError.

Promise rejections means you should try and catch when starting the scanners. If a scanner throws an error while starting (e.g., due to a missing camera permission), the error can be caught as follows:

try {
    documentScanner = await scanbotSDK.createDocumentScanner(config);
} catch (error) {
    // Handle cases where scanner could not be opened
    console.log(error.name) // Console log may be  UnsupportedMediaDevicesError, MediaPermissionError, ...
}

If a scanner throws an error after being successfully started, it can be caught via an onError callback in the configuration:

const config = {
    containerId: containerId,
    onError: (error) => {
        // Action taken
    },
    ...
};

There is no internal and continuous check for invalid or expired license. You should always check the license this yourself via await scanbotSDK.getLicenseInfo().

Classic UI scanning modes
Example app
The following use cases have been compiled into a dedicated example app. Too see the complete source code of the code snippets provided here, check out the example app on GitHub.

Scanning a single barcode
The Scanbot Barcode Scanner SDK is quick and easy to integrate by design. Even in its default configuration, the Scanbot SDK scans barcodes rapidly and reliably in challenging conditions. Notably, all scanning operations are performed offline on the device itself, which ensures high speed and maximum data privacy.

Scanning a single barcode with the Web Barcode Scanner

barcode-usecases/src/utils/singleBarcodeScan.ts
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { scannerService } from "../services/scannerService";
import { UpdateResultsType } from "./types";

const singleBarcodeScan = (updateResults: UpdateResultsType) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    scannerService.pause();
    updateResults(result);
  },
  onError: (e: Error) => {
    console.log(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
  style: {
    window: {
      widthProportion: 0.5,
      top: "40%",
    },
  },
});

export default singleBarcodeScan;

See full example on GitHub
Still, there are specific use cases where tweaking the configuration can significantly improve the user experience and scanning performance, such as scanning multiple barcodes at once or scanning tiny or distant barcodes.

Scanning multiple barcodes
If you need to scan multiple barcodes simultaneously, you can configure the SDK to detect and extract all barcodes visible in the live view. This functionality can be complemented with an AR Overlay for visually highlighting the barcodes in view.

Scanning a multiple barcodes with the Web Barcode Scanner

barcode-usecases/src/utils/multipleBarcodeScan.ts
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { UpdateResultsType } from "./types";

const multipleBarcodeScan = (updateResults: UpdateResultsType) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  showFinder: false,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result);
  },
  onError: (error: Error) => {
    console.error(error);
  },
});

export default multipleBarcodeScan;

See full example on GitHub
Batch scanning
Batch scanning, like multi-barcode scanning, allows users to scan multiple unique barcodes within a single session. A viewfinder added to the live view helps users target only the desired codes, improving their scan experience and control.

Batch scanning with the Web Barcode Scanner

barcode-usecases/src/utils/batchBarcodeScan.ts
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { UpdateResultsType } from "./types";

const batchBarcodeScan = (updateResults: UpdateResultsType) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result);
  },
  onError: (e: Error) => {
    console.error(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
  style: {
    window: {
      widthProportion: 0.5,
      top: "40%",
    },
  },
});

export default batchBarcodeScan;

See full example on GitHub
Scan & Count
The Barcode Scanner also features a user interface for detecting barcodes from a single snapshot and display the result in a unique manner.

This feature uses the greatest resolution available and offers the most precise scan possible.

To activate it, simply enable the property in the configuration as follows:

scanAndCount: {
    enabled: true,
    style: {
        // Add custom styling to the RTU component
    }
}

Detecting barcodes on still images
The Scanbot Barcode Scanner SDK offers advanced capabilities for reading barcodes from static images, such as photos or PDFs, imported from the gallery or the device's storage.

barcode-usecases/src/utils/detectBarcodeFromImageScan.ts
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { scannerService } from "../services/scannerService";

export default async function detectBarcodeFromImageScan() {
  const licenseInfo = await scannerService.getLicenseInfo();
  const scanbotSDK = scannerService.getScanbotSDK();

  if (scanbotSDK && licenseInfo.isValid()) {
    const fileInput: HTMLInputElement = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "file-input";
    fileInput.accept = "image/png, image/jpeg";
    fileInput.style.display = "none";

    try {
      if (fileInput) {
        fileInput.click();

        fileInput.onchange = async (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLInputElement;

          const reader = new FileReader();
          const file = target.files?.[0];

          if (file) {
            reader.readAsDataURL(file);

            reader.onload = async () => {
              try {
                const result: BarcodeResult = await scanbotSDK.detectBarcodes(
                  reader.result as string
                );

                if (result.barcodes.length === 0) {
                  console.log("No barcodes were detected in your image.");
                  alert("No barcodes were detected in your image.");
                } else {
                  alert(
                    `${result.barcodes.length} barcodes were detected in your image.`
                  );
                  console.log(
                    `${result.barcodes.length} barcodes were detected in your image.`
                  );
                }
              } catch (error) {
                console.log("Error while detecting barcodes: " + error);
              }
            };
          }
        };
        fileInput.remove();
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    alert(
      "License not valid. Your license is corrupted or expired, Scanbot features are disabled. Please restart the app in order to receive one minute valid license."
    );
  }
}

See full example on GitHub
AR Overlay scanning modes
Displaying an extra layer of feedback for the user in the live view is useful for a range of scanning use cases. With the Barcode Scanner SDK's AR Overlay, you can highlight barcodes to provide feedback on scanned barcodes or locate specific items.

Please refer to the AR Overlay section to learn more.

