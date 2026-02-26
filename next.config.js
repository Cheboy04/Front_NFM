

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8085',
        pathname: '/sites/default/files/**',
      },
    ],
  },
}

module.exports = nextConfig

