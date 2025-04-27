// import React, { useState } from 'react';

// const AIChatBot = () => {
//   const [message, setMessage] = useState('');
//   const [botReply, setBotReply] = useState('');

//   const handleAsk = () => {
//     if (!message.trim()) return;
//     setBotReply("🤖 Thinking...");
//     // fake response
//     setTimeout(() => {
//       setBotReply(`📚 Tip: Review attendance for ${message} using analytics tab!`);
//     }, 1000);
//     setMessage('');
//   };

//   return (
//     <div className="fixed bottom-6 right-6 w-72 bg-white shadow-lg rounded-xl border p-4">
//       <h3 className="text-sm font-bold text-gray-800 mb-2">🤖 AI Assistant</h3>
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
//         className="w-full border px-3 py-2 rounded-md text-sm mb-2 focus:outline-none"
//         placeholder="Ask about attendance, timetable..."
//       />
//       {botReply && <p className="text-xs text-gray-600">{botReply}</p>}
//     </div>
//   );
// };

// export default AIChatBot;

import React, { useState } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hey Faculty 👩‍🏫! Need help with attendance or schedule?' }
  ]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: `🤖 Got it! You asked: "${input}". (AI response placeholder)` },
      ]);
    }, 600);

    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300">
          <div className="bg-indigo-600 text-white flex justify-between items-center px-4 py-2">
            <span>SCMS Assistant</span>
            <button onClick={handleToggle}><FaTimes /></button>
          </div>

          <div className="h-64 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[85%] ${
                  msg.from === 'bot' ? 'bg-gray-100 text-gray-800' : 'bg-indigo-100 text-indigo-900 self-end ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow px-3 py-2 text-sm rounded-l-lg border border-gray-300 outline-none"
              placeholder="Ask something..."
            />
            <button
              onClick={handleSend}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 rounded-r-lg"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleToggle}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <FaRobot /> Ask SCMS AI
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
