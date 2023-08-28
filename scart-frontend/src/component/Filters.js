import React from 'react';

const styles = {
  sidebar: {
    width: '250px',
    padding: '20px',
    borderRight: '1px solid #e0e0e0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  checkbox: {
    marginRight: '8px',
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

function Filters({ filter, brands, colors, priceRange, discountRange, handleFilterChange, handleResetFilters }) {
  return (
    <div style={styles.sidebar}>
      <form style={styles.form} onSubmit={e => e.preventDefault()}>
        <div style={styles.filterCategory}>
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
        <div style={styles.filterCategory}>
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
        <div style={styles.filterCategory}>
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
              />
            </label>
          </div>
        </div>
        <div style={styles.filterCategory}>
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
              />
            </label>
          </div>
        </div>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </form>
    </div>
  );
}

export default Filters;