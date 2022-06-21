import { prisma } from "@media-app/db";
import { z } from "zod";
import { createProtectedRouter } from "../createRouter";

export const watchlistRouter = createProtectedRouter()
  .query("user", {
    async resolve({
      ctx: {
        session: {
          user: { id: userId },
        },
      },
    }) {
      prisma.watchlist.findMany({
        select: { tmdbId: true, isTV: true },
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    },
  })
  .query("user.check", {
    input: z.object({ tmdbId: z.number().positive(), isTV: z.boolean() }),
    async resolve({
      ctx: {
        session: {
          user: { id: userId },
        },
      },
      input: { tmdbId, isTV },
    }) {
      !!(await prisma.watchlist.findUnique({
        where: { userId_tmdbId_isTV: { userId, tmdbId, isTV } },
      }));
    },
  })
  .mutation("user.update", {
    input: z.object({
      tmdbId: z.number().positive(),
      isTV: z.boolean(),
      operation: z.enum(["add", "remove"]),
    }),

    async resolve({
      ctx: {
        session: {
          user: { id: userId },
        },
      },
      input: { tmdbId, isTV, operation },
    }) {
      switch (operation) {
        case "add":
          return await prisma.watchlist.create({
            data: { userId, tmdbId, isTV },
          });
        case "remove":
          return await prisma.watchlist.delete({
            where: { userId_tmdbId_isTV: { userId, tmdbId, isTV } },
          });
      }
    },
  });
