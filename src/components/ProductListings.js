import React from "react";

import '../style/ProductListings.css';

const ProductListings = ({productList}) => {
console.log(productList)
    return (
        <div>
            {productList.map(product => (
                <div className="listing" key={product.id}>
                    <img className='listing-photo' alt="?"></img>
                    <span>{product.title}</span>
                    <span>{product.price}</span>
                    <span>{product.description}</span>
                    <button>Add to cart</button>
                </div>
            ))}
        </div>
    )
}

export default ProductListings;