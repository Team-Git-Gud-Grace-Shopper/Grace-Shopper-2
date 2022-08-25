import React from "react";
import { createNewProduct, getProducts } from "../axios-services";
import "../style/CreateNew.css"

const CreateNew = ({setProductList}) => {

    const handleCreateNew = async (event) => {
        const newProduct = {
            title: document.getElementById('new-title').value,
            description: document.getElementById('new-description').value,
            price: document.getElementById('new-price').value,
            image: document.getElementById('new-image').value
        }
        await createNewProduct(newProduct);
        getProducts()
        .then((result) => setProductList(result.data));
    }
    return (
        <div className="create-product-form">
            <span>New Product:</span>
            <div>
                <span>Title:</span>
                <input id="new-title"></input>
            </div>
            <div>
                <span>Description:</span>
                <input id="new-description"></input>
            </div>
            <div>
                <span>Price:</span>
                <input id="new-price"></input>
            </div>
            <div>
                <span>Image url:</span>
                <input id="new-image"></input>
            </div>
            <button className="product-btn" onClick={handleCreateNew}>Submit</button>
        </div>
    );
};

export default CreateNew;