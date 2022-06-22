import { trpc } from "@/lib/trpc";
import { Genre } from "@media-app/interfaces";
import { NextSeo } from "next-seo";
import { useInView } from "react-intersection-observer";
import GenreButton from "./GenreButton";
import MediaPoster from "./MediaPoster";
import PosterGrid from "./PosterGrid";

interface GenrePageProps {
  media_type: "movie" | "tv";
  genreId: number;
  genres: Genre[];
  text: string;
}

const GenrePage = ({ media_type, genreId, genres, text }: GenrePageProps) => {
  const { ref } = useInView({
    onChange: (inView) => inView && fetchNextPage(),
  });

  const { data, fetchNextPage } = trpc.useInfiniteQuery(
    [`genres.${media_type}`, { genreId }],
    {
      getNextPageParam: ({ nextPage }) => {
        return nextPage ?? undefined;
      },
    }
  );

  return (
    <>
      <NextSeo title={text} />
      <div className="mx-4 mt-5 flex flex-col space-y-4">
        <div className="text-3xl md:text-4xl">{text}</div>
        <div className="flex flex-row flex-wrap gap-2">
          {genres.map((g) => (
            <GenreButton
              key={g.id}
              genre={g}
              media_type={media_type}
              selected={g.id === genreId}
            />
          ))}
        </div>
        <hr />
        <PosterGrid size="md">
          {data?.pages ? (
            <>
              {data.pages
                .flatMap((m) => m.media)
                .map((m, i, { length }) => (
                  <MediaPoster
                    ref={length - 6 === i ? ref : null}
                    key={i}
                    border={false}
                    preload={false}
                    {...m}
                  />
                ))}
            </>
          ) : (
            <div />
          )}
        </PosterGrid>
      </div>
    </>
  );
};

export default GenrePage;
