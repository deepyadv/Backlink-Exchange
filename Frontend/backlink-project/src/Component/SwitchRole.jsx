import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from "../store/Auth.Store"
import { useDispatch } from 'react-redux';


function SwitchRole() {
  const navigate = useNavigate();
  const dispatch  = useDispatch()

  const handleSwitch = async () => {
    try {
      const res = await axios.patch(
        'http://localhost:3000/users/switch-role', 
        {},
        { withCredentials: true }
      );

      alert(res.data.msg);

      const profiles = await axios.get("http://localhost:3000/users/profile", { withCredentials: true})
      dispatch(login(profiles.data))



      if (res.data.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else if (res.data.role === 'seller'){
        navigate('/seller-dashboard');
      }
    } catch (error) {
      console.error('Role switch error:', error);
    }
  };

  return (
    <button
      onClick={handleSwitch}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition"
    >
      Switch Role
    </button>
  );
}

export default SwitchRole;
