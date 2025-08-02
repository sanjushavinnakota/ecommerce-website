import React from 'react';
import './SellerFilterBar.css';

const categories = ['Electronics', 'Fashion', 'FMCG', 'Home Appliances'];
const locations = ['Delhi', 'Visakhapatnam', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'];

const SellerFilterBar = ({ filters, setFilters }) => {
  const toggleCategory = (category) => {
    if (filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      });
    } else {
      setFilters({ ...filters, categories: [...filters.categories, category] });
    }
  };

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: Number(e.target.value) });
  };

  return (
    <div className="seller-filter-bar">
      <div className="seller-filter-section">
        <h4>Categories</h4>
        {categories.map((e) => (
          <label key={e} className="seller-checkbox-label">
            <input
              type="checkbox"
              checked={filters.categories.includes(e)}
              onChange={() => toggleCategory(e)}
            />
            {e}
          </label>
        ))}
      </div>

      <div className="seller-filter-section">
        <h4>Max Price: ₹{filters.price}</h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.price}
          onChange={handlePriceChange}
        />
      </div>

      <div className="seller-filter-section">
        <h4>Location</h4>
        <select value={filters.location} onChange={handleLocationChange}>
          <option value="">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SellerFilterBar;
