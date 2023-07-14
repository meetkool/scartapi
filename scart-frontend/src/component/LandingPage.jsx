import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';


function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://scart-xebia.onrender.com/products");
      setProducts(response.data.products);
    };
    fetchProducts();
  }, []);

  return (
<div className="App">
  <h1>Welcome to Our Store</h1>
  <h2>Products</h2>
  <div className="products-grid">
  {products.map((product) => (
    <div key={product._id} className="product-card" style={{backgroundColor: product.color}}>
  <div className="product-image-container">
    <img src={product.image} alt={product.title} className="product-image" />
    <div className="product-discount">{product.discount}%</div>
  </div>
  <h3 className="product-title">{product.title}</h3>
  <p className="product-brand">Brand: {product.brand}</p>
  <p className="product-price">Price: {product.price}</p>
  <p className="product-color">Color: {product.color}</p>
</div>

  ))}
  </div>
</div>

  );
}

export default LandingPage;
