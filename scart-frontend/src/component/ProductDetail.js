import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate

function ProductDetail() {
    const { id } = useParams(); 
    const navigate = useNavigate(); // Add this line
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]); 
    
    async function fetchProduct() {
        const { data } = await axios.get(`https://scart-xebia.onrender.com/products/${id}`); 
        setProduct(data.product);
    };
    
    // Add this function
    function handleGoBack() {
        navigate(-1); // Use navigate with -1 to go back
    }

    return (
        <div>
            {/* Add this button */}
            <button onClick={handleGoBack}>Go Back</button>

            {product && (
                <div>
                    <img src={product.image} alt={product.title} />
                    <h2>{product.title}</h2>
                    <h3>Brand: {product.brand}</h3>
                    <p>Price: {product.price}</p>
                    <p>Color: {product.color}</p>
                    <h4>Discount: {product.discount}%</h4>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;