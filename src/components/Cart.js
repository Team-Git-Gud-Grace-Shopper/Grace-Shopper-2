import session from "express-session";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getCart, getSingleProduct } from "../axios-services";
import "../style/Cart.css";

const Cart = ({authenticated, currentUser, cartList, setCartList}) => {

  const handleRemoveItem = async (event) => {
    const arr = cartList;
    const itemToRemove = getSingleProduct(event.target.id);
    arr.splice(itemToRemove, 1)
    sessionStorage.setItem('cart', JSON.stringify(arr));
    setCartList(JSON.parse(sessionStorage.cart));
  }

  const handleCheckout = async (event) => {
    const arr = cartList
    const itemToRemove = getSingleProduct(event.target.id);
    arr.splice(itemToRemove)
    sessionStorage.removeItem('cart', JSON.stringify(arr));
    
  }

  return (
    <Fragment>
      {cartList.length ? 
      cartList.map((item) => (
        <div className="listing" key={item.id}>
          <img className="listing-photo" alt="?"></img>
          <span className="listingtext">{item.title}</span>
          <span className="listingtext">{item.price}</span>
          <span className="listingtext">{item.description}</span>
          <button onClick={handleRemoveItem}>Remove from cart</button>
        </div>
      )) : <h3>Your cart is empty! Get back to shopping!</h3>}
      <button className="checkoutbtn" onClick={handleCheckout}><Link to="/checkout">PROCEED TO CHECKOUT</Link></button>
    </Fragment>
  );
};

export default Cart;