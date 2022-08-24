import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { addItemToCart, getSingleProduct } from "../axios-services";
import "../style/ProductListings.css";

const ProductListings = ({ productList, cartList, setCartList, authenticated, currentUser }) => {
  const [count, setCount] = useState(0);
  const history = useHistory();

  const handleAddItem = async (event) => {
    event.preventDefault();
    const productId = event.target.id;
    const arr = cartList;
    const itemToAdd = await getSingleProduct(event.target.id);
    arr.push(itemToAdd);
    sessionStorage.setItem('cart', JSON.stringify(arr));
    setCartList(JSON.parse(sessionStorage.cart));
    if (authenticated){
      console.log("here's the event target: " + productId)
      await addItemToCart(productId, currentUser.id);
    }
  }

  const inc=()=>{
    setCount(count+1);
  }
  const dec=()=>{
    if(count>0)
    setCount(count-1);
  }
 
  

  return (
    <div className="allProducts">
      {productList.map((product) => (
        <div className="listing" key={product.id}>
          <img className="listing-photo" alt="?"></img>
          <span className="listingtitle">{product.title}</span>
          <span className="listingprice">{product.price}</span>
          <p>Select Quantity:</p>
          <button onClick={inc} >+</button>
            {count}
          <button onClick={dec}>-</button>
          <button className="product-btn"id={product.id} onClick={handleAddItem}>Add to cart</button>
          <button className="product-btn" onClick={() => history.push(`/products/${product.id}`)}>
            View product details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductListings;