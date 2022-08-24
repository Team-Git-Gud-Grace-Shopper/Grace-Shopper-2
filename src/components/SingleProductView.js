import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/SingleProduct.css";

const SingleProductView = ({ productList }) => {
  // console.log("this is product list in single product view:", productList)
  const { id } = useParams();
  // console.log("this is the id we want to see:", id)

  const [singleProduct, setSingleProduct] = useState({});

  useEffect(() => {
    const findSingleProduct = () => {
      let currentSingleProduct = productList.find((product) => {
        return product.id == id;
      });
      // console.log("This is the found product:", currentSingleProduct)
      setSingleProduct(currentSingleProduct);
    };
    findSingleProduct();
    // console.log("this is single product", singleProduct)
  }, [productList, id]);

  return (
    <div>
      
      {singleProduct && singleProduct.id ? (
        <div className="single-product">
          <img className="image" src={singleProduct.image} alt="?"></img>
          <h1>{singleProduct.title}</h1>
          <h2>{singleProduct.description}</h2>
          <h3>{singleProduct.price}</h3>
          
        </div>
      ) : (
        "no data to show"
      )}
    </div>
  );
};

export default SingleProductView;
