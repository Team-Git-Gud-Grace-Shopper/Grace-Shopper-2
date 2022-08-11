import React from "react";

import '../style/ProductListings.css';

const ProductListings = () => {
    return (
        <div className="listing">
            <img className='listing-photo' alt="?"></img>
            <span>Product name</span>
            <span>$Price</span>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
            <button>Add to cart</button>
        </div>
    )
}

export default ProductListings;