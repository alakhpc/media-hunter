import * as trpc from "@trpc/server";
import { CreateNextContextOptions as NextCtxOptions } from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const createContext = async (ctx: NextCtxOptions) => {
  let session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

  return {
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
