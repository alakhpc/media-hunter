import PosterGrid from "@/components/PosterGrid";
import { trpc } from "@/lib/trpc";
import { NextSeo } from "next-seo";

const Search = () => {
  const watchlistQuery = trpc.useQuery(["watchlist.user"]);

  return (
    <>
      <NextSeo title="My Watchlist" />
      <div className="mx-4 mt-5 flex flex-col space-y-4">
        <div className="text-3xl md:text-4xl">Your Watchlist</div>
        <hr />
        <PosterGrid posters={watchlistQuery.data} size="md" />
      </div>
    </>
  );
};

export default Search;
