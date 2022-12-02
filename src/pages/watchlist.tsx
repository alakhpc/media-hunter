import MediaPoster from "@/components/MediaPoster";
import PosterGrid from "@/components/PosterGrid";
import { trpc } from "@/lib/trpc";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";

const Search = () => {
  const { data: session } = useSession();
  const watchlistQuery = trpc.useQuery(["watchlist.user"]);

  return (
    <>
      <NextSeo title="My Watchlist" />
      <div className="mx-4 mt-5 flex flex-col space-y-4">
        <div className="text-3xl md:text-4xl">Your Watchlist</div>
        <hr />
        {session ? (
          <PosterGrid size="md">
            {watchlistQuery.data ? (
              watchlistQuery.data.length > 0 ? (
                watchlistQuery.data.map((r, i) => (
                  <MediaPoster key={i} preload={false} border={false} {...r} />
                ))
              ) : (
                <div className="whitespace-nowrap">
                  Nothing in your watchlist :(
                </div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </PosterGrid>
        ) : (
          <div>Please login to view your watchlist</div>
        )}
      </div>
    </>
  );
};

export default Search;
