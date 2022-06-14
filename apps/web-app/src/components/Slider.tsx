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
          <MediaPoster preload={preload && i == 0} key={i} {...m} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
