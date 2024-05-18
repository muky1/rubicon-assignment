export interface MovieOrTvShow {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

export interface ApiData {
  results: MovieOrTvShow[];
}
