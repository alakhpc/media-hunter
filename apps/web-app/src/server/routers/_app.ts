import { createRouter } from "../createRouter";
import { searchRouter } from "./search";

export const appRouter = createRouter().merge(searchRouter);
