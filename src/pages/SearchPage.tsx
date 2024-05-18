import { useEffect } from "react";
import Search from "../components/SearchComponent/Search";
import Tabs from "../components/TabsComponent/Tabs";
import styles from "./SearchPage.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeTabState,
  searchTermState,
  searchResultState,
} from "../state/atom";
import axios from "axios";
import ItemCard from "../components/ItemCardComponent/ItemCard";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const searchTerm = useRecoilValue(searchTermState);
  const [searchResults, setSearchResults] = useRecoilState(searchResultState);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchMedia = async () => {
    let url = `https://api.themoviedb.org/3/${activeTab}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    if (searchTerm.length >= 3) {
      url = `https://api.themoviedb.org/3/search/${
        activeTab === "tv" ? "tv" : "movie"
      }?api_key=${API_KEY}&query=${searchTerm}`;
    }
    const response = await axios.get(url);
    setSearchResults(
      searchTerm.length >= 3
        ? response.data.results
        : response.data.results.slice(0, 10)
    );
  };

  useEffect(() => {
    fetchMedia();
  }, [activeTab, searchTerm]);

  return (
    <div className={styles["container"]}>
      <h1>Hello, please start searching for movies or TV Shows!</h1>
      <Tabs />
      <Search />
      <div className={styles["grid"]}>
        {searchResults.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
