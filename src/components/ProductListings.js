import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addItemToCart, getSingleProduct } from "../axios-services";
import "../style/ProductListings.css";

const ProductListings = ({ productList, cartList, setCartList }) => {
  const [count, setCount] = useState(0)
  const history = useHistory();

  const handleAddItem = async (event) => {
    event.preventDefault();
    const arr = cartList;
    console.log(arr)
    const itemToAdd = await getSingleProduct(event.target.id);
    arr.push(itemToAdd);
    sessionStorage.setItem('cart', JSON.stringify(arr));
    setCartList(JSON.parse(sessionStorage.cart));

  }

  // try like above but try to add quantity, maybe have to write PATCH request to update quantity

    const inc=()=>{
      setCount(count+1);
    }
    const dec=()=>{
      if(count>0)
      setCount(count-1);
    }

  return (
    <div>
      {productList.map((product) => (
        <div className="listing" key={product.id}>
          <img className="listing-photo" alt="?"></img>
          <span className="listingtext">{product.title}</span>
          <span className="listingtext">{product.price}</span>
          <span className="listingtext">{product.description}</span>
          <button id={product.id} onClick={handleAddItem}>Add to cart</button>
          <button onClick={inc} >+</button>
            {count}
          <button onClick={dec}>-</button>
          <button onClick={() => history.push(`/products/${product.id}`)}>
            View product details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductListings;