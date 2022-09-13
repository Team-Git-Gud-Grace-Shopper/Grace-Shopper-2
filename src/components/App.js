import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import { checkCurrentUser, getCart, getProducts } from "../axios-services";
import "../style/App.css";
import {
  Cart,
  ProductListings,
  Navbar,
  Login,
  SingleProductView,
  Checkout,
  CreateNew,
} from ".";

const App = () => {
  const [productList, setProductList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    getProducts().then((result) => setProductList(result.data));
  }, [setProductList]);

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
  }, []);

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

  useEffect(() => {
    if (authenticated && currentUser.admin === true) {
      setAdmin(true);
    }
  }, [authenticated, currentUser]);

  return (
    <BrowserRouter>
      <Navbar
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        setCurrentUser={setCurrentUser}
        cartList={cartList}
        setCartList={setCartList}
        productList={productList}
        setAdmin={setAdmin}
      />
      <Switch>
        <Route exact path="/">
          <ProductListings
            productList={productList}
            setProductList={setProductList}
            cartList={cartList}
            setCartList={setCartList}
            authenticated={authenticated}
            currentUser={currentUser}
            admin={admin}
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
          <SingleProductView
            productList={productList}
            setProductList={setProductList}
            admin={admin}
          />
        </Route>
        <Route path="/createnew">
          <CreateNew setProductList={setProductList}></CreateNew>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
