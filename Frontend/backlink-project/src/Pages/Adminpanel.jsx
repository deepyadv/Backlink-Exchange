import React,{useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Adminpanel() {

     const [ listings, setListing] = useState([]);
     const navigate = useNavigate()

     useEffect(() =>{
         fetchListing()

     },[])

        const fetchListing = async () =>{

            try {

                const res  = await axios.get ('https://linkoback.onrender.com/users/get-all-website',{ withCredentials: true  })

                setListing(res.data.listings)
                
            } catch (error) {

                console.error ("failed to fetch listing", error )
                
            }

        };

        const fetchDeleteListing  = async (id) => {

            try {

                await axios.delete(`https://linkoback.onrender.com/users/delete-website/${id}`, { withCredentials: true})

                setListing((prevListings) => prevListings.filter((item) => item._id !== id));
                
            } catch (error) {
                console.error (error )
            }


        }
     


        return (
            <div className="p-6 text-black">
              <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

              <button
          onClick={() => navigate("/admin-analytics")}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded shadow hover:from-purple-700 hover:to-indigo-700 transition"
        >
          📊 View Analytics
        </button>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Website</th>
                    <th className="p-2 border">DA</th>
                    <th className="p-2 border">User</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((site) => (
                    <tr key={site._id} className="bg-white">
                      <td className="p-2 border">{site.url}</td>
                      <td className="p-2 border">{site.domainAuthority}</td>
                      <td className="p-2 border">{site.user?.username}</td>
                      <td className="p-2 border">
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => fetchDeleteListing(site._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
  


}

export default Adminpanel
