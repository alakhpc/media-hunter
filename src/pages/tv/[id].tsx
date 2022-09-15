import EpisodesModal from "@/components/EpisodesModal";
import MediaPage from "@/components/MediaPage";
import { getPopularTV, getTVPageDetails } from "@/lib/tmdb";
import InferNextProps from "infer-next-props-type";
import { formatTVForPage } from "lib/formatMediaForPage";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";

const TVPage = ({
  seasons,
  ...props
}: InferNextProps<typeof getStaticProps>) => {
  const [episodesShown, setEpisodesShown] = useState(false);

  return (
    <>
      <MediaPage
        extraButton={{
          text: "Episodes",
          icon: BsFillPlayFill,
          onClick: () => {
            setEpisodesShown(true);
          },
        }}
        {...props}
      />

      <EpisodesModal
        shown={episodesShown}
        setShown={setEpisodesShown}
        tmdbId={props.id}
        seasons={seasons}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await getPopularTV();
  const paths = movies.map(({ id }) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = parseInt(params?.id as string);

  let tvData = await getTVPageDetails(id);
  if (!tvData) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const props = formatTVForPage(tvData);
  const seasons = tvData.seasons
    .filter((s) => s.season_number !== 0)
    .map((s) => s.season_number);

  return {
    props: { ...props, seasons },
    revalidate: 604800, // Revalidate every week
  };
};

export default TVPage;
