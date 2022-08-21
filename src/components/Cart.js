import React, { Fragment, useEffect, useState } from "react";
import { getCart } from "../axios-services";
import "../style/ProductListings.css";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  

  useEffect(() => {
    getCart()
    .then((result) => setCartList(result.data))
  }, [])


console.log("this is cartList items", cartList.items)

  return (
    <Fragment>
      <h3>{cartList.items ? 
      cartList.items.map((item, id) => (
        <div className="listing" key={id}>
          <img className="listing-photo" alt="?"></img>
          <span className="listingtext">{item.item.title}</span>
          <span className="listingtext">{item.item.price}</span>
          <span className="listingtext">{item.item.description}</span>
          <button>Remove from cart</button>
        </div>
      )) : "There is nothing for you here"}</h3>
        
          
        
    </Fragment>
  );
};

export default Cart;
