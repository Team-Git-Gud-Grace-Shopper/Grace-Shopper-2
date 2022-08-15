import React from "react";

import '../style/ProductListings.css';

const ProductListings = ({productList, singleProduct, setSingleProduct}) => {
console.log(productList)
    
    return (
        <div>
            {productList.map(product => (
                <div className="listing" key={product.id}>
                    <img className='listing-photo' alt="?"></img>
                    <span className="listingtext">{product.title}</span>
                    <span className="listingtext">{product.price}</span>
                    <span className="listingtext">{product.description}</span>
                    <button>Add to cart</button>
                    <button>View product details</button>
                </div>
            ))}
        </div>
    )
}

export default ProductListings;