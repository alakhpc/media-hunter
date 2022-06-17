import MediaPage, { MediaPageProps } from "@/components/MediaPage";
import { tmdb } from "@media-app/common";
import { formatMovieForPage } from "lib/formatMediaForPage";
import { GetStaticPaths, GetStaticPropsContext } from "next";

const MoviePage = (props: MediaPageProps) => {
  return <MediaPage {...props} />;
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const movies = await tmdb.getPopularMovies();
  const paths = movies.map(({ id }) => ({ params: { id: id.toString() } }));

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
