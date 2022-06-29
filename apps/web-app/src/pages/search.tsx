import MediaPoster from "@/components/MediaPoster";
import PosterGrid from "@/components/PosterGrid";
import ShimmerPoster from "@/components/ShimmerPoster";
import { trpc } from "@/lib/trpc";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

const Search = () => {
  const router = useRouter();
  const query = router.query.q as string;

  const { data, fetchNextPage } = trpc.useInfiniteQuery(
    ["search.multi", { query }],
    {
      getNextPageParam: ({ nextPage }) => {
        return nextPage ?? undefined;
      },
    }
  );
  let media = data?.pages.flatMap((m) => m.media);

  const { ref } = useInView({
    onChange: (inView) => inView && fetchNextPage(),
  });

  return (
    <>
      <NextSeo title={`Search results for "${query}"`} />

      <div className="mx-4 mt-5 flex flex-col space-y-4">
        <div className="text-3xl md:text-4xl">
          Search Results for <p className="inline font-semibold">{query}</p>
        </div>
        <hr />
        <PosterGrid size="sm">
          {media !== undefined ? (
            media.length > 0 ? (
              media.map((r, i, { length }) => (
                <MediaPoster
                  ref={length - 6 === i ? ref : null}
                  key={i}
                  preload={false}
                  border={false}
                  {...r}
                />
              ))
            ) : (
              <div>No results :(</div>
            )
          ) : (
            [...Array(35)].map((_, i) => <ShimmerPoster key={i} />)
          )}
        </PosterGrid>
      </div>
    </>
  );
};

export default Search;
