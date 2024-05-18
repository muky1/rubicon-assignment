import { useEffect } from "react";
import Search from "../components/Search";
import Tabs from "../components/Tabs";
import styles from "./SearchPage.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeTabState,
  searchTermState,
  searchResultState,
} from "../state/atom";
import axios from "axios";
import ItemCard from "../components/ItemCard";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const searchTerm = useRecoilValue(searchTermState);
  const [searchResults, setSearchResults] = useRecoilState(searchResultState);

  const fetchMedia = async () => {
    let url = `https://api.themoviedb.org/3/${activeTab}/top_rated?api_key=451e66d7f555bf7c6bf7ff3fe8f4662c&language=en-US&page=1`;
    if (searchTerm.length >= 3) {
      url = `https://api.themoviedb.org/3/search/${
        activeTab === "tv" ? "tv" : "movie"
      }?api_key=451e66d7f555bf7c6bf7ff3fe8f4662c&query=${searchTerm}`;
      const response = await axios.get(url);
      setSearchResults(response.data.results);
    } else {
      const response = await axios.get(url);
      setSearchResults(response.data.results.slice(0, 10));
    }
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
