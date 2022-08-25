import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/SingleProduct.css";
import { getProducts, updateProduct } from "../axios-services";

const SingleProductView = ({ productList, admin, setProductList }) => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});

  useEffect(() => {
    const findSingleProduct = () => {
      let currentSingleProduct = productList.find((product) => {
        // eslint-disable-next-line
        return product.id == id;
      });
      setSingleProduct(currentSingleProduct);
    };
    findSingleProduct();
  }, [productList, id]);

  const handleChanges = async (event) => {
    const productToUpdate = {
      id: event.target.id,
      title: document.getElementById('title-update').value,
      description: document.getElementById('description-update').value,
      price: document.getElementById('price-update').value,
      image: document.getElementById('image-update').value
    };
    console.log(productToUpdate)
    await updateProduct(productToUpdate);
    getProducts()
    .then((result) => setProductList(result.data));
  }

  if (admin){
    return (
      <div>
        {singleProduct && singleProduct.id ? (
          <div className="single-product">
            <img className="image" src={singleProduct.image} alt="?"></img>
            <div className="single-product-info"> 
              <span>Update Product Form</span>
              <div>
                <span>Change Image URL:</span>
                <input id="image-update" defaultValue={singleProduct.image}></input>
              </div>
              <div>
                <span>Change title:</span>
                <input id="title-update" defaultValue={singleProduct.title}></input>
              </div>
              <div>
                <span>Change description:</span>
                <input id="description-update" defaultValue={singleProduct.description}></input>
              </div>
              <div>
                <span>Change price:</span>
                <input id="price-update" className="single-product-price" defaultValue={singleProduct.price}></input>
              </div>
              <button id={singleProduct.id} onClick={handleChanges}>Submit Changes</button>
            </div>  
          </div>
        ) : (
          "no data to show"
        )}
      </div>
    );
  }
  else {
    return (
      <div>
        {singleProduct && singleProduct.id ? (
          <div className="single-product">
            <img className="image" src={singleProduct.image} alt="?"></img>
            <div className="single-product-info">  
              <h1>{singleProduct.title}</h1>
              <h2>{singleProduct.description}</h2>
              <h3 className="single-product-price">${singleProduct.price}</h3>
            </div>  
          </div>
        ) : (
          "no data to show"
        )}
      </div>
    );
  }
};

export default SingleProductView;