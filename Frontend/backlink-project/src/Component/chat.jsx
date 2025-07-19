import React, { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = ({ receiverId }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const userId = useSelector((state) => state.auth.userData?._id);
  const chatContainerRef = useRef(null);

  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

 
  useEffect(() => {
    if (userId) {
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
        const sorted = sortByCreatedAt(res.data.messages);
        setAllMessages(sorted);
      } catch (err) {
        console.error("❌ Message fetch failed", err);
      }
    };

    if (receiverId) fetchMessages();
  }, [receiverId]);

 
  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      setAllMessages((prev) => sortByCreatedAt([...prev, msg]));
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, []);

 
  useEffect(() => {
    const markAsRead = async () => {
      try {
        await axios.patch(
          "http://localhost:3000/users/mark-read",
          { withUserId: receiverId },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Failed to mark as read", err);
      }
    };

    if (receiverId) markAsRead();
  }, [receiverId]);

  const handleSend = () => {
    if (!message.trim() || !userId || !receiverId) return;

    const newMsg = {
      sender: userId,
      receiver: receiverId,
      content: message.trim(),
      createdAt: new Date().toISOString(), 
    };

    setAllMessages((prev) => sortByCreatedAt([...prev, newMsg]));
    socket.emit("sendMessage", newMsg);
    setMessage("");
  };

  
  const sortByCreatedAt = (messages) => {
    return [...messages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  };

  return (
    <div className="max-w-md w-full bg-[#1e1e2f] text-white shadow-lg rounded-lg p-4">
      
      <div
        className="h-64 overflow-y-auto flex flex-col gap-2 p-2"
        ref={chatContainerRef}
        style={{ scrollBehavior: "smooth" }}
      >
        {allMessages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-xl max-w-[80%] text-sm break-words ${
              msg.sender === userId
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-700 text-gray-200 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="mt-4 flex">
        <input
          className="flex-1 p-3 bg-[#2a2a40] text-white rounded-l-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
