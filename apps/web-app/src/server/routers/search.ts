import {
  formatMovieForPoster,
  formatTVForPoster,
} from "@/lib/formatMediaForPoster";
import { getMovieTVSearch } from "@media-app/common/src/tmdb";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const searchRouter = createRouter().query("multi", {
  input: z.object({
    query: z.string().trim().min(1),
    cursor: z.number().int().positive().nullish(),
  }),

  async resolve({ input: { query, cursor } }) {
    const res = await getMovieTVSearch(query, cursor ?? 1);

    let media = res.results.map((r) =>
      r.media_type === "movie" ? formatMovieForPoster(r) : formatTVForPoster(r)
    );
    let nextPage = cursor ? cursor + 1 : 2;

    return {
      nextPage,
      media,
    };
  },
});
