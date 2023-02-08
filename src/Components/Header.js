const Header = () => {
  return (
    <header className="header row">
      <img src="" alt="Logo de Vinted" className="logo" />
      <input type="text" placeholder="Recherche des articles" />
      <div className="login-action">
        <button className="btn btn__login">S'inscrire</button>
        <button className="btn btn__login">Se connecter</button>
      </div>
      <div className="cta">
        <button className="btn btn__cta">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
