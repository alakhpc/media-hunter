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

const MoviePage = ({
  title,
  backdrop,
  logo,
}: InferNextProps<typeof getStaticProps>) => {
  return (
    <div className="absolute inset-0 -z-10 -mt-16 h-2/3 md:-mt-20">
      <div className="absolute bottom-0 z-10 h-1/3 w-full bg-gradient-to-t from-theme to-transparent" />
      <Image
        src={backdrop || "https://http.cat/404"}
        priority={true}
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        className="opacity-75"
        alt={`${title} backdrop`}
      />

      <div className="absolute inset-[50%] h-full max-h-[70%] w-full max-w-[75%] translate-x-[-50%] translate-y-[-60%] md:max-w-5xl md:translate-y-[-60%]">
        <Image
          src={logo || "https://http.cat/404"}
          layout="fill"
          objectFit="contain"
          alt={`${title} logo`}
        />
      </div>
    </div>
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

  return {
    props: {
      id: movieData.id,
      title: movieData.title,
      overview: movieData.overview,
      poster: posterUrl,
      backdrop: backdropUrl,
      logo: logoUrl,
      trailerKey: ytKey,
      genres: movieData.genres.slice(0, 4),
      rating: movieData.vote_average,
      runtime: movieData.runtime ?? 0,
      releaseDate: movieData.release_date || null,
      cast: movieData.credits.cast.slice(0, 15).map((p) => ({
        name: p.name,
        id: p.id,
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
