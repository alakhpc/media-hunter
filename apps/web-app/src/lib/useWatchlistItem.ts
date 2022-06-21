import { trpc } from "./trpc";

interface useWatchlistItemParams {
  tmdbId: number;
  isTV: boolean;
}

export const useWatchlistItem = ({ tmdbId, isTV }: useWatchlistItemParams) => {
  const inWatchlistQuery = trpc.useQuery([
    "watchlist.user.check",
    { tmdbId, isTV },
  ]);

  let utils = trpc.useContext();

  const addToWatchlist = trpc.useMutation("watchlist.user.add", {
    onMutate: () => {
      utils.setQueryData(["watchlist.user.check", { tmdbId, isTV }], true);
    },
  });

  const removeFromWatchlist = trpc.useMutation("watchlist.user.remove", {
    onMutate: () => {
      utils.setQueryData(["watchlist.user.check", { tmdbId, isTV }], false);
    },
  });

  const toggleWatchlist = async () => {
    await (inWatchlistQuery.data
      ? removeFromWatchlist
      : addToWatchlist
    ).mutateAsync({
      tmdbId,
      isTV,
    });

    utils.invalidateQueries(["watchlist.user.check", { tmdbId, isTV }]);
  };

  return { inWatchlistQuery, toggleWatchlist };
};
