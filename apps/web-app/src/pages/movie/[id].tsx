import MediaPage, { MediaPageProps } from "@/components/MediaPage";
import { tmdb, tmdbClient } from "@media-app/common";
import { Movie, TMDBListWrapper } from "@media-app/interfaces";
import { formatMovieForPage } from "lib/formatMediaForPage";
import { GetStaticPaths, GetStaticPropsContext } from "next";

const MoviePage = (props: MediaPageProps) => {
  return <MediaPage {...props} />;
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
  const id = parseInt(params?.id as string);

  let movieData = await tmdb.getMoviePageDetails(id);
  if (!movieData) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const props = formatMovieForPage(movieData);
  return {
    props,
    revalidate: 604800, // Revalidate every week
  };
};

export default MoviePage;
