import session from "express-session";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { addItemToCart, emptyCart, getCart, getSingleProduct, removeItemFromCart } from "../axios-services";
import "../style/Cart.css";

const Cart = ({authenticated, currentUser, cartList, setCartList}) => {

  const handleRemoveItem = async (event) => {
    function setUp(arr){
      let newArr = [];
      for (let i=0; i<arr.length; i++){
        let item = JSON.stringify(arr[i]);
        newArr.push(item);
      }
      return newArr
    }
    const arr = setUp(cartList);
    const itemToRemove = await getSingleProduct(event.target.id);
    const itemString = JSON.stringify(itemToRemove);
    arr.splice(arr.indexOf(itemString), 1);
    function rebuild(arr){
      let newArr = [];
      for (let i=0; i<arr.length; i++){
        let item = JSON.parse(arr[i]);
        newArr.push(item);
      }
      return newArr;
    }
    const newArr = rebuild(arr);
    sessionStorage.setItem('cart', JSON.stringify(newArr));
    setCartList(JSON.parse(sessionStorage.cart));
    if (authenticated){
      await emptyCart();
      for (let i=0; i<newArr.length; i++){
        addItemToCart(newArr[i].id, currentUser.id);
      }
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

  const noDuplicates = (arr) => {
    let checkArr = [];
    let returnArr = [];
    for (let i = 0; i < arr.length; i++){
      if (!checkArr.includes(arr[i].id)){
        checkArr.push(arr[i].id);
        returnArr.push(arr[i]);
      }
    }
    return returnArr;
  }

  const renderQuantity = (id) => {
    let count = 0;
    for (let i = 0; i < cartList.length; i++){
      if (cartList[i].id === id){
        count+=1;
      }
    }
    return count;
  }

  const mapArr = noDuplicates(cartList);
  
  return (
    <Fragment> 
    <div className="cartProducts"> 
      {cartList.length ? 
      mapArr.map((item) => (
        <div className="listing" key={item.id}>
          <img className="listing-photo" src={item.image} alt="?"></img>
          <span className="listingtitle">{item.title}</span>
          <span className="listingprice">{item.price}</span>
          <span>Quantity: {renderQuantity(item.id)}</span>
          <button className="single-product-btn" id={item.id} onClick={handleRemoveItem}>Remove from cart</button>
        </div>
      )) : <h3>Your cart is empty! Get back to shopping!</h3>}
    </div>
    <div className="cart-total">
          <button className="checkout-btn" onClick={handleCheckout}><Link to="/checkout" activeClassName="checkout-link">PROCEED TO CHECKOUT</Link></button>
      </div>
    </Fragment> 
  );
};

export default Cart;