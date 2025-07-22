import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('https://linkoback.onrender.com/users/register', {
        name,
        email,
        password,
        username,
        role
      });

      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-red-400 transition duration-200"
        >
          ✕
        </button>

        <h3 className="text-3xl font-bold text-center mb-8">Register</h3>

        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              required
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Username</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              name="username"
              type="text"
              placeholder="Choose a username"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              required
            />
          </div>

          <div className="flex flex-col">
  <label className="text-sm font-medium mb-2">Role</label>
  <select
    name="role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
    required
  >
    <option value="buyer">Buyer</option>
    <option value="seller">Seller</option>
  </select>
</div>


          {/* Submit */}
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold hover:bg-white hover:text-black border-none cursor-pointer"
          >
            Register
          </button>

                  {error && <p className="text-red-500 mt-4 text-center">{error}</p>}


          <p className="text-sm text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export {Register};
