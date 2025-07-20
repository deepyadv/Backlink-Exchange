import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WebsiteListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    url: '',
    domainAuthority: '',
    categories: [],
    traffic: '',
    image: null,
    language: 'English',
    price: '',
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const optionCategories = ['Earn Money', 'Finance', 'Sarkari Yojana', 'AI'];
  const selectLanguage = ['Hindi', 'English'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else if (name === 'categories') {
      const values = Array.from(e.target.selectedOptions).map((opt) => (opt.value));
      setForm((prev) => ({ ...prev, categories: values }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'categories') {
        val.forEach((v) => formData.append('categories[]', v));
      } else {
        formData.append(key, val);
      }
    });

    try {
      await axios.post('https://linkoback.onrender.com/users/website-details', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Website submitted successfully!');
      navigate('/seller-dashboard');
    } catch (err) {
      console.error('Submit error', err);
      alert('❌ Failed to submit website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">List Your Website</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        
           <div>
            <label className="block text-sm font-semibold mb-1 text-black">Username</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="username"
              className="w-full p-3 border border-black rounded-lg bg-white text-black placeholder:text-black"
              required
            />
          </div> 

           URL
          <div>
            <label className="block text-sm font-semibold mb-1 text-black">Website URL</label>
            <input
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full p-3 border border-black rounded-lg bg-white text-black placeholder:text-black"
              required
            />
          </div>

          {/* Domain Authority */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black">Domain Authority</label>
            <input
              name="domainAuthority"
              type="number"
              value={form.domainAuthority}
              onChange={handleChange}
              placeholder="e.g. 45"
              className="w-full p-3 border border-black rounded-lg bg-white text-black placeholder:text-black"
              required
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black">Categories</label>
            <select
              name="categories"
              multiple
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg h-32 bg-white text-black"
            >
              {optionCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-700 mt-1">Hold Ctrl or Cmd to select multiple.</p>
          </div>

          {/* Traffic */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black">Monthly Traffic</label>
            <input
              name="traffic"
              type="number"
              value={form.traffic}
              onChange={handleChange}
              placeholder="e.g. 10000"
              className="w-full p-3 border border-black rounded-lg bg-white text-black placeholder:text-black"
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black">Language</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg bg-white text-black"
            >
              {selectLanguage.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black">Price (INR)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 50"
              className="w-full p-3 border border-black rounded-lg bg-white text-black placeholder:text-black"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black">Upload Screenshot</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg bg-white text-black"
              required
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="text-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 mx-auto rounded border object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? 'Submitting...' : 'Submit Website'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WebsiteListing;
