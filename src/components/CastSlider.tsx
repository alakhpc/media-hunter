import Image from "next/image";
import Link from "next/link";

interface CastSliderProps {
  cast: { id: number; name: string; image: string | null; character: string }[];
}

const CastSlider = ({ cast }: CastSliderProps) => {
  return (
    <div className="-m-2 flex flex-row space-x-3 overflow-x-auto p-2 scrollbar-hide">
      {!(cast.length > 0) ? (
        <div>No cast :(</div>
      ) : (
        cast.map(({ id, name, image, character }, i) => (
          <Link key={i} href={`/pal/${id}`}>
            <a>
              <div className="flex cursor-pointer flex-col space-y-3">
                <div className="w-32 shrink-0 rounded-lg shadow-sm transition duration-200 hover:scale-105 md:w-36">
                  <Image
                    src={image || "https://http.cat/404"}
                    layout="responsive"
                    width={2}
                    height={3}
                    alt={`${name} poster`}
                    className="rounded-lg"
                    sizes="(min-width: 768px) 144px, 128px"
                  />
                </div>
                <div className="flex w-32 flex-col md:w-36">
                  <div>{name}</div>
                  <div className="text-sm text-graytext">{character}</div>
                </div>
              </div>
            </a>
          </Link>
        ))
      )}
    </div>
  );
};

export default CastSlider;
