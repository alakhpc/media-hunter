import Layout from "@/components/Layout";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { AppRouter } from "./api/trpc/[trpc]";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config() {
    return { url: `/api/trpc` };
  },
})(MyApp);
