import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/SingleProduct.css";

const SingleProductView = ({ productList }) => {
  const { id } = useParams();

  const [singleProduct, setSingleProduct] = useState({});

  useEffect(() => {
    const findSingleProduct = () => {
      let currentSingleProduct = productList.find((product) => {
        return product.id == id;
      });

      setSingleProduct(currentSingleProduct);
    };
    findSingleProduct();
  }, [productList, id]);

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
};

export default SingleProductView;
