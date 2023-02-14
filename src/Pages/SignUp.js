//? States react import
import { useState } from "react";



//? Axios import
import axios from "axios";

const SignUp = ({ handleToken, setModalVisible, modalVisible, initializeModal, setInitializeModal }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newsletter, setNewsletter] = useState(false);


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
      // Cookies.set("token", loginInformation.data.token, { expires: 1 });
      handleToken(loginInformation.data.token);
      setModalVisible(!modalVisible)
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="signup">
      <form className="signup__form column" onSubmit={onSubmit}>
        <h2 className="signup__title" >S'inscrire</h2>
        <input className="input-txt"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Nom d'utilisateur"
        />
        <input className="input-txt"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input className="input-txt"
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
        <button className="btn btn--dark" type="submit">S'incrire</button>

        <div className="highlight-txt"
          onClick={() => {
            setInitializeModal("SignIn");
          }}> Tu as déjà un compte ? Connecte-toi !</div>
      </form>
    </div>
  );
};
export default SignUp;
