import { CreateNextContextOptions as NextCtxOptions } from "@trpc/server/adapters/next";
import * as trpc from "@trpc/server";

interface CreateContextOptions {}

export const createContextInner = async (e: CreateContextOptions) => {
  return {};
};

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export const createContext = async (e: NextCtxOptions): Promise<Context> => {
  return await createContextInner({});
};
