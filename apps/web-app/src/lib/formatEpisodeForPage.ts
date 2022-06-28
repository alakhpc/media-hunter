import { TVSeason } from "@media-app/interfaces";
import { getImageUrl } from "./formatMediaForPoster";

export const formatEpisodeForPage = (episode: TVSeason["episodes"][number]) => {
  let { name, overview, air_date, vote_average: rating, still_path } = episode;

  return {
    name,
    overview,
    air_date,
    rating: rating.toFixed(1),
    image: still_path ? getImageUrl(still_path) : null,
  };
};
