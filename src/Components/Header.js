//? Cookies package import
import Cookies from "js-cookie";

//? Import debouncer
// import debounce from "lodash.debounce";

//? Import React Hooks
// import { useCallback } from "react";

//? React Router import
import { Link, useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();

  const disconnect = () => {
    setToken("");
    Cookies.remove("token");
  };

  const handleTextFiltering = (event) => {
    const copy = { ...searchParameters };
    copy.title = event.target.value;
    setSearchParameters(copy);
  };

  //   const debouncedHandleTextFiltering = useCallback(
  //     debounce(handleTextFiltering, 300),
  //     []
  //   );

  return (
    <>
      <header className="header row container">
        <Link to={"/"}>
          <img src={logo} alt="Logo de Vinted" className="logo" />
        </Link>
        <input
          //   onChange={(e) => {
          //     const copy = { ...searchParameters };
          //     copy.title = e.target.value;
          //     setSearchParameters(copy);
          //   }}
          onChange={handleTextFiltering}
          value={searchParameters.title}
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
          <button onClick={()=>{
            token ? navigate("/Publish") : navigate("/Signin")}
          } className="btn btn__cta">Vends tes articles</button>
        </div>
      </header>
      <div className="filter">
        <label htmlFor="pricemin">Prix minimum</label>
        <input
          onChange={(e) => {
            const copy = { ...searchParameters };
            copy.pricemin = e.target.value;
            setSearchParameters(copy);
          }}
          value={searchParameters.pricemin}
          type="number"
          placeholder="0"
          name="pricemin"
          id="pricemin"
        />
        <label htmlFor="pricemax">Prix maximum</label>
        <input
          onChange={(e) => {
            const copy = { ...searchParameters };
            copy.pricemax = e.target.value;
            setSearchParameters(copy);
          }}
          value={searchParameters.pricemax}
          type="number"
          name="pricemax"
          id="pricemax"
          placeholder={999999}
        />
        <label htmlFor="sortArticles">Tri par prix décroissant ? </label>
        <input
          onClick={() => {
            const copy = { ...searchParameters };
            copy.sort = !copy.sort;
            setSearchParameters(copy);
          }}
          type="checkbox"
          name="sortArticles"
          id="sortArticles"
        />
      </div>
    </>
  );
};

export default Header;
