/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'superbaokuan.com'],
  },
};
module.exports = nextConfig;