import React from "react";
import styles from "./ItemCard.module.css";
import { useNavigate } from "react-router-dom";

type ItemCardProps = {
  item: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    vote_average: number;
    overview: string;
  };
};

const ItemCard = ({ item }: ItemCardProps) => {
  const title = item.title || item.name;
  const type = item.title ? "movie" : "tv";
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/${type}/${item.id}`, { state: item });
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["item-card"]} onClick={() => navigateToDetails()}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default ItemCard;
