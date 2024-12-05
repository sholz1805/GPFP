import React from "react";

const MessageCard = ({ message, onClick }) => {

  const formatTitle = (title) => {
    return title
        .replace(/_/g, ' ')
        .toLowerCase() 
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' '); 
};

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  return (
    <li
      className={`mb-1 p-2 min-h-14 cursor-pointer ${
        message.read
          ? "bg-white border border rounded-md"
          : "bg-[#f2f2f2] rounded-md"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{formatTitle(message.title)} from {message.sender}</span>
        <p className="text-xs italic text-primary">{formatDateString(message.date)}</p>
      </div>
      {/* <p className="text-gray-600 text-sm leading-tight">{message.details}</p> */}
    </li>
  );
};

export default MessageCard;
