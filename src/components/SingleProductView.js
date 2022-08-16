import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

const SingleProductView = ({productList}) => {
    console.log("this is product list in single product view:", productList)
    const { id } = useParams();
    console.log("this is the id we want to see:", id)

    const [singleProduct, setSingleProduct] = useState({});

    useEffect(() => {
        const findSingleProduct = () => {
            let currentSingleProduct = productList.find((product) => {
                return product.id === id;
            });
            console.log("This is the found product:", currentSingleProduct)
            setSingleProduct(currentSingleProduct)
        }
        findSingleProduct();
    }, [])

    return (
        <div>
            
        </div>

    )
}

export default SingleProductView;