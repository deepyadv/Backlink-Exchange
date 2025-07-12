import React, { useEffect, useState } from "react";
import axios from "axios";

function FilterWebsites() {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minDA: "",
    maxDA: "",
    minTraffic: "",
    maxTraffic: "",
  });

  const [websites, setWebsites] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchFilteredWebsites = async () => {
    try {
      const params = new URLSearchParams(filters);
      const res = await axios.get(`http://localhost:3000/users/filter?${params}`, {
        withCredentials: true,
      });
      setWebsites(res.data.websites);
    } catch (error) {
      console.error("Error fetching filtered websites", error);
    }
  };

  useEffect(() => {
    fetchFilteredWebsites(); // Load default websites on mount
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4">Filter Guest Post Websites</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="border p-2 rounded"
        />
        <input
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="border p-2 rounded"
        />
        <input
          name="minDA"
          value={filters.minDA}
          onChange={handleChange}
          placeholder="Min Domain Authority"
          className="border p-2 rounded"
        />
        <input
          name="maxDA"
          value={filters.maxDA}
          onChange={handleChange}
          placeholder="Max Domain Authority"
          className="border p-2 rounded"
        />
        <input
          name="minTraffic"
          value={filters.minTraffic}
          onChange={handleChange}
          placeholder="Min Traffic"
          className="border p-2 rounded"
        />
        <input
          name="maxTraffic"
          value={filters.maxTraffic}
          onChange={handleChange}
          placeholder="Max Traffic"
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={fetchFilteredWebsites}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>

      {websites.length === 0 ? (
        <p>No websites found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {websites.map((site) => (
            <div key={site._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-lg font-bold">{site.url}</h3>
              <p>DA: {site.domainAuthority}</p>
              <p>Traffic: {site.traffic}</p>
              <p>Price: ₹{site.price}</p>
              <p>Seller: {site.user?.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterWebsites;
