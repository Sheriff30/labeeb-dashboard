/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["s3.eu-north-1.amazonaws.com"],
    // or use remotePatterns for more control:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/labeb.sa/**",
      },
    ],
  },
};

module.exports = nextConfig;
