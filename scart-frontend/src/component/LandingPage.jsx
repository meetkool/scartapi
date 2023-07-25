import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './App.css';
// import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Filters from './Filters';
import ProductList from './ProductList';
import useProducts from './useProducts';
import useFilter from './useFilter';

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { filter,handleFilterChange, handleResetFilters } = useFilter();

  const {filteredProducts, brands, colors, priceRange, discountRange } = useProducts(searchQuery, filter);

  return (
        <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <br/>
      <div className="layout">
        <Filters brands={brands} colors={colors} filter={filter} handleFilterChange={handleFilterChange} priceRange={priceRange} discountRange={discountRange} handleResetFilters={handleResetFilters} />
        <div className="main-content">
          <h2>Products</h2>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
  
}

export default LandingPage;
