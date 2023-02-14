//* Packages import
//?  React Router import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//? States react import
import { useEffect, useState } from "react";

//? Axios import
import axios from "axios";

//? Cookies import
import Cookies from "js-cookie";

//* Pages import
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Modal from "./Components/Modal";
import Publish from "./Pages/Publish";
import Payment from "./Pages/Payment";

//* Components import
import "./App.css";
import Header from "./Components/Header";

function App() {

  //? States declaration
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);;

  const [modalVisible, setModalVisible] = useState(false);
  const [initializeModal, setInitializeModal] = useState("");
  const [searchParameters, setSearchParameters] = useState({ sort: true });

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 5 })
    } else {
      setToken(null);
      Cookies.remove("token-vinted")
    }
  }
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
          handleToken={handleToken}
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
            path="/Publish" element={<Publish token={token} setModalVisible={setModalVisible} modalVisible={modalVisible} setInitializeModal={setInitializeModal} />}></Route>
          <Route path="/Payment" element={<Payment />}></Route>
        </Routes>
        {modalVisible && (
          <Modal
            handleToken={handleToken}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            initializeModal={initializeModal}
            setInitializeModal={setInitializeModal}
            token={token}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
