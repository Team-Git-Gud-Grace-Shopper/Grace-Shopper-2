import React from "react";
import { useHistory } from "react-router-dom";
import { addItemToCart, getSingleProduct } from "../axios-services";
import "../style/ProductListings.css";

const ProductListings = ({ productList, cartList, setCartList }) => {
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

  return (
    <div>
      {productList.map((product) => (
        <div className="listing" key={product.id}>
          <img className="listing-photo" alt="?"></img>
          <span className="listingtext">{product.title}</span>
          <span className="listingtext">{product.price}</span>
          <span className="listingtext">{product.description}</span>
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