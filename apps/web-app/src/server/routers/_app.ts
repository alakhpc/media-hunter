import { createRouter } from "../createRouter";
import { genresRouter } from "./genres";
import { searchRouter } from "./search";
import { watchlistRouter } from "./watchlist";

export const appRouter = createRouter()
  .merge("search.", searchRouter)
  .merge("watchlist.", watchlistRouter)
  .merge("genres.", genresRouter);
