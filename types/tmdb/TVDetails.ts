import { CreatedBy } from "./CreatedBy";
import { Genre } from "./Genre";
import { Network } from "./Network";
import { ProductionCompany } from "./ProductionCompany";
import { ProductionCountry } from "./ProductionCountry";
import { Season } from "./Season";
import { SpokenLanguage } from "./SpokenLanguage";

export interface TVDetails {
  backdrop_path: string | null;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date?: string;
  genres: Genre[];
  homepage: string | null;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string | null;
  last_episode_to_air: {
    air_date: string | null;
    episode_number: number;
    id: number;
    name: string | null;
    overview: string | null;
    production_code: string | null;
    season_number: number;
    still_path: string | null;
    vote_average?: number;
    vote_count: number;
  } | null;
  name: string;
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average?: number;
    vote_count: number;
  } | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  type: string;
  vote_average?: number;
  vote_count: number;
}
