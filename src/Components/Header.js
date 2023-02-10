//? Cookies package import
import Cookies from "js-cookie";

//? React Router import
import { Link } from "react-router-dom";

//? Import logo vinted
import logo from "../Assets/Img/logo.svg";

const Header = ({
  setToken,
  token,
  modal,
  setModal,
  initializeModal,
  setInitializeModal,
  searchParameters,
  setSearchParameters,
}) => {
  const disconnect = () => {
    setToken("");
    Cookies.remove("token");
  };

  return (
    <header className="header row container">
      <Link to={"/"}>
        <img src={logo} alt="Logo de Vinted" className="logo" />
      </Link>
      <input
        onChange={(e) => {
          const copy = { ...searchParameters };
          copy.title = e.target.value;
          setSearchParameters(copy);
        }}
        value={searchParameters}
        type="text"
        placeholder="Recherche des articles"
      />
      <div className="login-action">
        {!token ? (
          <>
            <button
              onClick={() => {
                setModal(!modal);
                setInitializeModal("SignUp");
                console.log(setInitializeModal);
              }}
              className="btn btn__login"
            >
              S'inscrire
            </button>

            <button
              onClick={() => {
                setModal(!modal);
                setInitializeModal("SignIn");
              }}
              className="btn btn__login"
            >
              Se connecter
            </button>
          </>
        ) : (
          <button
            className="btn btn__disconnect"
            onClick={() => {
              disconnect();
            }}
          >
            Se Déconnecter
          </button>
        )}
      </div>
      <div className="cta">
        <button className="btn btn__cta">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
