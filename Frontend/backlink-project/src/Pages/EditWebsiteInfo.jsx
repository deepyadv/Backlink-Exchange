import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditWebsiteInfo() {
  const [websites, setWebsites] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/seller-websites", { withCredentials: true })
      .then((res) => setWebsites(res.data.websites))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const handleChange = (e, id, field) => {
    const value = e.target.value;
    setWebsites((prev) =>
      prev.map((w) =>
        w._id === id ? { ...w, [field]: value } : w
      )
    );
  };

  const handleSubmit = async (id) => {
    const website = websites.find((w) => w._id === id);

    try {
      await axios.put(
        "http://localhost:3000/users/update-user-details",
        {
          websiteid: id,
          price: website.price,
          traffic: website.traffic,
          domainAuthority: website.domainAuthority,
        },
        { withCredentials: true }
      );
      alert("Website updated ✅");
      navigate("/dashboard")
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h2 className="text-2xl font-bold text-center mb-6">Update Website Info</h2>
      {websites.map((w) => (
        <div key={w._id} className="bg-white shadow rounded p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">{w.url}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              value={w.price}
              onChange={(e) => handleChange(e, w._id, "price")}
              placeholder="Price"
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={w.traffic}
              onChange={(e) => handleChange(e, w._id, "traffic")}
              placeholder="Traffic"
              className="border p-2 rounded"
            />
            <input
              type="number"
              value={w.domainAuthority}
              onChange={(e) => handleChange(e, w._id, "domainAuthority")}
              placeholder="DA"
              className="border p-2 rounded"
            />
          </div>
          <button
            className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => handleSubmit(w._id)}
          >
            Save Changes
          </button>
        </div>
      ))}
    </div>
  );
}

export default EditWebsiteInfo;
