/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
