import { MediaPosterProps } from "@/components/MediaPoster";
import { Movie, TV } from "@media-app/interfaces";

export const getImageUrl = (poster_path: string | null) => {
  return poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : null;
};

export const formatMovieForPoster = ({
  title,
  id,
  poster_path,
  release_date,
  vote_average,
}: Movie): MediaPosterProps => {
  return {
    type: "movie",
    id,
    title,
    poster: getImageUrl(poster_path),
    year: release_date?.slice(0, 4) ?? null,
    rating: vote_average,
  };
};

export const formatTVForPoster = ({
  name,
  id,
  poster_path,
  first_air_date,
  vote_average,
}: TV): MediaPosterProps => {
  return {
    type: "tv",
    id,
    title: name,
    poster: poster_path ? getImageUrl(poster_path) : null,
    year: first_air_date?.slice(0, 4) ?? null,
    rating: vote_average,
  };
};
