import React, { Fragment, useEffect, useState } from "react";
import { getCart } from "../axios-services";
import "../style/ProductListings.css";

// <<<<<<< HEAD
// const Cart = () => {
//   const [cartList, setCartList] = useState([]);
  

//   useEffect(() => {
//     getCart()
//     .then((result) => setCartList(result.data))
//   }, [])


// console.log("this is cartList items", cartList.items)

//   return (
//     <Fragment>
//       {cartList.items ? 
//       cartList.items.map((item, id) => (
//         <div className="listing" key={id}>
//           <img className="listing-photo" alt="?"></img>
//           <span className="listingtext">{item.item.title}</span>
//           <span className="listingtext">{item.item.price}</span>
//           <span className="listingtext">{item.item.description}</span>
// =======
const Cart = ({authenticated, currentUser, cartList}) => {

//   const handleTest = async (event) => {
//     event.preventDefault();
//     if (authenticated){
//       await getCart(currentUser.id)
//       .then((result) => console.log(result))
//     }
//   }
// console.log(cartList)
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
