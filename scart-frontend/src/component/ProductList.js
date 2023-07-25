import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="products-grid">
      {products.map((product) => <ProductCard product={product} />)}
    </div>
  );
};

export default ProductList;
