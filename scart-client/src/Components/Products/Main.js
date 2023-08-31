import React from 'react'
import menu from '../../assets/menu-icon.webp';
import useFilter from '../../utils/useFilter'
import useProducts from '../../utils/useProducts';
import ProductsContainer from './ProductsContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  checkbox: {
    marginRight: '4px',
  },
  filterCategory: {
    marginBottom: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
    padding: '10px',
  },
  filterCategoryTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
    fontSize: '1.2em',
  },
  filterCategoryContent: {
    paddingLeft: '10px',
  },
};

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const { filter, handleFilterChange, handleResetFilters } = useFilter();
  const { filteredProducts, brands, colors, priceRange, discountRange } = useProducts(searchQuery, filter);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const url = 'https://scart-xebia.onrender.com/products';
    axios.get(url)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error('Error:', err);

      });
  }, [])





  return (
    <div className="flex flex-row mt-16 w-full">
      <div
        className={` ${open ? "w-56" : "w-14 "
          } h-auto p-5 pt-8 pr-8 relative duration-300 shadow-lg`}
      >
        <img
          src={menu}
          className="absolute cursor-pointer right-3 top-9 w-7 border-dark-purple"
          onClick={() => setOpen(!open)}
          alt="menu"
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Filters
          </h1>
        </div>

        {open ? <form onSubmit={e => e.preventDefault()}>
          <div className="mx-auto my-10">
            <div style={styles.filterCategoryTitle}>Brands</div>
            <div style={styles.filterCategoryContent}>
              {brands.map(brand => (
                <label key={brand} style={styles.label}>
                  <input
                    type="checkbox"
                    name="brand"
                    value={brand}
                    checked={filter.brand && filter.brand.includes(brand)}
                    onChange={handleFilterChange}
                    style={styles.checkbox}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
          <div className="mx-auto my-10">
            <div style={styles.filterCategoryTitle}>Colors</div>
            <div style={styles.filterCategoryContent}>
              {colors.map(color => (
                <label key={color} style={styles.label}>
                  <input
                    type="checkbox"
                    name="color"
                    value={color}
                    checked={filter.color && filter.color.includes(color)}
                    onChange={handleFilterChange}
                    style={styles.checkbox}
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
          <div className="mx-auto my-10">
            <div style={styles.filterCategoryTitle}>Price Range</div>
            <div style={styles.filterCategoryContent}>
              <label style={styles.label}>
                Min Price:
                <input
                  type="number"
                  name="min_price"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filter.min_price || priceRange.min}
                  onChange={handleFilterChange}
                  className='border-2 pl-2 focus:border-black'
                />
              </label>
              <label style={styles.label}>
                Max Price:
                <input
                  type="number"
                  name="max_price"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filter.max_price || priceRange.max}
                  onChange={handleFilterChange}
                  className='border-2 pl-2 focus:border-black'
                />
              </label>
            </div>
          </div>
          <div className="mx-auto my-10">
            <div style={styles.filterCategoryTitle}>Discount Range</div>
            <div style={styles.filterCategoryContent}>
              <label style={styles.label}>
                Min Discount:
                <input
                  type="number"
                  name="min_discount"
                  min={discountRange.min}
                  max={discountRange.max}
                  value={filter.min_discount || discountRange.min}
                  onChange={handleFilterChange}
                  className='border-2 pl-2 focus:border-black'
                />
              </label>
              <label style={styles.label}>
                Max Discount:
                <input
                  type="number"
                  name="max_discount"
                  min={discountRange.min}
                  max={discountRange.max}
                  value={filter.max_discount || discountRange.max}
                  onChange={handleFilterChange}
                  className='border-2 pl-2 focus:border-black'
                />
              </label>
            </div>
          </div>
          <button onClick={handleResetFilters}>Reset Filters</button>
        </form> : <></>}

      </div>

      <ProductsContainer products={filteredProducts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

    </div>
  )
}

export default Main;