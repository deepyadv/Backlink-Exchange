// import React,{useState, useEffect} from 'react'
// import axios from 'axios'


// function AllWebsites() {

// const [websites, SetWebsites] = useState([]);


//    useEffect(() =>{

//      const fetchWebsites = async () =>{

//              try {

//                  const res = await axios.post('http://localhost:3000/users/get-All-websites',{ withCredentials: true,})

//                  SetWebsites(res.data)
                
//              } catch (error) {
//                 console.log('❌ Failed to fetch websites:', error)
//              }
//      }

//      fetchWebsites()

//    },[])

//    return (
//     <div className="min-h-screen bg-gray-100 p-6 text-black">
//       <h1 className="text-3xl font-bold text-center mb-8">All Website Listings</h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {websites.map((site) => (
//           <div key={site._id} className="bg-white p-4 rounded shadow">
//             <img src={site.image} alt="Website" className="w-full h-40 object-cover rounded" />
//             <h2 className="text-xl font-semibold mt-2">{site.url}</h2>
//             <p><strong>DA:</strong> {site.domainAuthority}</p>
//             <p><strong>Traffic:</strong> {site.traffic}</p>
//             <p><strong>Price:</strong> ${site.price}</p>
//             <p><strong>Language:</strong> {site.language}</p>
//             <p><strong>Categories:</strong> {site.categories.join(', ')}</p>
//             <p className="text-sm text-gray-600 mt-2">Listed by: {site.user?.username || 'Unknown'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
  

// }

// export default AllWebsites


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { startPayment } from '../services/razorpay';
import Chat from "../Component/chat"
import { useNavigate } from 'react-router-dom';
import FilterWebsites from '../Pages/FilterWebsites';

function AllWebsites() {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);
  const [buyerLinks, setBuyerLinks] = useState({});
  const [activeChat, setActiveChat] = useState(null); // Track current open chat
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.post(
          'http://localhost:3000/users/get-All-websites',
          {},
          { withCredentials: true }
        );
        setWebsites(res.data);
      } catch (error) {
        console.log('❌ Failed to fetch websites:', error);
      }
    };

    fetchWebsites();
  }, []);

  const handleInputChange = (e, id) => {
    setBuyerLinks((prev) => ({ ...prev, [id]: e.target.value }));
  };

  const handleBuy = (site) => {
    const buyerLink = buyerLinks[site._id];
    if (!buyerLink) return alert('⚠️ Please enter your guest post URL');

    startPayment({
      websiteId: site._id,
      price: site.price,
      buyerLink,
      onSuccess: () =>{ alert('✅ Payment complete! Order placed.');
      navigate("/Dashboard");}
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-8">All Website Listings</h1>

      <  FilterWebsites onfilterchange ={ setFilters }/>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {websites.map((site) => (
          <div key={site._id} className="bg-white p-4 rounded shadow relative">
            <img src={site.image} alt="Website" className="w-full h-40 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{site.url}</h2>
            <p><strong>DA:</strong> {site.domainAuthority}</p>
            <p><strong>Traffic:</strong> {site.traffic}</p>
            <p><strong>Price:</strong> ₹{site.price}</p>
            <p><strong>Language:</strong> {site.language}</p>
            <p><strong>Categories:</strong> {site.categories.join(', ')}</p>
            <p className="text-sm text-gray-600 mt-2">Listed by: {site.user?.username || 'Unknown'}</p>

            <input
              type="url"
              placeholder="Your guest post URL"
              value={buyerLinks[site._id] || ''}
              onChange={(e) => handleInputChange(e, site._id)}
              className="w-full p-2 mt-3 border rounded text-black"
            />
            <button
              onClick={() => handleBuy(site)}
              className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Buy Guest Post
            </button>

            <button
              onClick={() => setActiveChat((prev) => prev === site.user?._id ? null : site.user._id)}
              className="w-full mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {activeChat === site.user?._id ? 'Close Chat' : 'Chat with Seller'}
            </button>

            {activeChat === site.user?._id && (
              <div className="mt-4 border-t pt-4">
                <Chat receiverId={site.user?._id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllWebsites;
