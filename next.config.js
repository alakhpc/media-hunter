/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { externalDir: true },
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "image.tmdb.org",
      "http.cat",
      "www.themoviedb.org",
    ],
  },
  redirects: async () => [
    {
      source: "/github",
      destination: "https://github.com/alakhpc/media-hunter",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
