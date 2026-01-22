type Translation = {
  description: string;
  language: string;
};
type Logo = {
  url: string;
  aspectRatio: number;
  width: number;
};
export type Trailer = {
  id: string;
  site: string; // e.g., "YouTube"
  url: string;
};
export type Character = {
  id: number;
  name: string;
  url: string;
  character: string;
  image: string;
};
type Mappings = {
  imdb: string;
  tmdb: number;
};
type SimilarOrRecommendation = {
  id: number;
  title: string;
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
};


type Episode = {
  id: string;
  title: string;
  episode: number;
  season: number;
  releaseDate: string; // ISO date string
  description: string;
  url: string;
  img: {
    mobile: string;
    hd: string;
  };
};

type Season = {
  season: number;
  image: {
    mobile: string;
    hd: string;
  };
  isReleased: boolean;
  episodes: Episode[];
};


export type MediaResult = {
  id: string;
  title: string;
  episodeId: string;
  type: string;
  rating: number;
  releaseDate: string;
  description: string;
  image: string;
  cover: string;
  logos: Logo[];
  genres: string[];
  translations: Translation[];
  duration: number; // in minutes
  directors: string[];
  writers: string[];
  actors: string[];
  characters: Character[];
  trailer: Trailer;
  mappings: Mappings;
  totalSeasons?: number,
  similar: SimilarOrRecommendation[];
  recommendations: SimilarOrRecommendation[];
  seasons?: Season[];
};
