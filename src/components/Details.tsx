import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Details.module.css";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

type ItemDetailsProps = {
  item: {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
  };
};

const Details = ({ item }: ItemDetailsProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const type = item.name ? "tv" : "movie";

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=451e66d7f555bf7c6bf7ff3fe8f4662c`
        );
        const trailer = response.data.results.find(
          (v: any) => v.type === "Trailer"
        );
        if (trailer) {
          setVideoUrl(trailer.key);
        }
      } catch (error) {
        console.error("Error loading video!");
      }
    };

    fetchVideo();
  }, [item]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles["container"]}>
      <button className={styles["back-button"]} onClick={handleBackButtonClick}>
        <FaArrowLeft style={{ marginRight: "5px" }} /> Back
      </button>
      <div className={styles["wrapper"]}>
        {item && (
          <div>
            {videoUrl ? (
              <div className={styles["video-container"]}>
                <iframe
                  title="YouTube video player"
                  src={`https://www.youtube.com/embed/${videoUrl}`}
                  height="500px"
                  width="900px"
                  allow="fullscreen; autoplay; picture-in-picture;"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            ) : (
              <div style={{ width: "fit-content", marginInline: "auto" }}>
                <img
                  src={imageUrl}
                  alt={item.title || item.name}
                  style={{
                    width: "470px",
                    height: "705px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <h2>{item.title || item.name}</h2>
            <div>{item.overview}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
