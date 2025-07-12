import React, { useEffect, useState } from "react";
import axios from "axios";
import Chat from "../Component/chat";

const SellerInbox = () => {
  const [buyers, setBuyers] = useState([]);
  const [activeBuyerId, setActiveBuyerId] = useState(null);
  const [activeBuyerName, setActiveBuyerName] = useState("");

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await axios.post("http://localhost:3000/users/chat-users", {}, {
          withCredentials: true,
        });
        setBuyers(res.data.users);
      } catch (err) {
        console.error("❌ Error fetching buyers:", err);
      }
    };

    fetchBuyers();
  }, []);

  const handleChatOpen = (buyerId, username) => {
    setActiveBuyerId(buyerId);
    setActiveBuyerName(username);
  };

  const handleChatClose = () => {
    setActiveBuyerId(null);
    setActiveBuyerName("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Your Chat Messages</h2>

      {buyers.length === 0 && <p>No messages yet.</p>}

      {buyers.map((buyer) => (
        <div key={buyer._id} className="mb-2">
          <button
            onClick={() => handleChatOpen(buyer._id, buyer.username)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Chat with {buyer.username}
          </button>
        </div>
      ))}

      {activeBuyerId && (
        <div className="relative mt-4 border rounded shadow p-4 bg-white max-w-xl">
          {/* ❌ Close Button */}
          <button
            onClick={handleChatClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            title="Close Chat"
          >
            &times;
          </button>

          <h3 className="text-lg font-semibold mb-2">
            Chat with {activeBuyerName}
          </h3>

          <Chat receiverId={activeBuyerId} />
        </div>
      )}
    </div>
  );
};

export default SellerInbox;
