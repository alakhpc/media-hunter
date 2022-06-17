import MediaPage, { MediaPageProps } from "@/components/MediaPage";
import { tmdb } from "@media-app/common";
import InferNextProps from "infer-next-props-type";
import { formatTVForPage } from "lib/formatMediaForPage";
import { GetStaticPaths, GetStaticPropsContext } from "next";

const MoviePage = (props: InferNextProps<typeof getStaticProps>) => {
  return <MediaPage {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await tmdb.getPopularTV();
  const paths = movies.map(({ id }) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = parseInt(params?.id as string);

  let tvData = await tmdb.getTVPageDetails(id);
  if (!tvData) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const props = formatTVForPage(tvData);
  return {
    props,
    revalidate: 604800, // Revalidate every week
  };
};

export default MoviePage;
