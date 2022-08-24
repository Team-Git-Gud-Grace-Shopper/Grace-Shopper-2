import session from "express-session";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { emptyCart, getCart, getSingleProduct, removeItemFromCart } from "../axios-services";
import "../style/Cart.css";

const Cart = ({authenticated, currentUser, cartList, setCartList}) => {

  const handleRemoveItem = async (event) => {
    const arr = cartList;
    const productId = event.target.id;
    const itemToRemove = getSingleProduct(event.target.id);
    arr.splice(itemToRemove, 1)
    sessionStorage.setItem('cart', JSON.stringify(arr));
    setCartList(JSON.parse(sessionStorage.cart));
    if (authenticated){
      await removeItemFromCart(productId, currentUser.id);
    }
  }

  const handleCheckout = async (event) => {
    const arr = cartList
    const itemToRemove = getSingleProduct(event.target.id);
    arr.splice(itemToRemove)
    sessionStorage.removeItem('cart', JSON.stringify(arr));
    if (authenticated){
      await emptyCart();
    }
  }

  return (
    <Fragment> 
    <div className="cartProducts"> 
      {cartList.length ? 
      cartList.map((item) => (
        <div className="listing" key={item.id}>
          <img className="listing-photo" alt="?"></img>
          <span className="listingtitle">{item.title}</span>
          <span className="listingprice">{item.price}</span>
          <button className="single-product-btn" id={item.id} onClick={handleRemoveItem}>Remove from cart</button>
        </div>
      )) : <h3>Your cart is empty! Get back to shopping!</h3>}
    </div>
    <div className="cart-total">
          <button className="checkout-btn" onClick={handleCheckout}><NavLink to="/checkout" activeClassName="checkout-link">PROCEED TO CHECKOUT</NavLink></button>
      </div>
    </Fragment> 
  );
};

export default Cart;