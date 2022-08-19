import React from "react";
import { useHistory } from "react-router-dom";
import { addItemToCart, getSingleProduct } from "../axios-services";
import "../style/ProductListings.css";

const ProductListings = ({ productList }) => {
  const history = useHistory();

  const handleAddItem = async (event) => {
    event.preventDefault();
    console.log(event.target.id)
    const item = await getSingleProduct(event.target.id);
    console.log(item)
    console.log(item.data)
    addItemToCart(item.data, 1);
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