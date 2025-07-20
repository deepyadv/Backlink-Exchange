import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from "../store/Auth.Store"
import { useDispatch } from 'react-redux';


function SwitchRole() {
  const navigate = useNavigate();
  const dispatch  = useDispatch()

  const handleSwitchRole = async () => {
  try {
    const res = await axios.patch("https://linkoback.onrender.com/users/switch-role", {}, {
      withCredentials: true
    });

    alert(res.data.msg);

    
    dispatch(login(res.data.updatedUser));

    
    setTimeout(() => {
      if (res.data.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/seller-dashboard');
      }
    }, 200); 

  } catch (error) {
    console.log("Switch role failed", error);
    alert("Failed to switch role. Please try again.");
  }
};



  return (
    <button
      onClick={handleSwitchRole}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition"
    >
      Switch Role
    </button>
  );
}

export default SwitchRole;
