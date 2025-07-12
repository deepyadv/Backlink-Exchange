// import React from 'react'
// import { logout } from '../../store/Auth.Store'
// import {  useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'

// function LogoutBtn() {
//    const dispatch = useDispatch()
//    const navigate = useNavigate()

//    const LogOutHandler  = async () =>{

//         try {

//             await axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true })
//            dispatch(logout());
//            navigate("/login")
            
//         } catch (error) {
//             console.log("Logout failed", error)
//         }
//    }

//   return (
//     <button onClick={LogOutHandler}>Logout</button>
//   )
// }

// export default LogoutBtn


import React from 'react';
import { logout } from '../../store/Auth.Store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOutHandler = async () => {
    try {
      await axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true });
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log('Logout failed', error);
    }
  };

  return (
    <button
      onClick={LogOutHandler}
      className="px-4 py-2 rounded font-bold border border-white bg-red-600 text-white hover:bg-red-700 transition duration-200 cursor-pointer"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;



