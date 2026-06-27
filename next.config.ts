import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      // Production domain
      {
        protocol: 'https',
        hostname: 'fusion3dlabs.com',
        pathname: '/**',
      },
      // MongoDB Atlas / Cloudinary / any CDN for admin-uploaded images
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber'],
  },
}

export default nextConfig
