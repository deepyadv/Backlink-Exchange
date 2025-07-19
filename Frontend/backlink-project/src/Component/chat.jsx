import React, { useEffect, useState } from "react";
import socket from "../socket/socket";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = ({ receiverId }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const userId = useSelector((state) => state.auth.userDate?._id);

  useEffect(() => {
  if (userId) {
    console.log("🔗 Emitting join event with userId:", userId); 
    socket.emit("join", userId);
  }
}, [userId]);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/users/messages",
          { receiverId },
          { withCredentials: true }
        );
        setAllMessages(res.data.messages);
      } catch (err) {
        console.error("❌ Message fetch failed", err);
      }
    };

    if (receiverId) fetchMessages();
  }, [receiverId]);

  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      setAllMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, []);

  const handleSend = () => {
    console.log("🔼 Sending message:", message);
    if (!message.trim() || !userId || !receiverId) return;

    socket.emit("sendMessage", {
      sender: userId,
      receiver: receiverId,
      content: message,
    });

    setMessage(""); // Clear input only
  };

  return (
    <div className="chat-container max-w-md">
      <div className="messages h-64 overflow-y-auto bg-gray-100 p-3 rounded mb-2">
        {allMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded max-w-xs mb-2 ${
              msg.sender === userId
                ? "bg-blue-500 text-white ml-auto text-right"
                : "bg-white text-gray-800 mr-auto text-left border"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
