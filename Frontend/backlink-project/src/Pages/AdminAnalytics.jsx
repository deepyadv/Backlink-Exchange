import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalBuyers: 0,
    totalSellers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    topWebsites: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://linkoback.onrender.com/users/analytics", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">👤 Total Buyers</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalBuyers}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">🧑‍💼 Total Sellers</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalSellers}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">📦 Total Orders</h2>
          <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">💰 Total Revenue</h2>
          <p className="text-2xl font-bold mt-2">${stats.totalRevenue}</p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">🔥 Top Selling Websites</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.topWebsites}>
            <XAxis dataKey="url" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orderCount" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminAnalytics;
