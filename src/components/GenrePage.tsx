import { trpc } from "@/lib/trpc";
import { Genre } from "@/types/tmdb";
import { NextSeo } from "next-seo";
import { useInView } from "react-intersection-observer";
import GenreButton from "./GenreButton";
import MediaPoster from "./MediaPoster";
import PosterGrid from "./PosterGrid";
import ShimmerPoster from "./ShimmerPoster";

interface GenrePageProps {
  media_type: "movie" | "tv";
  genreId: number;
  genres: Genre[];
  text: string;
}

const GenrePage = ({ media_type, genreId, genres, text }: GenrePageProps) => {
  const genreName = genres.find((g) => g.id === genreId)!.name;

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
      <NextSeo
        title={`${genreName} ${media_type === "movie" ? "Movies" : "TV"}`}
      />

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
                    // attach infinite scroll ref to 5th from end
                    ref={length - 6 === i ? ref : null}
                    preload={i === 0}
                    key={i}
                    border={false}
                    {...m}
                  />
                ))}
              {[...Array(15)].map((_, i) => (
                <ShimmerPoster key={i} />
              ))}
            </>
          ) : (
            [...Array(20)].map((_, i) => <ShimmerPoster key={i} />)
          )}
        </PosterGrid>
      </div>
    </>
  );
};

export default GenrePage;
