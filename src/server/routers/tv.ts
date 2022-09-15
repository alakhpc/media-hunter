import { formatEpisodeForPage } from "@/lib/formatEpisodeForPage";
import { getTVSeason } from "@/lib/tmdb";
import { z } from "zod";
import { createRouter } from "../createRouter";

export const tvRouter = createRouter().query("season.episodes", {
  input: z.object({
    tmdbId: z.number().int().positive(),
    season: z.number().int().positive(),
  }),

  async resolve({ input: { tmdbId, season } }) {
    const results = await getTVSeason(tmdbId, season);
    return results.episodes.map(formatEpisodeForPage);
  },
});
