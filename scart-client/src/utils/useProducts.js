import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useProducts(searchQuery, filter) {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [discountRange, setDiscountRange] = useState({ min: 0, max: 0 });

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

  return { filteredProducts, brands, colors, priceRange, discountRange };
}
