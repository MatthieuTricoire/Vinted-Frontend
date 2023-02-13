//* Packages import
//?  React Router import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Publish from "./Pages/Publish";

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
  const [searchParameters, setSearchParameters] = useState({ sort: true });

  let searchRoute = "https://lereacteur-vinted-api.herokuapp.com/offers";

//! Partie de code à refacto, /offers/&&&priceMin=10 fonctionne. Pas besoin de se prendr la tête avec une construction dymanique des queries.
  if (searchParameters) {
    searchRoute = searchRoute + "?";
    let firstFilter = true;
    if (searchParameters.title) {
      if (firstFilter) {
        searchRoute += `title=${searchParameters.title}`;
        firstFilter = false;
      } else {
        searchRoute += `&title=${searchParameters.title}`;
      }
    }
    if (searchParameters.pricemin) {
      if (firstFilter) {
        searchRoute += `priceMin=${searchParameters.pricemin}`;
        firstFilter = false;
      } else {
        searchRoute += `&priceMin=${searchParameters.pricemin}`;
      }
    }
    if (searchParameters.pricemax) {
      if (firstFilter) {
        searchRoute += `priceMax=${searchParameters.pricemax}`;
        firstFilter = false;
      } else {
        searchRoute += `&priceMax=${searchParameters.pricemax}`;
      }
    }
    if (searchParameters.sort) {
      if (firstFilter) {
        searchRoute += `sort=price-asc`;
        firstFilter = false;
      } else {
        searchRoute += `&sort=price-asc`;
      }
    } else {
      if (firstFilter) {
        searchRoute += `sort=price-desc`;
        firstFilter = false;
      } else {
        searchRoute += `&sort=price-desc`;
      }
    }
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
            element={<SignUp token={token} setModalVisible={setModalVisible} modalVisible={modalVisible} setToken={setToken} />}
          ></Route>
      <Route
      path="/Publish" element={<Publish token={token}/>}></Route>
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
