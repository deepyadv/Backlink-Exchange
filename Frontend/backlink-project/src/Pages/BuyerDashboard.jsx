import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setOrders } from '../store/Order';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BuyerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/users/user-order-details',
          {},
          { withCredentials: true }
        );
        dispatch(setOrders(response.data.orders));
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchBuyerDetails();
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">🛒 Your Guest Post Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Website</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{order.website?.url}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">₹{order.paymentAmount}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.seller?.username}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'complete'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {order.status === 'complete' && order.seller?._id && (
                      <button
                        onClick={() => navigate(`/chat/${order.seller._id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                      >
                        Chat with Seller
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard;
