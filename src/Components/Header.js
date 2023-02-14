//? Import debouncer
// import debounce from "lodash.debounce";

//? Import React Hooks
// import { useCallback } from "react";

//? React Router import
import { Link, useNavigate } from "react-router-dom";


//? Import logo vinted
import logo from "../Assets/Img/logo.svg";

const Header = ({
  token,
  handleToken,
  modal,
  setModal,
  setInitializeModal,
  searchParameters,
  setSearchParameters,
}) => {

  const navigate = useNavigate();

  const disconnect = () => {
    handleToken(null);
  };

  const handleTextFiltering = (event) => {
    const copy = { ...searchParameters };
    copy.title = event.target.value;
    setSearchParameters(copy);
  };


  return (
    <>
      <header className="header row container">
        <Link to={"/"}>
          <img src={logo} alt="Logo de Vinted" className="logo" />
        </Link>
        <input className="input-txt header__search"
          onChange={handleTextFiltering}
          value={searchParameters.title}
          type="text"
          placeholder="Recherche ton prochain achat !"
        />
        <div className="login-action row">
          {!token ? (
            <>
              <button
                onClick={() => {
                  setModal(!modal);
                  setInitializeModal("SignUp");
                }}
                className="btn btn--ligth"
              >
                S'inscrire
              </button>

              <button
                onClick={() => {
                  setModal(!modal);
                  setInitializeModal("SignIn");
                }}
                className="btn btn--ligth"
              >
                Se connecter
              </button>
            </>
          ) : (
            <button
              className="btn btn--dark btn--test"
              onClick={() => {
                disconnect();
              }}
            >
              Se Déconnecter
            </button>
          )}
        </div>
        <div className="cta">
          <button onClick={() => {
            if (token) {
              navigate("/Publish")
            } else {
              setModal(!modal)
              setInitializeModal("SignIn")
            }
          }}
            className="btn btn--dark">Vends tes articles</button>
        </div>
      </header>
      <div className="filter container row">
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
          className="input-txt small-input"
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
          placeholder={9999}
          className="input-txt small-input"
        />
        <label className="sortCheckboxLabel" htmlFor="sortArticles"></label>
        <input
          onClick={() => {
            const copy = { ...searchParameters };
            copy.sort = !copy.sort;
            setSearchParameters(copy);
          }}
          type="checkbox"
          name="sortArticles"
          id="sortArticles"
          className="sortCheckbox"
        />
      </div>
    </>
  );
};

export default Header;
