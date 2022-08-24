import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { addItemToCart, getSingleProduct } from "../axios-services";
import "../style/ProductListings.css";

const ProductListings = ({ productList, cartList, setCartList, authenticated, currentUser }) => {
  const history = useHistory();

  const handleAddItem = async (event) => {
    event.preventDefault();
    const quantity = event.target.previousSibling.value;
    const productId = event.target.id;
    const arr = cartList;
    const itemToAdd = await getSingleProduct(event.target.id);
    for (let i = 0; i < quantity; i++){
      arr.push(itemToAdd);
      sessionStorage.setItem('cart', JSON.stringify(arr));
      setCartList(JSON.parse(sessionStorage.cart));
      if (authenticated){
        console.log("here's the event target: " + productId)
        await addItemToCart(productId, currentUser.id);
      }
    }
  }
 
  return (
    <div>
      {productList.map((product) => (
        <div className="listing" key={product.id}>
          <img className="listing-photo" src={product.image} alt="?"></img>
          <span className="listingtext">{product.title}</span>
          <span className="listingtext">{product.price}</span>
          <span className="listingtext">{product.description}</span>
          <input type="number" min='0' defaultValue='0'></input>
          <button id={product.id} onClick={handleAddItem}>Add to cart</button>
          <button onClick={() => history.push(`/products/${product.id}`)}>
            View product details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductListings;