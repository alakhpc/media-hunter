import GenrePage from "@/components/GenrePage";
import { movieGenres } from "@/lib/genres";
import InferNextProps from "infer-next-props-type";
import { GetStaticPropsContext } from "next";

const MovieGenresPage = ({ id }: InferNextProps<typeof getStaticProps>) => {
  return (
    <GenrePage
      media_type="movie"
      genreId={id}
      genres={movieGenres}
      text="Browse Movies"
    />
  );
};

export default MovieGenresPage;

export const getStaticPaths = async () => {
  return {
    paths: movieGenres.map((g) => ({ params: { id: g.id.toString() } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = parseInt(params?.id as string);

  return {
    props: { id },
    revalidate: 604800, // Revalidate every week
  };
};
