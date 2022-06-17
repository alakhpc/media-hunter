import { MediaPageProps } from "@/components/MediaPage";
import {
  Credits,
  Images,
  Movie,
  MovieDetails,
  Recommendations,
  Videos,
} from "@media-app/interfaces";
import { formatMovieForPoster, getImageUrl } from "./formatMediaForPoster";

export const formatMovieForPage = (
  m: MovieDetails & Images & Videos & Credits & Recommendations<Movie>
): MediaPageProps => {
  let runtimeValue = m.runtime ?? 0;

  const ytKey =
    m.videos.results.filter(
      (video) =>
        video.site === "YouTube" && video.official && video.type === "Trailer"
    )[0]?.key ?? null;

  const media_type = "movie";
  const status = m.status;
  const title = m.title;
  const overview = m.overview;
  const poster = getImageUrl(m.poster_path);
  const backdrop = getImageUrl(m.backdrop_path);
  const logo = getImageUrl(m.images.logos[0]?.file_path ?? null);
  const trailerKey = ytKey;
  const genres = m.genres.slice(0, 4);
  const rating = m.vote_average.toFixed(1);
  const runtime = `${Math.floor(runtimeValue / 60)}h ${runtimeValue % 60}m`;
  const year = m.release_date?.slice(0, 4) ?? null;
  const cast = m.credits.cast.slice(0, 10).map((p) => ({
    id: p.id,
    name: p.name,
    character: p.character,
    image: getImageUrl(p.profile_path),
  }));
  const recommendations = m.recommendations.results.map(formatMovieForPoster);

  return {
    media_type,
    status,
    title,
    overview,
    poster,
    backdrop,
    logo,
    trailerKey,
    genres,
    rating,
    runtime,
    year,
    cast,
    recommendations,
  };
};
