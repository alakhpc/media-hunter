import {
  formatMovieForPoster,
  formatTVForPoster,
} from "@/lib/formatMediaForPoster";
import { getMoviesByGenre, getTVSByGenre } from "@media-app/common/src/tmdb";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const genresRouter = createRouter()
  .query("movie", {
    input: z.object({
      genreId: z.number().positive(),
      cursor: z.number().positive().nullish(),
    }),

    async resolve({ input: { genreId, cursor } }) {
      let res = await getMoviesByGenre(genreId, cursor ?? 1);

      let media = res.results.map(formatMovieForPoster);
      let nextPage = res.page !== res.total_pages ? res.page + 1 : null;

      return {
        nextPage,
        media,
      };
    },
  })
  .query("tv", {
    input: z.object({
      genreId: z.number().int().positive(),
      cursor: z.number().int().positive().nullish(),
    }),

    async resolve({ input: { genreId, cursor } }) {
      let res = await getTVSByGenre(genreId, cursor ?? 1);

      let media = res.results.map(formatTVForPoster);
      let nextPage = res.page !== res.total_pages ? res.page + 1 : null;

      return {
        nextPage,
        media,
      };
    },
  });
