import MediaPoster, { MediaPosterProps } from "./MediaPoster";

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
        recs.map((m, i) => (
          <div key={i} className="min-w-[128px] md:min-w-[144px]">
            <MediaPoster preload={false} border={false} {...m} />
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsSlider;
