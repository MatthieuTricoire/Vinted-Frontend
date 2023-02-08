//? Reacter Router import
import { Link } from "react-router-dom";

//? Components import
import Article from "../Components/Article";

const Home = ({ data }) => {
  return (
    <div className="main">
      <div className="hero row">
        <div className="hero__card">
          <h1>Prêt à faire du tri dans vos placards ?</h1>
          <button className="btn btn-cta">Vends maintenant</button>
        </div>
      </div>
      <section className="container row articles">
        {data.offers.map((offer) => {
          return (
            <Link to={`/offer/${offer._id}`}>
              <Article offer={offer} key={offer._id} />;
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
