import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  checkCurrentUser,
  getAPIHealth,
  getCart,
  getProducts,
} from "../axios-services";
import "../style/App.css";
import {
  Cart,
  ProductListings,
  Navbar,
  Login,
  SingleProductView,
  Checkout,
} from ".";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [productList, setProductList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
    getAPIStatus();
  }, []);

  useEffect(() => {
    getProducts().then((result) => setProductList(result.data));
  }, []);

  useEffect(() => {
    if (sessionStorage.username) {
      checkCurrentUser(sessionStorage.username).then((result) => {
        setCurrentUser(result.data);
      });
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.username) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  useEffect(() => {
    if (authenticated) {
      getCart(currentUser.id).then((result) => {
        setCartList(result.data);
        sessionStorage.setItem("cart", JSON.stringify(result.data));
      });
    } else if (sessionStorage.cart) {
      setCartList(JSON.parse(sessionStorage.cart));
    }
  }, [authenticated, currentUser]);

  return (
    <BrowserRouter>
      <Navbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        setCurrentUser={setCurrentUser}
        setCartList={setCartList}
        productList={productList}
      />
      <Switch>
        <Route exact path="/">
          <div className="app-container">
            {authenticated ? (
              <p className="home-title">
                Welcome to camelCases, {currentUser.username}!
              </p>
            ) : (
              <p className="home-title">Welcome to camelCases!</p>
            )}
          </div>
          <ProductListings
            productList={productList}
            cartList={cartList}
            setCartList={setCartList}
            authenticated={authenticated}
            currentUser={currentUser}
          />
        </Route>
        <Route path="/cart">
          <Cart
            authenticated={authenticated}
            currentUser={currentUser}
            cartList={cartList}
            setCartList={setCartList}
          />
        </Route>
        <Route path="/login">
          <Login
            setAuthenticated={setAuthenticated}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setCartList={setCartList}
          />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/products/:id">
          <SingleProductView productList={productList} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
