import {
  formatMovieForPoster,
  formatTVForPoster,
} from "@/lib/formatMediaForPoster";
import { tmdb } from "@media-app/common";
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
      let watchlistItems = await prisma.watchlist.findMany({
        select: { tmdbId: true, isTV: true },
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      let watchlistData = watchlistItems.map(async ({ tmdbId, isTV }) =>
        isTV
          ? formatTVForPoster(await tmdb.getTV(tmdbId))
          : formatMovieForPoster(await tmdb.getMovie(tmdbId))
      );

      return Promise.all(watchlistData);
    },
  })
  .query("user.check", {
    input: z.object({ tmdbId: z.number().int().positive(), isTV: z.boolean() }),
    async resolve({
      ctx: {
        session: {
          user: { id: userId },
        },
      },
      input: { tmdbId, isTV },
    }) {
      return !!(await prisma.watchlist.findUnique({
        where: { userId_tmdbId_isTV: { userId, tmdbId, isTV } },
      }));
    },
  })

  .mutation("user.add", {
    input: z.object({
      tmdbId: z.number().int().positive(),
      isTV: z.boolean(),
    }),

    async resolve({
      ctx: {
        session: {
          user: { id: userId },
        },
      },
      input: { tmdbId, isTV },
    }) {
      return await prisma.watchlist.create({
        data: { userId, tmdbId, isTV },
      });
    },
  })
  .mutation("user.remove", {
    input: z.object({
      tmdbId: z.number().int().positive(),
      isTV: z.boolean(),
    }),

    async resolve({
      ctx: {
        session: {
          user: { id: userId },
        },
      },
      input: { tmdbId, isTV },
    }) {
      await prisma.watchlist.delete({
        where: { userId_tmdbId_isTV: { userId, tmdbId, isTV } },
      });
      return null;
    },
  });
