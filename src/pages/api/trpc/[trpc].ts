import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
