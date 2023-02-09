//? States react import
import { useRef } from "react";
import { Link } from "react-router-dom";

//? Axios import
import axios from "axios";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const newsLetterRef = useRef(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    email = emailRef.current.value;

    try {
      const token = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup"
      );
      console.log(token);
      console.log(emailRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-in">
      <h2>S'inscrire</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Nom d'utilisateur" />
        <input
          ref={emailRef}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
        />
        <input
          ref={usernameRef}
          type="checkbox"
          name="newsletter"
          id="newsetter"
        />
        <label ref={newsLetterRef} htmlFor="newsletter">
          S'inscrire à notre newsletter
        </label>
        <p className="conditions">
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans
        </p>
        <button type="submit">S'incrire</button>
      </form>
      <Link to="/SignIn"> Tu as déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};
export default SignUp;
