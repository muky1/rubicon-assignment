import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { searchTermState } from "../state/atom";
import React from "react";
import styles from "./Search.module.css";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [input, setInput] = useState(searchTerm);
  const debouncedInput = useDebounce(input, 1000);

  useEffect(() => {
    setSearchTerm(debouncedInput);
  }, [debouncedInput, setSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <input
      className={styles["input"]}
      type="text"
      placeholder="Search TV Shows or Movies"
      value={input}
      onChange={handleInputChange}
    />
  );
};

export default Search;
