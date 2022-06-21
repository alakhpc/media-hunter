import * as trpc from "@trpc/server";
import { CreateNextContextOptions as NextCtxOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";

export const createContextInner = async ({ req }: NextCtxOptions) => {
  let session = await getSession({ req });

  return {
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export const createContext = async (e: NextCtxOptions): Promise<Context> => {
  return await createContextInner(e);
};
