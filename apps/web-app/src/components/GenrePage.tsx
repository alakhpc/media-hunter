import { Genre } from "@media-app/interfaces";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import GenreButton from "./GenreButton";
import MediaPoster, { MediaPosterProps } from "./MediaPoster";

interface GenrePageProps {
  media_type: "movie" | "tv";
  genres: Genre[];
  text: string;
  media: MediaPosterProps[];
}

const GenrePage = ({ media_type, genres, text, media }: GenrePageProps) => {
  const router = useRouter();
  const genreId = parseInt(router.query.id as string);

  return (
    <>
      <NextSeo title={text} />

      <div className="mx-4 mt-5 flex flex-col space-y-4">
        <div className="text-3xl md:text-4xl">{text}</div>
        <div className="flex flex-row space-x-2">
          {genres.map((g) => (
            <GenreButton
              key={g.id}
              genre={g}
              media_type={media_type}
              selected={g.id === genreId}
            />
          ))}
        </div>
        <hr />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(148px,1fr))]">
          {media.map((r, i) => (
            <MediaPoster key={i} preload={false} {...r} border={true} />
          ))}
        </div>
      </div>
    </>
  );
};

export default GenrePage;
