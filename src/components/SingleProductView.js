import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/ProductListings.css";
import { Navbar } from ".";

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
      <Navbar />
      {singleProduct && singleProduct.id ? (
        <div className="listing">
          <img className="listing-photo" alt="?"></img>
          <span className="listingtext">{singleProduct.title}</span>
          <span className="listingtext">{singleProduct.price}</span>
          <span className="listingtext">{singleProduct.description}</span>
          
        </div>
      ) : (
        "no data to show"
      )}
    </div>
  );
};

export default SingleProductView;
