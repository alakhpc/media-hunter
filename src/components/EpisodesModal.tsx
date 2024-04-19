import { trpc } from "@/lib/trpc";
import Image from "next/image";
import { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { HiStar, HiX } from "react-icons/hi";

interface EpisodesModalProps {
  shown: boolean;
  setShown: (_: boolean) => void;
  tmdbId: number;
  seasons: number[];
}

const EpisodesModal = ({
  shown,
  setShown,
  tmdbId,
  seasons,
}: EpisodesModalProps) => {
  const [season, setSeason] = useState(seasons[0]!);
  const episodes = trpc.useQuery(["tv.season.episodes", { tmdbId, season }]);

  return (
    <div
      className={`${
        !shown ? "mt-[100vh]" : "mt-0"
      }  fixed inset-0 z-50 transition-all duration-200`}
    >
      <div
        className="fixed z-[50] h-screen w-screen bg-black/50"
        onClick={() => setShown(false)}
      />

      <div className="flex h-screen items-end justify-center ">
        <div className="relative z-50 h-[90%] w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl ">
          <div className="relative h-full w-full overflow-y-auto overscroll-y-none rounded-t-3xl bg-[#1f213a] scrollbar-hide ">
            <div
              className="inset-0 mt-3 ml-auto mr-[10px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-500"
              onClick={() => setShown(false)}
            >
              <HiX className="h-5 w-5" />
            </div>
            <div className="mx-10 flex flex-col gap-5">
              <div className="text-4xl font-bold">Seasons</div>
              <div className="-mt-1 flex flex-row flex-wrap gap-2 md:gap-1">
                {seasons.map((s) => (
                  <div
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`${
                      s === season ? "bg-white text-black" : "bg-gray"
                    } cursor-pointer rounded-md py-2 px-3 text-xs transition duration-200 hover:bg-white hover:text-black`}
                  >
                    {s}
                  </div>
                ))}
              </div>
              <hr className="border-gray-500" />
              <div className="text-3xl">Episodes</div>
              <div className="mb-10 flex flex-col">
                {episodes.data
                  ? episodes?.data.map((e) => {
                      return (
                        <div key={e.id}>
                          <div className="flex flex-row flex-wrap gap-4 md:flex-nowrap">
                            <div className="group relative aspect-video h-44 rounded-lg">
                              <Image
                                unoptimized
                                src={e.image || "https://http.cat/404"}
                                layout="responsive"
                                width={160}
                                height={90}
                                alt={`${e.title} still`}
                                className="rounded-lg"
                              />
                              <div
                                className="absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-black/60 opacity-60 group-hover:opacity-100"
                                onClick={() => {}}
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <BsFillPlayFill className="h-10 w-10" />
                                  <div className="text-xl">Trailer</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div>
                                <div className="text-xl font-light">
                                  {e.episode_number}. {e.title}
                                </div>
                                <div className="hidden flex-row gap-2 text-sm text-gray-500 md:flex">
                                  <div>
                                    S{season}E{e.episode_number}
                                  </div>
                                  <div>|</div>
                                  <div className="">{e.air_date}</div>
                                  <div>|</div>
                                  <div className="flex flex-row gap-1">
                                    <div>{e.rating || "Unknown"}</div>
                                    <HiStar className="h-5 w-5" />
                                  </div>
                                </div>
                              </div>
                              <div className="line-clamp-5">{e.overview}</div>
                            </div>
                          </div>
                          <hr className="my-4 mx-1 border-gray-500" />
                        </div>
                      );
                    })
                  : [...Array(5)].map((_, i) => (
                      <div key={i}>
                        <div className="flex flex-row flex-wrap gap-4 md:flex-nowrap">
                          <div className="aspect-video h-44 animate-pulse rounded-lg bg-slate-700" />
                          <div className="flex grow flex-col gap-2">
                            <div className="h-12 w-full animate-pulse rounded-lg bg-slate-700" />
                            <div className="h-[120px] w-full animate-pulse rounded-lg bg-slate-700" />
                          </div>
                        </div>
                        <hr className="my-4 mx-1 border-gray-500" />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodesModal;
