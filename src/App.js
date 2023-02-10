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
import SignIn from "./Pages/SignIn";
import Modal from "./Components/Modal";

//* Components import
import "./App.css";
import Header from "./Components/Header";

function App() {
  //? States declaration
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [initializeModal, setInitializeModal] = useState("");
  const [searchParameters, setSearchParameters] = useState({ title: "robe" });

  console.log(searchParameters);
  let searchRoute = "https://lereacteur-vinted-api.herokuapp.com/offers";
  if (searchParameters) {
    searchRoute = searchRoute + "?";
    searchParameters.title &&
      (searchRoute = searchRoute + `title=${searchParameters.title}`);
    searchParameters.pricemin &&
      (searchRoute += `priceMin=${searchParameters.primcemin}`);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(searchRoute);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchParameters]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="app">
      <Router>
        <Header
          token={token}
          setToken={setToken}
          modal={modalVisible}
          setModal={setModalVisible}
          initializeModal={initializeModal}
          setInitializeModal={setInitializeModal}
          searchParameters={searchParameters}
          setSearchParameters={setSearchParameters}
        />
        <Routes>
          <Route path="/" element={<Home data={data} />}></Route>
          <Route path="/offer/:id" element={<Offer />}></Route>
          <Route
            path="/SignIn"
            element={<SignIn token={token} setToken={setToken} />}
          ></Route>
          <Route
            path="/SignUp"
            element={<SignUp token={token} setToken={setToken} />}
          ></Route>
        </Routes>
        {modalVisible && (
          <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            initializeModal={initializeModal}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
