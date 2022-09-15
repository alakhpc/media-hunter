import * as trpc from "@trpc/server";
import { Context } from "./context";

export const createRouter = () => {
  return trpc.router<Context>();
};

export const createProtectedRouter = () => {
  return createRouter().middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({ ctx: { ...ctx, session: ctx.session } });
  });
};
