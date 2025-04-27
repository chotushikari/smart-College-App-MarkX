import React from 'react';
import { FaCommentDots } from 'react-icons/fa';

const ChatCard = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border border-gray-100 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-1">💬 Class Chat</h2>
        <p className="text-sm text-gray-500">Open real-time chat for all your classes.</p>
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
        <FaCommentDots />
        Chat
      </button>
    </div>
  );
};

export default ChatCard;
