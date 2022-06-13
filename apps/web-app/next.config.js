/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { externalDir: true },
  reactStrictMode: true,
  images: { domains: ["lh3.googleusercontent.com"] },
  redirects: async () => [
    {
      source: "/github",
      destination: "https://github.com/alakhpc/media-app",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
