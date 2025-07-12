import axios from "axios";


const API_BASE_URL = "http://localhost:3000";

 const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/register`, formData);

    console.log("Full Axios Response:", res);
    
    // Log just the data part
    console.log("Response Data:", res.data);
    return res.data;
    
    
  } catch (error) {
    
    throw error.response?.data || { error: "Registration failed" };
  }
  
  
};


export{registerUser}