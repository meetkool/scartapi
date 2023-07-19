import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './App.css';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [discountRange, setDiscountRange] = useState({ min: 0, max: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      let response;
      if (searchQuery) {
        response = await axios.get("https://scart-xebia.onrender.com/products/search", { params: { query: searchQuery } });
      } else if (Object.keys(filter).length !== 0) {
        response = await axios.get("https://scart-xebia.onrender.com/filter", { params: { min_price: priceRange.min, max_price: priceRange.max, min_discount: discountRange.min, max_discount: discountRange.max } });
      } else {
        response = await axios.get("https://scart-xebia.onrender.com/products");
      }
      setProducts(response.data.products);
      const uniqueBrands = [...new Set(response.data.products.map(product => product.brand))];
      setBrands(uniqueBrands);
      const uniqueColors = [...new Set(response.data.products.map(product => product.color))];
      setColors(uniqueColors);
      const maxPrice = Math.max(...response.data.products.map(product => product.price));
      const minPrice = Math.min(...response.data.products.map(product => product.price));
      setPriceRange({ min: minPrice, max: maxPrice });
      const maxDiscount = Math.max(...response.data.products.map(product => product.discount));
      const minDiscount = Math.min(...response.data.products.map(product => product.discount));
      setDiscountRange({ min: minDiscount, max: maxDiscount });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setProducts([]);
      }
    }
  }, [searchQuery, filter, priceRange.min, priceRange.max, discountRange.min, discountRange.max]);
  
  

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

const handleFilterChange = (e) => {
  const { name, value, type } = e.target;
  setFilter((prevFilter) => {
    let updatedFilter;
    if (type === 'checkbox') {
      if (prevFilter[name] && prevFilter[name].length) {
        if (prevFilter[name].includes(value)) {
          const newFilterValues = prevFilter[name].filter((v) => v !== value);
          if (newFilterValues.length > 0) {
            updatedFilter = {
              ...prevFilter,
              [name]: newFilterValues,
            };
          } else {
            const { [name]: deletedKey, ...remaining } = prevFilter;
            updatedFilter = remaining;
          }
        } else {
          updatedFilter = {
            ...prevFilter,
            [name]: [...prevFilter[name], value],
          };
        }
      } else {
        updatedFilter = {
          ...prevFilter,
          [name]: [value],
        };
      }
    } else if (type === 'number') {
      updatedFilter = {
        ...prevFilter,
        [name]: parseFloat(value),
      };
    } else {
      updatedFilter = {
        ...prevFilter,
        [name]: value,
      };
    }
    return updatedFilter;
  });
};


  const handleResetFilters = () => {
    setFilter({});
  };

  const filteredProducts = products.filter((product) => {
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        if (!filter[key].includes(product[key])) {
          return false;
        }
      } else if (key === 'min_price' || key === 'min_discount') {
        if (product[key.slice(4)] < filter[key]) {
          return false;
        }
      } else if (key === 'max_price' || key === 'max_discount') {
        if (product[key.slice(4)] > filter[key]) {
          return false;
        }
      } else {
        if (product[key] !== filter[key]) {
          return false;
        }
      }
    }
    return true;
  });

  return (
    <div className="App">
      <h1>Welcome to Our Store</h1>
  
      <div className="layout">
  
        <div className="sidebar">
          <form onSubmit={e => e.preventDefault()}>
            {brands.map(brand => (
              <label key={brand}>
                {brand}
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  checked={filter.brand && filter.brand.includes(brand)}
                  onChange={handleFilterChange}
                />
              </label>
            ))}
            {colors.map(color => (
              <label key={color}>
                {color}
                <input
                  type="checkbox"
                  name="color"
                  value={color}
                  checked={filter.color && filter.color.includes(color)}
                  onChange={handleFilterChange}
                />
              </label>
            ))}
            <label>
              Min Price:
              <input
                type="number"
                name="min_price"
                min={priceRange.min}
                max={priceRange.max}
                value={filter.min_price || priceRange.min}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Max Price:
              <input
                type="number"
                name="max_price"
                min={priceRange.min}
                max={priceRange.max}
                value={filter.max_price || priceRange.max}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Min Discount:
              <input
                type="number"
                name="min_discount"
                min={discountRange.min}
                max={discountRange.max}
                value={filter.min_discount || discountRange.min}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Max Discount:
              <input
                type="number"
                name="max_discount"
                min={discountRange.min}
                max={discountRange.max}
                value={filter.max_discount || discountRange.max}
                onChange={handleFilterChange}
              />
            </label>
  
            <button onClick={handleResetFilters}>Reset Filters</button>
          </form>
        </div>
  
        <div className="main-content">
          <div className="search-bar">
            <label>
              Search:
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
          <h2>Products</h2>
          <div className="products-grid">
            {filteredProducts.map((product) => (
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
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
  
}

export default LandingPage;
