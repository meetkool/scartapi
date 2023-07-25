import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div key={product._id} className="product-card" style={{ backgroundColor: product.color }}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-discount">{product.discount}%</div>
      </div>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-brand">Brand: {product.brand}</p>
      <p className="product-price">Price: {product.price}</p>
      <p className="product-color">Color: {product.color}</p>
    </div>
  );
};

export default ProductCard;
