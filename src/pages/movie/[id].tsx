import MediaPage from "@/components/MediaPage";
import { getPopularMovies, getMoviePageDetails } from "@/lib/tmdb";
import InferNextProps from "infer-next-props-type";
import { formatMovieForPage } from "@/lib/formatMediaForPage";
import { GetStaticPaths, GetStaticPropsContext } from "next";

const MoviePage = (props: InferNextProps<typeof getStaticProps>) => {
  return <MediaPage {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await getPopularMovies();
  const paths = movies.map(({ id }) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = parseInt(params?.id as string);

  let movieData = await getMoviePageDetails(id);
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
