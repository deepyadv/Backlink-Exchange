import React, { useState } from "react";
import axios from "axios";

function FilterWebsites({ onfilterchange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minDA: "",
    maxDA: "",
    minTraffic: "",
    maxTraffic: "",
  });

  const toggleFilter = () => setShowFilters((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async () => {
    const params = new URLSearchParams(filters);
    try {
      const res = await axios.get(`http://localhost:3000/users/filter?${params}`, {
        withCredentials: true,
      });
      if (onfilterchange) onfilterchange(res.data.websites); 
    } catch (error) {
      console.error("❌ Error filtering websites", error);
    }
  };

  return (
    <div className="bg-white p-4 mb-6 rounded shadow text-black">
      <button
        onClick={toggleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <input name="minPrice" value={filters.minPrice} onChange={handleChange} placeholder="Min Price" className="border p-2 rounded" />
          <input name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="Max Price" className="border p-2 rounded" />
          <input name="minDA" value={filters.minDA} onChange={handleChange} placeholder="Min Domain Authority" className="border p-2 rounded" />
          <input name="maxDA" value={filters.maxDA} onChange={handleChange} placeholder="Max Domain Authority" className="border p-2 rounded" />
          <input name="minTraffic" value={filters.minTraffic} onChange={handleChange} placeholder="Min Traffic" className="border p-2 rounded" />
          <input name="maxTraffic" value={filters.maxTraffic} onChange={handleChange} placeholder="Max Traffic" className="border p-2 rounded" />

          <button
            onClick={handleSubmit}
            className="sm:col-span-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterWebsites;
