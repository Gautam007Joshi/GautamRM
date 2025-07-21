// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    // Removes React props like `data-testid` in production (for smaller bundle)
    reactRemoveProperties: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
