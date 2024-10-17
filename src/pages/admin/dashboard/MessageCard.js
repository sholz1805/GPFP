import React from 'react';

const MessageCard = ({ message, onClick }) => {
  return (
    <li 
      className={`mb-1 p-2 cursor-pointer ${message.read ? 'bg-white border border rounded-md' : 'bg-[#f2f2f2] rounded-md'}`} 
      onClick={onClick}
    >
      <span className="text-sm font-semibold">{message.sender}</span>
      <p className="text-gray-600 text-sm leading-tight">{message.content}</p>
    </li>
  );
};

export default MessageCard;