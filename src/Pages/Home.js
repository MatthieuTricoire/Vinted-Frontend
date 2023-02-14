//? Reacter Router import
import { useNavigate } from "react-router-dom";

//? Components import
import Article from "../Components/Article";

const Home = ({ data, token, modalVisible, setModalVisible, setInitializeModal }) => {
  //? States declaration
  const navigate = useNavigate();

  return (

    <div className="main">
      <div className="hero row">
        <div className="hero__card column">
          <h1>Prêt à faire du tri dans vos placards ?</h1>
          <button className="btn btn--dark hero__card__btn"
            onClick={() => {
              if (token) {
                navigate("/Publish")
              } else {
                setModalVisible(!modalVisible)
                setInitializeModal("SignIn")
              }
            }}
          >Vends maintenant</button>
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
