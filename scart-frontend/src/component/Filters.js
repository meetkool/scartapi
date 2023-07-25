import React from 'react';

function Filters({ filter, brands, colors, priceRange, discountRange, handleFilterChange, handleResetFilters }) {
  return (
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
  );
}

export default Filters;
