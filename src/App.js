//* Packages import
//?  React Router import
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//? States react import
import { useEffect, useState } from "react";
//? Axios import
import axios from "axios";

//* Pages import
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import SignUp from "./Pages/SignUp";

//* Components import
import "./App.css";
import Header from "./Components/Header";

function App() {
  //? States declaration
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home data={data} />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route path="/SignIn"></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
