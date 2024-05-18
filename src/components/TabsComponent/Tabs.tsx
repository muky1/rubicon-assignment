import { useRecoilState } from "recoil";
import { activeTabState } from "../../state/atom";
import styles from "./Tabs.module.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  return (
    <div className={styles["container"]}>
      <button
        onClick={() => setActiveTab("movie")}
        className={
          activeTab === "movie"
            ? `${styles["active"]} ${styles["tab"]}`
            : styles["tab"]
        }
      >
        Movies
      </button>
      <button
        onClick={() => setActiveTab("tv")}
        className={
          activeTab === "tv"
            ? `${styles["active"]} ${styles["tab"]}`
            : styles["tab"]
        }
      >
        TV Shows
      </button>
    </div>
  );
};

export default Tabs;
