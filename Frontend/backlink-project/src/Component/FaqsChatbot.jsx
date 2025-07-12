import React, { useState, useEffect, useRef } from 'react';
import faqs from '../Data/faqs';
import { MessageCircle, X } from 'lucide-react'; // Optional: lucide icons

function FaqsChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  // Scroll to bottom when chatHistory changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const match = faqs.find(faq =>
      input.toLowerCase().includes(faq.question.toLowerCase())
    );
    const botMessage = {
      type: 'bot',
      text: match ? match.answer : "🤖 Sorry, I don't have an answer to that.",
    };

    setChatHistory(prev => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-lg flex flex-col z-50 animate-slide-up border border-gray-300">
          {/* Header */}
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-t-xl font-semibold flex justify-between items-center">
            💬 Ask LinkoBack
            <button onClick={() => setIsOpen(false)}>
              <X className="hover:text-gray-200" size={20} />
            </button>
          </div>

          {/* Chat History */}
          <div className="p-3 h-64 overflow-y-auto space-y-2 bg-gray-50 text-sm">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[85%] ${
                  msg.type === 'user'
                    ? 'ml-auto bg-indigo-100 text-right'
                    : 'mr-auto bg-gray-200'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 p-2 text-sm outline-none rounded-bl-xl"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 rounded-br-xl hover:bg-indigo-700 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FaqsChatbot;
