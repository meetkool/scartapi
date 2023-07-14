import React, { useState, useEffect } from "react";
import axios from "axios";

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
<div>
  <h1>Welcome to Our Store</h1>
  <h2>Products</h2>
  {products.map((product) => (
    <div key={product._id} style={{backgroundColor: product.color}}>
      <h3>{product.title}</h3>
      <p>Brand: {product.brand}</p>
      <p>Price: {product.price}</p>
      {/* <p>Color: {product.color}</p> */}
      <img src={product.image} alt={product.title} />
      <p>Discount: {product.discount}</p>
      <br />
    </div>
  ))}
</div>

  );
}

export default LandingPage;
