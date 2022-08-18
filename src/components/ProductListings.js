import React from "react";
import { useHistory } from "react-router-dom";
import '../style/ProductListings.css';

const ProductListings = ({productList}) => {
// console.log(productList)
    const history = useHistory();
    return (
        <div>
            {productList.map(product => (
                <div className="listing" key={product.id}>
                    <img className='listing-photo' alt="?"></img>
                    <span className="listingtext">{product.title}</span>
                    <button>Add to cart</button>
                    <button onClick={() => history.push(`/products/${product.id}`)}>View product details</button>
                </div>
            ))}
        </div>
    )
}

export default ProductListings;