import { MediaPosterProps } from "@/components/MediaPoster";
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
      let media = (await getMoviesByGenre(genreId)).map(formatMovieForPoster);

      return {
        nextPage: cursor ?? 1 + 1,
        media,
      };
    },
  })
  .query("tv", {
    input: z.object({
      genreId: z.number().positive(),
      cursor: z.number().positive().nullish(),
    }),

    async resolve({ input: { genreId, cursor } }) {
      let media = (await getTVSByGenre(genreId)).map(formatTVForPoster);

      return {
        nextPage: cursor ?? 1 + 1,
        media,
      };
    },
  });
