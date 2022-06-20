import GenrePage from "@/components/GenrePage";
import { formatMovieForPoster } from "@/lib/formatMediaForPoster";
import { movieGenres } from "@/lib/genres";
import { tmdb } from "@media-app/common";
import InferNextProps from "infer-next-props-type";
import { GetStaticPropsContext } from "next";

const MovieGenresPage = ({ media }: InferNextProps<typeof getStaticProps>) => {
  return (
    <GenrePage
      media_type="movie"
      genres={movieGenres}
      text="Browse Movies"
      media={media}
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
  const movies = (await tmdb.getMoviesByGenre(id)).map(formatMovieForPoster);

  return {
    props: {
      media: movies,
    },

    revalidate: 604800, // Revalidate every week
  };
};
