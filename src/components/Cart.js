import session from "express-session";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { addItemToCart, emptyCart, getCart, getSingleProduct, removeItemFromCart } from "../axios-services";
import "../style/Cart.css";

const Cart = ({authenticated, currentUser, cartList, setCartList}) => {

  const handleRemoveAll = async (event) => {
    const id = JSON.parse(event.target.id);
    const arr = cartList.filter(item => item.id !== id)
    sessionStorage.setItem('cart', JSON.stringify(arr));
    setCartList(JSON.parse(sessionStorage.cart));
    if (authenticated){
      await emptyCart();
      for (let i=0; i<arr.length; i++){
        addItemToCart(arr[i].id, currentUser.id);
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

  const handleChange = async (event) => {
    const startValue = renderQuantity(JSON.parse(event.target.id));
    console.log(startValue)
    if (event.target.value > startValue){
      let arr = cartList;
      let id = event.target.id;
      let itemToAdd = await getSingleProduct(id);
      arr.push(itemToAdd);
      sessionStorage.setItem('cart', JSON.stringify(arr));
      setCartList(JSON.parse(sessionStorage.cart));
      if (authenticated){
        console.log(currentUser.id)
        console.log(id)
        addItemToCart(id, currentUser.id);
      }
    }
    else if (event.target.value < startValue){
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

  const renderTotal = () => {
    let runningTotal = 0;
    if (cartList.length){
      for (let i = 0; i < cartList.length; i++){
        const price = JSON.parse(cartList[i].price);
        runningTotal+=price;
      }
    }
    return runningTotal;
  };

  const mapArr = noDuplicates(cartList);
  
  return (
    <Fragment> 
    <div className="cartProducts"> 
      {cartList.length ? 
      mapArr.map((item) => (
        <div className="cart-listing" key={item.id}>
          <img className="listing-photo" src={item.image} alt="?"></img>
          <span className="listingtitle">{item.title}</span>
          <span className="listingprice">{item.price}</span>
          <input id={item.id} type='number' min='0' defaultValue={renderQuantity(item.id)} onChange={handleChange}></input>
          <button className="single-product-btn" id={item.id} onClick={handleRemoveAll}>Remove ALL from cart</button>
        </div>
      )) : <h3>Your cart is empty! Get back to shopping!</h3>}
    </div>
    {cartList.length?
      <div className="cart-total">
        <div className="cart-total-number">Total Cost: {renderTotal().toFixed(2)}</div>
        <button className="checkout-btn" onClick={handleCheckout}><Link to="/checkout" activeClassName="checkout-link">PROCEED TO CHECKOUT</Link></button>
      </div>:
      null}
    </Fragment> 
  );
};

export default Cart;