//? Reacter Router import


//? Components import
import Article from "../Components/Article";

const Home = ({ data }) => {
  //? States declaration

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
          // <MenuItem component={Link} to={'/first'}>Team 1</MenuItem>
          return <Article offer={offer} key={offer._id} />;
        })}
      </section>
    </div>
  );
};

export default Home;
