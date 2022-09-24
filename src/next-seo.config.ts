import type { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  titleTemplate: `%s | Media Hunter`,
  defaultTitle: "Media Hunter",
  description: "Keep track of your media across services 🚀",
  openGraph: {
    site_name: "Media Hunter",
    images: [],
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "application-name",
      content: "Media Hunter",
    },
  ],
  additionalLinkTags: [
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
};
