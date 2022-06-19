import MediaPoster, { MediaPosterProps } from "./MediaPoster";

interface SliderProps {
  preload: boolean;
  text: string;
  items: MediaPosterProps[];
}

const Slider = ({ preload, text, items: items }: SliderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-4xl">{text}</div>
      <div className="-m-2 flex flex-row space-x-3 overflow-x-auto p-2 scrollbar-hide">
        {items.map((m, i) => (
          <div key={i} className="min-w-[148px] md:min-w-[196px]">
            <MediaPoster key={i} preload={preload && i == 0} {...m} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
