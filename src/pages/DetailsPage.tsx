import { useEffect, useState } from "react";
import Details from "../components/DetailsComponent/Details";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { id, type } = useParams();
  const [itemDetails, setItemDetails] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
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
