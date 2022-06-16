import Image from "next/image";
import Link from "next/link";
import { HiStar } from "react-icons/hi";
import { MediaPosterProps } from "./MediaPoster";

interface RecommendationsSliderProps {
  recommendations: MediaPosterProps[];
}

const RecommendationsSlider = ({
  recommendations: recs,
}: RecommendationsSliderProps) => {
  return (
    <div className="-m-2 flex flex-row space-x-3 overflow-x-auto p-2 scrollbar-hide">
      {!(recs.length > 0) ? (
        <div>No recommendations :(</div>
      ) : (
        recs.map(({ type, id, title, poster, rating, year }, i) => (
          <Link key={i} href={`/${type}/${id}`}>
            <a>
              <div className="flex cursor-pointer flex-col space-y-3">
                <div className="w-32 shrink-0 rounded-lg shadow-sm transition duration-200 hover:scale-105 md:w-36">
                  <Image
                    src={poster || "https://http.cat/404"}
                    layout="responsive"
                    width={2}
                    height={3}
                    alt={`${title} poster`}
                    className="rounded-lg"
                    sizes="(min-width: 768px) 144px, 128px"
                  />
                </div>
                <div className="flex w-32 flex-col md:w-36">
                  <div>{title}</div>
                  <div className="flex flex-row justify-between text-sm text-graytext">
                    <div>{year}</div>
                    <div className="flex flex-row items-center justify-between space-x-1">
                      <div>{rating}</div>
                      <HiStar className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))
      )}
    </div>
  );
};

export default RecommendationsSlider;
