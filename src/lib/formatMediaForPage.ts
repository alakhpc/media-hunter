import { MediaPageProps } from "@/components/MediaPage";
import {
  Credits,
  Images,
  Movie,
  MovieDetails,
  Recommendations,
  TV,
  TVDetails,
  TVExternalIds,
  Videos,
} from "@/types/tmdb";
import {
  formatMovieForPoster,
  formatTVForPoster,
  getImageUrl,
} from "./formatMediaForPoster";

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
  const id = m.id;
  const status = m.status;
  const title = m.title;
  const overview = m.overview;
  const poster = getImageUrl(m.images.posters[1]?.file_path ?? m.poster_path);
  const backdrop = getImageUrl(m.backdrop_path);
  const logo = getImageUrl(m.images.logos[0]?.file_path ?? null);
  const trailerKey = ytKey;
  const genres = m.genres.slice(0, 4);
  const rating = m.vote_average.toFixed(1);
  const runtime = `${Math.floor(runtimeValue / 60)}h ${runtimeValue % 60}m`;
  const year = m.release_date?.slice(0, 4) ?? null;
  const cast = m.credits.cast.slice(0, 20).map((p) => ({
    id: p.id,
    name: p.name,
    character: p.character,
    image: getImageUrl(p.profile_path),
  }));
  const recommendations = m.recommendations.results.map(formatMovieForPoster);

  return {
    media_type,
    id,
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

export const formatTVForPage = (
  tv: TVDetails & Images & Videos & Credits & Recommendations<TV>
): MediaPageProps => {
  let runtimeValue = tv.episode_run_time[0] ?? 0;
  const ytKey =
    tv.videos.results.filter(
      (video) =>
        video.site === "YouTube" && video.official && video.type === "Trailer"
    )[0]?.key ?? null;

  const media_type = "tv";
  const id = tv.id;
  const status = tv.status;
  const title = tv.name;
  const overview = tv.overview;
  const poster = getImageUrl(tv.images.posters[1]?.file_path ?? tv.poster_path);
  const backdrop = getImageUrl(tv.backdrop_path);
  const logo = getImageUrl(tv.images.logos[0]?.file_path ?? null);
  const trailerKey = ytKey;
  const genres = tv.genres.slice(0, 4);
  const rating = tv.vote_average.toFixed(1);
  const runtime = `${runtimeValue % 60}m`;
  const year = tv.first_air_date?.slice(0, 4) ?? null;
  const cast = tv.credits.cast.slice(0, 20).map((p) => ({
    id: p.id,
    name: p.name,
    character: p.character,
    image: getImageUrl(p.profile_path),
  }));
  const recommendations = tv.recommendations.results.map(formatTVForPoster);
  const seasons = tv.seasons
    .filter((s) => s.season_number !== 0)
    .map((s) => s.season_number);

  return {
    media_type,
    id,
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
