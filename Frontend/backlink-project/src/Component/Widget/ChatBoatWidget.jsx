import React, { useState } from 'react';
import FaqsChatbot from '../FaqsChatbot';
import { X } from 'lucide-react'; // Optional, or use plain ✖️

function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg text-xl z-50"
      >
        💬
      </button>

      {/* Chatbox Popup */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 bg-white rounded-lg shadow-xl p-4 w-80">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-indigo-600">LinkoBack Chatbot</h2>
            <button onClick={() => setOpen(false)} className="text-red-600 text-xl">
              <X />
            </button>
          </div>
          <FaqsChatbot />
        </div>
      )}
    </>
  );
}

export default ChatWidget;
