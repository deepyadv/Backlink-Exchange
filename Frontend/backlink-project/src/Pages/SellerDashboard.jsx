// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SellerInbox from '../Component/sellerInbox';
// import { useNavigate } from 'react-router-dom';

// function SellerDashboard() {
//   const [websites, setWebsites] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await axios.post("http://localhost:3000/users/seller-dashboard", {
//           withCredentials: true,
//         });
//         setWebsites(res.data.websites);
//         setOrders(res.data.orders);
//       } catch (error) {
//         console.error("Dashboard fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   if (loading) return <div className="p-5 text-center text-white">Loading Dashboard...</div>;

//   return (
//     <div className="p-5 text-white">
//       <h1 className="text-2xl font-bold mb-4 text-center">Seller Dashboard</h1>

//       <SellerInbox />

//       <section className="mb-6 mt-10">
//         <h2 className="text-xl font-semibold mb-2">Your Websites</h2>
//         <ul className="space-y-3">
//           {websites.map((site) => (
//             <li key={site._id} className="border p-3 rounded bg-gray-900 shadow">
//               <p><strong>URL:</strong> {site.url}</p>
//               <p><strong>Domain Authority:</strong> {site.domainAuthority}</p>
//               <p><strong>Traffic:</strong> {site.traffic}</p>
//               <p><strong>Price:</strong> ₹{site.price}</p>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h2 className="text-xl font-semibold mb-2">Received Orders</h2>
//         <ul className="space-y-3">
//           {orders.map((order) => (
//             <li key={order._id} className="border p-3 rounded bg-gray-900 shadow">
//               <p><strong>Buyer:</strong> {order.buyer?.username}</p>
//               <p><strong>Website:</strong> {order.website?.url}</p>
//               <p><strong>Amount:</strong> ₹{order.paymentAmount}</p>
//               <p><strong>Status:</strong> {order.status}</p>

//               {/* ✅ Chat Button (only if payment is complete) */}
//               {order.status === "complete" && order.buyer?._id && (
//                 <button
//                   onClick={() => navigate(`/chat/${order.buyer._id}`)}
//                   className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
//                 >
//                   Chat with Buyer
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default SellerDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SellerInbox from '../Component/sellerInbox';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

function SellerDashboard() {
  const [websites, setWebsites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.post("http://localhost:3000/users/seller-dashboard", {}, { withCredentials: true });
        setWebsites(res.data.websites);
        setOrders(res.data.orders);

        // Prepare Monthly Revenue Data
        const monthlyRevenue = {};
        res.data.orders.forEach(order => {
          const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
          if (!monthlyRevenue[month]) monthlyRevenue[month] = 0;
          monthlyRevenue[month] += order.paymentAmount;
        });

        const data = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
          month,
          revenue
        }));

        setChartData(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-5 text-center text-white">Loading Dashboard...</div>;

  return (
    <div className="p-5 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Seller Dashboard</h1>

      <SellerInbox />

      {/* 📊 Revenue Chart */}
      <div className="my-8 bg-gray-900 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">📈 Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🌐 Website List */}
      <section className="mb-6 mt-10">
        <h2 className="text-xl font-semibold mb-2">Your Websites</h2>
        <ul className="space-y-3">
          {websites.map((site) => (
            <li key={site._id} className="border p-3 rounded bg-gray-900 shadow">
              <p><strong>URL:</strong> {site.url}</p>
              <p><strong>Domain Authority:</strong> {site.domainAuthority}</p>
              <p><strong>Traffic:</strong> {site.traffic}</p>
              <p><strong>Price:</strong> ₹{site.price}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 📦 Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Received Orders</h2>
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order._id} className="border p-3 rounded bg-gray-900 shadow">
              <p><strong>Buyer:</strong> {order.buyer?.username}</p>
              <p>
        <strong>Buyer Link:</strong>{' '}
        <a
          href={order.buyerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          {order.buyerLink}
        </a>
      </p>
              <p><strong>Amount:</strong> ₹{order.paymentAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>

              {order.status === "complete" && order.buyer?._id && (
                <button
                  onClick={() => navigate(`/chat/${order.buyer._id}`)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                >
                  Chat with Buyer
                </button>
              )}
            </li>
          ))}
        </ul>

        <Link to="/edit-website-info">
  <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
    Edit My Website Info
  </button>
</Link>
      </section>
    </div>
  );
}

export default SellerDashboard;
