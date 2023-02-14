//? States react import
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

  console.log(data)
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="background">
      <div className="offer row container">
        <div className="col">
          <img
            className="offer__img"
            src={data.product_pictures[0].url}
            alt=""
          />
        </div>
        <div className="offer__description col">
          <div className="offer__description__price">{data.product_price.toFixed(2)}€</div>
          <div className="offer__description__details column">
            {data.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];
              return (
                <div className="detail row" key={index}>
                  <div className="offer__description__details__static"
                  >{key} </div>
                  <div className="offer__description__details__dynamic"
                  >{detail[key]}</div>
                </div>
              )
            })}
          </div>
          <div className="offer__description__title">{data.product_name}</div>
          <div className="offer__description__owner">{data.owner.account.username}</div>
          <Link to="/Payment" className="btn btn--dark" state={{ data: data }}>Acheter</Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;
