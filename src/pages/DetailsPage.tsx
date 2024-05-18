import React, { useEffect, useState } from "react";
import Details from "../components/Details";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { id, type } = useParams();
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=451e66d7f555bf7c6bf7ff3fe8f4662c`
      );
      setItemDetails(response.data);
    };
    fetchData();
  }, [id, type]);

  if (!itemDetails) return <p>Loading...</p>;

  return (
    <div>
      <Details item={itemDetails} />
    </div>
  );
};

export default DetailsPage;
