import Slider from "@/components/Slider";
import { tmdb } from "@media-app/common";
import {
  formatMovieForPoster,
  formatTVForPoster,
} from "lib/formatMediaForPoster";
import type { InferNextProps } from "infer-next-props-type";

const Home = ({ sliders }: InferNextProps<typeof getStaticProps>) => {
  return (
    <div className="mx-4 flex flex-col space-y-10">
      {sliders.map((s, i) => (
        <Slider key={i} preload={i == 0} {...s} />
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  let popularMovies = (await tmdb.getPopularMovies())
    .slice(0, 25)
    .map(formatMovieForPoster);

  let popularTV = (await tmdb.getPopularTV())
    .slice(0, 25)
    .map(formatTVForPoster);

  return {
    props: {
      sliders: [
        { text: "Popular Movies", items: popularMovies },
        { text: "Popular TV", items: popularTV },
      ],
    },
  };
};

export default Home;
