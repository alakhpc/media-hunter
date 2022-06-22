import { trpc } from "@/lib/trpc";
import { Genre } from "@media-app/interfaces";
import { NextSeo } from "next-seo";
import GenreButton from "./GenreButton";
import MediaPoster from "./MediaPoster";

interface GenrePageProps {
  media_type: "movie" | "tv";
  genreId: number;
  genres: Genre[];
  text: string;
}

const GenrePage = ({ media_type, genreId, genres, text }: GenrePageProps) => {
  const { data, fetchNextPage } = trpc.useInfiniteQuery(
    ["genres.movie", { genreId }],
    {
      getNextPageParam: ({ nextPage }) => {
        return nextPage;
      },
    }
  );

  return (
    <>
      <NextSeo title={text} />
      <div className="mx-4 mt-5 flex flex-col space-y-4">
        <div className="text-3xl md:text-4xl">{text}</div>
        <div className="flex flex-row space-x-2">
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(148px,1fr))]">
          {data?.pages
            .map((m) => m.media)
            .flat()
            .map((m, i) => (
              <MediaPoster key={i} border={false} preload={false} {...m} />
            ))}
        </div>
      </div>
    </>
  );
};

export default GenrePage;
