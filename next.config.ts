/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'resources.cryptocompare.com',
      'images.cryptocompare.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'resources.cryptocompare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.cryptocompare.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
