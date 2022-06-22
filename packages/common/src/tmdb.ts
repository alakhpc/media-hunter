import type {
  Credits,
  Genre,
  Images,
  Movie,
  MovieDetails,
  MovieWithMediaType,
  PersonWithMediaType,
  Recommendations,
  TMDBListWrapper,
  TV,
  TVDetails,
  TVWithMediaType,
  Videos,
} from "@media-app/interfaces";
import { tmdbClient } from "./got";

const languages = ["en", "en-US", null].join(",");

const tmdbFetcher = async <T>(
  url: string,
  searchParams?: Record<string, string | number | boolean | null | undefined>
): Promise<T> => {
  return await tmdbClient
    .get(url, searchParams ? { searchParams } : {})
    .json<T>();
};

export const getPopularMovies = async () => {
  return (await tmdbFetcher<TMDBListWrapper<Movie>>(`movie/popular`)).results;
};

export const getPopularTV = async () => {
  return (await tmdbFetcher<TMDBListWrapper<TV>>(`tv/popular`)).results;
};

export const getMovie = async (id: string | number) => {
  return await tmdbFetcher<MovieDetails>(`movie/${id}`);
};

export const getTV = async (id: string | number) => {
  return await tmdbFetcher<TVDetails>(`tv/${id}`);
};

export const getMultiSearch = async (query: string) => {
  type ResultT = MovieWithMediaType | TVWithMediaType | PersonWithMediaType;
  return (
    await tmdbFetcher<TMDBListWrapper<ResultT>>("search/multi", { query })
  ).results;
};

export const getMovieTVSearch = async (query: string) => {
  return (await getMultiSearch(query)).filter(
    (m): m is MovieWithMediaType | TVWithMediaType =>
      m.media_type === "movie" || m.media_type === "tv"
  );
};

export const getMoviesByGenre = async (
  genreId: string | number,
  page: number | null
) => {
  return await tmdbFetcher<TMDBListWrapper<Movie>>("discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
};

export const getTVSByGenre = async (
  genreId: string | number,
  page: number | null
) => {
  return await tmdbFetcher<TMDBListWrapper<TV>>("discover/tv", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
};

export const getMoviePageDetails = async (id: number) => {
  let movieData = await tmdbFetcher<
    MovieDetails & Images & Videos & Credits & Recommendations<Movie>
  >(`movie/${id}`, {
    append_to_response: "images,videos,credits,recommendations",
    include_image_language: languages,
    include_video_language: languages,
  }).catch((_) => null);

  return movieData;
};

export const getTVPageDetails = async (id: number) => {
  let tvData = await tmdbFetcher<
    TVDetails & Images & Videos & Credits & Recommendations<TV>
  >(`tv/${id}`, {
    append_to_response: "images,videos,credits,recommendations",
    include_image_language: languages,
    include_video_language: languages,
  }).catch((_) => null);

  return tvData;
};

export const getMovieGenres = async () => {
  return (await tmdbFetcher<{ genres: Genre[] }>(`genre/movie/list`)).genres;
};

export const getTVGenres = async () => {
  return (await tmdbFetcher<{ genres: Genre[] }>(`genre/tv/list`)).genres;
};
