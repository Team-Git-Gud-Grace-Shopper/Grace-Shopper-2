import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCart } from "../axios-services";

const Cart = ({authenticated, currentUser, cartList}) => {

  return (
    <Fragment>
      {cartList.length ? 
      cartList.map((item) => (
        <div className="listing" key={item.id}>
          <img className="listing-photo" alt="?"></img>
          <span className="listingtext">{item.title}</span>
          <span className="listingtext">{item.price}</span>
          <span className="listingtext">{item.description}</span>
          <button>Remove from cart</button>
        </div>
      )) : <h3>Your cart is empty! Get back to shopping!</h3>}
    </Fragment>
  );
};

export default Cart;
