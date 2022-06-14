import Image from "next/image";
import Link from "next/link";
import { BsTvFill } from "react-icons/bs";
import { HiStar } from "react-icons/hi";
import { MdMovie } from "react-icons/md";

export interface MediaPosterProps {
  type: "movie" | "tv";
  id: number;
  title: string;
  poster: string | null;
  year: string | null;
  rating: number | null;
}

const MediaPoster = ({
  preload,
  type,
  id,
  title,
  poster,
  year,
  rating,
}: { preload: boolean } & MediaPosterProps) => {
  let MediaIcon = type === "movie" ? MdMovie : BsTvFill;

  return (
    <Link href={`/${type}/${id}`}>
      <a>
        <div className="flex cursor-pointer flex-col space-y-3">
          <div className="w-36 shrink-0 rounded-lg border-2 border-transparent shadow-sm transition duration-200 hover:scale-105 hover:border-white md:w-48">
            <Image
              src={poster || "https://http.cat/404"}
              layout="responsive"
              width={2}
              priority={preload}
              height={3}
              alt={`${title} poster`}
              className="rounded-lg"
              sizes="(min-width: 768px) 192px, 144px"
            />
          </div>
          <div className="flex w-36 flex-col space-y-1 md:w-48">
            <div className="flex flex-row items-center justify-between">
              <div className="w-10/12 truncate font-semibold">{title}</div>
              <MediaIcon className="h-5 w-5 text-[#9CA3AF]" />
            </div>
            <div className="flex flex-row justify-between text-sm text-[#9CA3AF]">
              <div>{year}</div>
              <div className="flex flex-row items-center space-x-1">
                <div>{rating}</div>
                <HiStar className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default MediaPoster;