import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageInbox = ({ users, onSelectUser }) => {
  const [unreadCount, setUnreadCount] = useState({});

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/unread-count", {
          withCredentials: true,
        });
        setUnreadCount(res.data);
      } catch (error) {
        console.error("Failed to fetch unread counts", error);
      }
    };

    fetchUnread();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectUser(user)}
          className="flex justify-between items-center cursor-pointer border-b px-4 py-2 hover:bg-gray-100"
        >
          <span>{user.username}</span>
          {unreadCount[user._id] > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount[user._id]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageInbox;
