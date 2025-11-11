// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove all webpack() and experiments.asyncWebAssembly
  // Turbopack doesn't support them

  // Optional: Silence warning by explicitly using Webpack
  // (Add this line to avoid confusion)
  // turbopack: false, // Not needed — just don't use webpack()

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
};

module.exports = nextConfig;