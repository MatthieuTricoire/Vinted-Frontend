//? React Router import
import { Link } from "react-router-dom";

//? Import logo vinted
import logo from "../Assets/Img/logo.svg";

const Header = () => {
  return (
    <header className="header row container">
      <Link to={"/"}>
        <img src={logo} alt="Logo de Vinted" className="logo" />
      </Link>
      <input type="text" placeholder="Recherche des articles" />
      <div className="login-action">
        <Link to="signup">
          <button className="btn btn__login">S'inscrire</button>
        </Link>
        <Link to="signin">
          <button className="btn btn__login">Se connecter</button>
        </Link>
      </div>
      <div className="cta">
        <button className="btn btn__cta">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
