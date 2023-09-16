import React from 'react';

function CategoryDropdown({ categories, selectedCategory, onChange }) {
  return (
    <div>
      <label htmlFor="category">Select Category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={onChange}
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;