import React from "react";
import { useParams } from "react-router-dom";
import Chat from "../Component/chat";

const ChatPage = () => {
  const { receiverId } = useParams();

  return (
    <div className="flex justify-center p-5">
      <Chat receiverId={receiverId} />
    </div>
  );
};

export default ChatPage;