import CastSlider from "@/components/CastSlider";
import GenreButton from "@/components/GenreButton";
import RecommendationsSlider from "@/components/RecommendationsSlider";
import Trailer from "@/components/Trailer";
import { tmdbClient } from "@media-app/common";
import {
  Credits,
  Images,
  Movie,
  MovieDetails,
  Recommendations,
  TMDBListWrapper,
  Videos,
} from "@media-app/interfaces";
import { InferNextProps } from "infer-next-props-type";
import { formatMovieForPoster, getImageUrl } from "lib/formatMediaForPoster";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Image from "next/image";
import { useState } from "react";
import { BsBookmarkPlusFill, BsFillPlayFill } from "react-icons/bs";
import { HiStar } from "react-icons/hi";

const MoviePage = ({
  media_type,
  title,
  overview,
  backdrop,
  logo,
  poster,
  genres,
  rating,
  runtime,
  releaseDate,
  status,
  trailerKey,
  cast,
  recommendations,
}: InferNextProps<typeof getStaticProps>) => {
  const [trailerShown, setTrailerShown] = useState(false);

  return (
    <>
      {trailerShown && (
        <Trailer ytKey={trailerKey} onClose={() => setTrailerShown(false)} />
      )}

      <div className="relative inset-0 -z-10 -mt-16 h-[35%] md:-mt-20 md:h-2/3">
        {/* Could not pick between curved top vs gradient top so left both in for now */}
        {/* Curved top */}
        <div className="absolute bottom-0 z-10 h-8 w-full rounded-t-full bg-theme" />
        {/* Gradient top */}
        {/* <div className="absolute bottom-0 z-10 h-1/3 w-full bg-gradient-to-t from-theme to-transparent" /> */}

        <Image
          src={backdrop || "https://http.cat/404"}
          priority={true}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="opacity-90"
          alt={`${title} backdrop`}
        />

        {!!logo && (
          <div className="absolute inset-[50%] h-full max-h-[60%] w-full max-w-[85%] translate-x-[-50%] translate-y-[-60%] md:max-w-2xl md:translate-y-[-60%]">
            <Image
              src={logo}
              layout="fill"
              objectFit="contain"
              alt={`${title} logo`}
            />
          </div>
        )}
      </div>

      <div className="mx-3 flex flex-col space-y-8 md:ml-8">
        <div className="grid gap-8 md:grid-cols-[min-content,auto]">
          <div className="mx-auto -mt-36 w-56 rounded-3xl md:-mt-40 md:w-64">
            <div className="group relative">
              <Image
                src={poster || "https://http.cat/404"}
                layout="responsive"
                width={1}
                height={1.5}
                alt={`${title} poster`}
                className="rounded-3xl"
              />
              <div
                className="absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-black/60 opacity-0 transition duration-200 group-hover:opacity-100"
                onClick={() => setTrailerShown(true)}
              >
                <div className="flex flex-col items-center justify-center">
                  <BsFillPlayFill className="h-10 w-10" />
                  <div className="text-xl">Trailer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-2 mt-4 flex flex-col items-center justify-end gap-3 md:items-start">
            <div className="mb-1 text-center text-4xl font-semibold">
              {title}
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              {genres.map((genre) => (
                <GenreButton
                  key={genre.id}
                  genre={genre}
                  media_type={media_type}
                  selected={false}
                />
              ))}
            </div>

            <div className="flex flex-row gap-2 text-sm text-graytext">
              <div className="flex flex-row gap-1">
                <div>{rating.toFixed(1)}</div>
                <HiStar className="h-5 w-5" />
              </div>
              |<div>{runtime}</div>|
              <div>{releaseDate?.slice(0, 4) ?? "Unknown year"}</div>|
              <div>{status}</div>
            </div>

            <div className="flex flex-row gap-1.5">
              <button
                className="flex flex-row items-center gap-1 rounded-md bg-lightgray py-2 px-4 transition duration-200 hover:bg-white hover:text-black"
                onClick={() => {
                  setTrailerShown(true);
                }}
              >
                <BsFillPlayFill className="h-5 w-5" />
                <div className="text-sm">Trailer</div>
              </button>

              <button
                className="flex flex-row items-center gap-1 rounded-md bg-blue-500 py-2 px-4 transition active:bg-blue-600"
                onClick={() => {}}
              >
                <BsBookmarkPlusFill className="h-4 w-4" />
                <div className="text-sm">Save</div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-4xl font-light">Overview</div>
          <div className="text-graytext">{overview}</div>

          <hr />
          <div className="text-4xl font-light">Cast</div>
          <CastSlider cast={cast} />

          <hr />
          <div className="text-4xl font-light">Recommendations</div>
          <RecommendationsSlider recommendations={recommendations} />
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  // pre-generate popular movies
  const movieIds = (
    await tmdbClient.get("movie/popular").json<TMDBListWrapper<Movie>>()
  ).results.map((m) => m.id.toString());

  const paths = movieIds.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const okLanguages = ["en", "en-US", null];
  const id = params?.id as string;

  let movieData;
  try {
    movieData = await tmdbClient
      .get(`movie/${id}`, {
        searchParams: {
          append_to_response: "images,videos,credits,recommendations",
          include_image_language: okLanguages.join(","),
          include_video_language: okLanguages.join(","),
        },
      })
      .json<
        MovieDetails & Images & Videos & Credits & Recommendations<Movie>
      >();
  } catch (e) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const logo = movieData.images.logos[0];
  const logoUrl = getImageUrl(logo?.file_path ?? null);

  const backdropUrl = getImageUrl(movieData.backdrop_path);
  const posterUrl = getImageUrl(movieData.poster_path);

  const ytKey =
    movieData.videos.results.filter(
      (video) =>
        video.site === "YouTube" && video.official && video.type === "Trailer"
    )[0]?.key ?? null;

  const runtime = movieData.runtime ?? 0;

  return {
    props: {
      media_type: "movie",
      status: movieData.status,
      title: movieData.title,
      overview: movieData.overview,
      poster: posterUrl,
      backdrop: backdropUrl,
      logo: logoUrl,
      trailerKey: ytKey,
      genres: movieData.genres.slice(0, 4),
      rating: movieData.vote_average,
      runtime: `${Math.floor(runtime / 60)}h ${runtime % 60}m`,
      releaseDate: movieData.release_date || null,
      cast: movieData.credits.cast.slice(0, 15).map((p) => ({
        id: p.id,
        name: p.name,
        image: getImageUrl(p.profile_path),
        character: p.character,
      })),
      recommendations: movieData.recommendations.results
        .slice(0, 15)
        .map((m) => formatMovieForPoster(m)),
    },
    revalidate: 604800, // Revalidate every week
  };
};

export default MoviePage;
