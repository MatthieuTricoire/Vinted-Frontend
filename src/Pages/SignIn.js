//? States react import
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//? Cookies import
import Cookies from "js-cookie";

//? Axios import
import axios from "axios";

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubtmit = async (e) => {
    e.preventDefault();
    try {
      const loginInformation = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      Cookies.set("token", loginInformation.data.token, { expires: 1 });
      setToken(loginInformation.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="signin">
      <form onSubmit={onSubtmit} className="form column">
        <h2>Se connecter</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          id="email"
          placeholder="Adresse mail"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};
export default SignIn;
