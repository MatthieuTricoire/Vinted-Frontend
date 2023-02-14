//? States react import
import { useState } from "react";

//? Axios import
import axios from "axios";

const SignIn = ({ handleToken, modalVisible, setModalVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



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
      handleToken(loginInformation.data.token);
      setModalVisible(!modalVisible)

    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="signin">
      <form className="signin__form column" onSubmit={onSubtmit} >
        <h2 className="signin__title" >Se connecter</h2>
        <input className="input-txt"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          name="email"
          id="email"
          placeholder="Adresse mail"
        />
        <input className="input-txt"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
        />
        <button className="btn btn--dark" type="submit">Se connecter</button>
      </form>
    </div>
  );
};
export default SignIn;
