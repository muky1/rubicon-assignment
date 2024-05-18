import { atom } from "recoil";
import { MovieOrTvShow } from "../utils/types";

export const activeTabState = atom({
  key: "activeTabState",
  default: "tv",
});

export const searchTermState = atom({
  key: "searchTermState",
  default: "",
});

export const searchResultState = atom<MovieOrTvShow[]>({
  key: "searchResultState",
  default: [],
});
