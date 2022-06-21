import MediaPoster from "@/components/MediaPoster";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const query = router.query.q as string;
  const results = trpc.useQuery(["search.multi", query]);

  return (
    <div className="mx-4 mt-5 flex flex-col space-y-4">
      <div className="text-3xl md:text-4xl">
        Search Results for <p className="inline font-semibold">{query}</p>
      </div>
      <hr />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(148px,1fr))]">
        {results.data ? (
          results.data.map((r, i) => (
            <MediaPoster key={i} preload={false} border={false} {...r} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Search;
