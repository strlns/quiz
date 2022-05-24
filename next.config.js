/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    if (process.env.IS_NETCUP_PHUSION_JAIL) {
      config.infrastructureLogging = { debug: /PackFileCache/ };
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
};

module.exports = nextConfig;
