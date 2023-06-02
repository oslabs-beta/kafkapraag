/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  esModule: true,
  experimental: {
    esmExternals: 'loose'
  }
}

module.exports = nextConfig
