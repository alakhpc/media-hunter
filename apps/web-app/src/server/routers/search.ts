import { MediaPosterProps } from "@/components/MediaPoster";
import {
  formatMovieForPoster,
  formatTVForPoster,
} from "@/lib/formatMediaForPoster";
import { getMovieTVSearch } from "@media-app/common/src/tmdb";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const searchRouter = createRouter().query("search", {
  input: z.string().trim().min(1),

  async resolve({ input: query }): Promise<MediaPosterProps[]> {
    const results = await getMovieTVSearch(query);
    return results.map((r) =>
      r.media_type === "movie" ? formatMovieForPoster(r) : formatTVForPoster(r)
    );
  },
});
