/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/github",
      destination: "https://github.com/alakhpc/media-app",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
