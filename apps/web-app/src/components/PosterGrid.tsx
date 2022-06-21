import MediaPoster, { MediaPosterProps } from "./MediaPoster";

const sizes = {
  sm: "grid-cols-[repeat(auto-fill,minmax(110px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(148px,1fr))]",
  md: "grid-cols-[repeat(auto-fill,minmax(148px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(196px,1fr))]",
};

interface PosterGridProps {
  posters?: MediaPosterProps[];
  size: keyof typeof sizes;
}

const PosterGrid = ({ posters, size }: PosterGridProps) => {
  return (
    <div className={`${sizes[size]} grid gap-3`}>
      {posters ? (
        posters.map((r, i) => (
          <MediaPoster key={i} preload={false} border={false} {...r} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default PosterGrid;
