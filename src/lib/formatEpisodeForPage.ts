import { TVSeason } from "@/types/tmdb";
import { getImageUrl } from "./formatMediaForPoster";

export const formatEpisodeForPage = (episode: TVSeason["episodes"][number]) => {
  let {
    id,
    name: title,
    overview,
    air_date,
    episode_number,
    vote_average: rating,
    still_path,
  } = episode;

  return {
    id,
    title,
    overview,
    air_date,
    episode_number,
    rating: rating?.toFixed(1),
    image: still_path ? getImageUrl(still_path) : null,
  };
};
