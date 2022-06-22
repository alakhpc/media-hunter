import PosterGrid from "@/components/PosterGrid";
import { trpc } from "@/lib/trpc";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const query = router.query.q as string;
  const searchQuery = trpc.useQuery(["search.multi", query]);

  return (
    <>
      <NextSeo title={`Search results for "${query}"`} />

      <div className="mx-4 mt-5 flex flex-col space-y-4">
        <div className="text-3xl md:text-4xl">
          Search Results for <p className="inline font-semibold">{query}</p>
        </div>
        <hr />
        <PosterGrid posters={searchQuery.data} size="sm" />
      </div>
    </>
  );
};

export default Search;
