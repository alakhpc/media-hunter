import { trpc } from "@/lib/trpc";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const query = router.query.q as string;
  const results = trpc.useQuery(["search", query]);

  if (!results.data) {
    return <div>Loading</div>;
  }
  return <div>{JSON.stringify(results.data)}</div>;
};

export default Search;
