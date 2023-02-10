//? States react import
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//? Cookies import
import Cookies from "js-cookie";

//? Axios import
import axios from "axios";

const SignUp = ({ setToken }) => {
  //   const emailRef = useRef();
  //   const passwordRef = useRef();
  //   const usernameRef = useRef();
  //   const newsLetterRef = useRef(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginInformation = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      Cookies.set("token", loginInformation.data.token, { expires: 1 });
      setToken(loginInformation.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="sign-up">
      <form className="form column" onSubmit={onSubmit}>
        <h2>S'inscrire</h2>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Nom d'utilisateur"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe "
        />
        <div className="checkbox row">
          <input
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
            value={newsletter}
            type="checkbox"
            name="newsletter"
            id="newsetter"
          />
          <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
        </div>
        <p className="conditions">
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans
        </p>
        <button type="submit">S'incrire</button>
        <Link to="/SignIn"> Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </div>
  );
};
export default SignUp;
