import GenrePage from "@/components/GenrePage";
import { formatTVForPoster } from "@/lib/formatMediaForPoster";
import { tvGenres } from "@/lib/genres";
import { tmdb } from "@media-app/common";
import InferNextProps from "infer-next-props-type";
import { GetStaticPropsContext } from "next";

const MovieGenresPage = ({ media }: InferNextProps<typeof getStaticProps>) => {
  return (
    <GenrePage
      media_type="tv"
      genres={tvGenres}
      text="Browse TV"
      media={media}
    />
  );
};

export default MovieGenresPage;

export const getStaticPaths = async () => {
  return {
    paths: tvGenres.map((g) => ({ params: { id: g.id.toString() } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = parseInt(params?.id as string);
  const tvs = (await tmdb.getTVSByGenre(id)).map(formatTVForPoster);

  return {
    props: {
      media: tvs,
    },

    revalidate: 604800, // Revalidate every week
  };
};
