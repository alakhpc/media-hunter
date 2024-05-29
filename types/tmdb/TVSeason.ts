import { CastMember } from "./CastMember";
import { CrewMember } from "./CrewMember";

export interface TVSeason {
  _id: string;
  id: number;
  name: string;
  overview: string | null;
  poster_path: string | null;
  season_number: number;
  air_date: string | null;

  episodes: {
    id: number;
    name: string;
    overview: string | null;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average?: number;
    vote_count: number;
    air_date: string | null;
    episode_number: number;
    crew: CastMember[];
    guest_stars: CrewMember[];
  }[];
}
