import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/Auth.Store';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ username, setuserName] = useState("");
  const [ password, setPassword] = useState("");
  const [ error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const loginHandle = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");


    try {

       const res = await axios.post('https://linkoback.onrender.com/users/login', {
        username,
        password,
         
      },{ withCredentials: true })
      dispatch(login(res.data.user))
      
      const { data } = await axios.post(
  "https://linkoback.onrender.com/users/is-seller",
  {}, 
  {
    withCredentials: true 
  }
)


      if(data.isSeller){

        navigate("/seller-dashboard")
      } else{
        navigate("/choose-role")
      }
      
    } catch (err) {
      console.error(err.response?.data?.msg || err.message)
      setError( err.response?.data?.msg || "Invalid username or password")
    } finally {
    setLoading(false); 
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      {loading && <p className="text-sm text-center text-blue-400">Logging in...</p>}

      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg relative">
        
        
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-white text-xl cursor-pointer hover:text-red-400 transition duration-200"
        >
          ✕
        </button>

        <h3 className="text-3xl font-bold text-center mb-8">Login</h3>

        <form className="space-y-6" onSubmit={loginHandle}>
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">username</label>
            <input
            onChange={(e) => setuserName(e.target.value)}
            value={username}
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:bg-white hover:text-black border-none cursor-pointer"
          >
            Login
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Account Link */}
          <p className="text-sm text-center mt-6 text-gray-400">
            No account yet?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create a new account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export {Login};
