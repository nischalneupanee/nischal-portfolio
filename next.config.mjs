/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds for now
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hashnode.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
      },
    ],
  },
};

export default nextConfig;
