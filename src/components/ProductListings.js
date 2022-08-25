import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { addItemToCart, getSingleProduct, deleteProduct, getProducts } from "../axios-services";
import "../style/ProductListings.css";

const ProductListings = ({ productList, setProductList, cartList, setCartList, authenticated, currentUser, admin }) => {
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
        await addItemToCart(productId, currentUser.id);
      }
    }
  }
 
  const handleRemoveProduct = async (event) => {
    const id = event.target.id;
    await deleteProduct(id);
    getProducts()
    .then((result) => setProductList(result.data));
  }

  return (
    <div className="allProducts">
      {productList.map((product) => (
        <div className="listing" key={product.id}>
          <img className="listing-photo" src={product.image} alt="?"></img>
          <p className="listingtitle">{product.title}</p>
          <span className="listingprice">${product.price}</span>
          <input type="number" min='0' defaultValue='0'></input>
          <button className="product-btn" id={product.id} onClick={handleAddItem}>Add to cart</button>
          {admin?
            <Fragment>
              <button className="product-btn" onClick={() => history.push(`/products/${product.id}`)}>Edit/view product details</button>
              <button id={product.id} onClick={handleRemoveProduct}>Remove product</button>
            </Fragment>:
            <button className="product-btn" onClick={() => history.push(`/products/${product.id}`)}>View product details</button>
          }
        </div>
      ))}
    </div>
  );
};

export default ProductListings;