import Layout from "@/components/Layout";
import { withTRPC } from "@trpc/next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { SEO } from "next-seo.config";
import type { AppType } from "next/app";
import "tailwindcss/tailwind.css";
import { AppRouter } from "./api/trpc/[trpc]";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    return { url: `/api/trpc` };
  },
})(MyApp);
