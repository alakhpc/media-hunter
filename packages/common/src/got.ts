import { got } from "got";

export const tmdbClient = got.extend({
  prefixUrl: "https://api.themoviedb.org/3",
  searchParams: { api_key: process.env.TMDB_API_KEY! },
});
