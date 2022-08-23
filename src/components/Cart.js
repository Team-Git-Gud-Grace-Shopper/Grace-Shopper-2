import React, { Fragment, useEffect, useState } from "react";
import { getCart, getSingleProduct } from "../axios-services";
import "../style/ProductListings.css";


const Cart = ({authenticated, currentUser, cartList, setCartList}) => {

  const handleRemoveItem = async (event) => {
    const arr = cartList;
    const itemToRemove = getSingleProduct(event.target.id);
    arr.splice(itemToRemove, 1)
    sessionStorage.setItem('cart', JSON.stringify(arr));
    setCartList(JSON.parse(sessionStorage.cart));
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
      )) : <h1 style={{textAlign: "center", marginTop: "4em"}}>Your cart is empty! Get back to shopping!</h1>}
        
    </Fragment>
  );
};

export default Cart;
