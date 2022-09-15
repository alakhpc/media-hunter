import Slider from "@/components/Slider";
import {
  formatMovieForPoster,
  formatTVForPoster,
} from "@/lib/formatMediaForPoster";
import { getPopularMovies, getPopularTV } from "@/lib/tmdb";
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
  let popularMovies = (await getPopularMovies())
    .slice(0, 25)
    .map(formatMovieForPoster);

  let popularTV = (await getPopularTV()).slice(0, 25).map(formatTVForPoster);

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
