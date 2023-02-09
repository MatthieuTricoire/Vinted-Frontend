//? States react import
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//? Axios import
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="background-offer">
      <div className="offer row container">
        <div className="col">
          <img
            className="offer__img"
            src={data.product_pictures[0].url}
            alt=""
          />
        </div>
        <div className="offer__description col">
          <div className="offer__description__price">{data.product_price}</div>
          <div className="offer__description__details">
            <div className="offer__description__details___brand">
              <span>MARQUE</span> {data.product_details[0].MARQUE}
            </div>
            <div className="offer__description__details___brand">
              <span>TAILLE</span> {data.product_details[1].TAILLE}
            </div>
            <div className="offer__description__details___brand">
              <span>ÉTAT</span> {data.product_details[2].ÉTAT}
            </div>
            <div className="offer__description__details___brand">
              <span>COULEUR</span> {data.product_details[3].COULEUR}
            </div>
            <div className="offer__description__details___brand">
              <span>EMPLACEMENT</span> {data.product_details[4].EMPLACEMENT}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
