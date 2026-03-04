

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nfm-api.byethost32.com",
        pathname: "/drupal/web/sites/default/files/**",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8085',
        pathname: '/sites/default/files/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig

