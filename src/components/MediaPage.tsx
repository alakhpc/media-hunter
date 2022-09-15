import CastSlider from "@/components/CastSlider";
import GenreButton from "@/components/GenreButton";
import { MediaPosterProps } from "@/components/MediaPoster";
import RecommendationsSlider from "@/components/RecommendationsSlider";
import Trailer from "@/components/Trailer";
import { useWatchlistItem } from "@/lib/useWatchlistItem";
import { Genre } from "@/types/tmdb";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useState } from "react";
import { IconType } from "react-icons";
import {
  BsBookmarkCheckFill,
  BsBookmarkFill,
  BsBookmarkPlusFill,
  BsFillPlayFill,
} from "react-icons/bs";
import { HiStar } from "react-icons/hi";

export interface MediaPageProps {
  media_type: "movie" | "tv";
  id: number;
  title: string;
  overview: string | null;
  poster: string | null;
  backdrop: string | null;
  logo: string | null;
  genres: Genre[];
  rating: string;
  runtime: string;
  year: string | null;
  status: string;
  trailerKey: string | null;
  cast: { id: number; name: string; character: string; image: string | null }[];
  recommendations: MediaPosterProps[];

  extraButton?: { text: string; icon: IconType; onClick: () => void };
}

const MediaPage = ({
  media_type,
  id,
  title,
  overview,
  backdrop,
  logo,
  poster,
  genres,
  rating,
  runtime,
  year,
  status,
  trailerKey,
  cast,
  recommendations,

  extraButton,
}: MediaPageProps) => {
  const [trailerShown, setTrailerShown] = useState(false);

  const { inWatchlistQuery, toggleWatchlist } = useWatchlistItem({
    tmdbId: id,
    isTV: media_type === "tv",
  });

  const WatchlistIcon =
    inWatchlistQuery.data === undefined
      ? BsBookmarkFill
      : inWatchlistQuery.data
      ? BsBookmarkCheckFill
      : BsBookmarkPlusFill;

  return (
    <>
      <NextSeo
        title={title}
        description={overview || "No description available"}
        openGraph={{
          images: [
            {
              url: backdrop ?? "http.cat/404",
              type: "image/jpeg",
              alt: `${title} backdrop`,
            },
          ],
        }}
      />

      {trailerShown && (
        <Trailer ytKey={trailerKey} onClose={() => setTrailerShown(false)} />
      )}

      <div className="relative inset-0 -z-10 -mt-16 h-[45vh] md:-mt-20 md:h-[60vh]">
        {/* Could not pick between curved top vs gradient top so left both in for now */}
        {/* Curved top */}
        <div className="absolute bottom-0 z-10 h-8 w-full rounded-t-full bg-theme" />
        {/* Gradient top */}
        {/* <div className="absolute bottom-0 z-10 h-1/3 w-full bg-gradient-to-t from-theme to-transparent" /> */}

        <Image
          src={backdrop || "https://http.cat/404"}
          priority={true}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt={`${title} backdrop`}
          sizes="100vw"
          className="opacity-90"
        />

        {!!logo && (
          <div className="absolute inset-[50%] h-full max-h-[60%] w-full max-w-[85%] translate-x-[-50%] translate-y-[-70%] md:max-w-2xl md:translate-y-[-60%]">
            <Image
              src={logo}
              layout="fill"
              objectFit="contain"
              alt={`${title} logo`}
              sizes="85vw"
            />
          </div>
        )}
      </div>

      <div className="mx-4 flex flex-col space-y-8 md:ml-8">
        <div className="grid gap-8 md:grid-cols-[min-content,auto]">
          <div className="mx-auto -mt-36 w-56 rounded-3xl md:-mt-40 md:w-64">
            <div className="group relative">
              <Image
                src={poster || "https://http.cat/404"}
                priority={true}
                layout="responsive"
                width={1}
                height={1.5}
                alt={`${title} poster`}
                sizes="(min-width: 768px) 256px, 224px"
                className="rounded-3xl"
              />
              <div
                className="absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl bg-black/60 opacity-0 transition duration-200 group-hover:opacity-100"
                onClick={() => setTrailerShown(true)}
              >
                <div className="flex flex-col items-center justify-center">
                  <BsFillPlayFill className="h-10 w-10" />
                  <div className="text-xl">Trailer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-2 mt-4 flex flex-col items-center justify-end gap-3 md:items-start">
            <div className="mb-1 text-center text-4xl font-semibold md:text-left">
              {title}
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              {genres.map((genre) => (
                <GenreButton
                  key={genre.id}
                  genre={genre}
                  media_type={media_type}
                  selected={false}
                />
              ))}
            </div>

            <div className="flex flex-row gap-2 text-sm text-graytext">
              <div className="flex flex-row gap-1">
                <div>{rating}</div>
                <HiStar className="h-5 w-5" />
              </div>
              |<div>{runtime}</div>|<div>{year ?? "Unknown year"}</div>|
              <div>{status}</div>
            </div>

            <div className="flex flex-row gap-1.5">
              {extraButton && (
                <button
                  className="flex flex-row items-center gap-1 rounded-md bg-lightgray py-2 px-4 transition duration-200 hover:bg-white hover:text-black"
                  onClick={extraButton.onClick}
                >
                  <extraButton.icon className="h-5 w-5" />
                  <div className="text-sm">{extraButton.text}</div>
                </button>
              )}

              <button
                className="flex flex-row items-center gap-1 rounded-md bg-lightgray py-2 px-4 transition duration-200 hover:bg-white hover:text-black"
                onClick={() => {
                  setTrailerShown(true);
                }}
              >
                <BsFillPlayFill className="h-5 w-5" />
                <div className="text-sm">Trailer</div>
              </button>

              <button
                className="flex flex-row items-center gap-1 rounded-md bg-blue-500 py-2 px-4 transition active:bg-blue-600"
                onClick={toggleWatchlist}
              >
                <WatchlistIcon className="h-4 w-4" />
                <div className="text-sm">Save</div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-4xl font-light">Overview</div>
          <div className="text-graytext">{overview}</div>

          <hr />
          <div className="text-4xl font-light">Cast</div>
          <CastSlider cast={cast} />

          <hr />
          <div className="text-4xl font-light">Recommendations</div>
          <RecommendationsSlider recommendations={recommendations} />
        </div>
      </div>
    </>
  );
};

export default MediaPage;
