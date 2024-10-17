import React, { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";

const Message = ({ message }) => {
  return (
    <div className="flex items-start">
      <input type="checkbox" className="mr-2 mt-1 outline-none accent-[#467D9A] checked:bg-[#467D9A] checked:border-[#467D9A]"  />
      <div>
        <h2 className="text-sm font-semibold">{message.title}</h2>
        <p className="text-gray-600 text-xs leading-tight">{message.content}</p>
      </div>
    </div>
  );
};

export const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const messages = [
    {
      id: 1,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 2,
      title: "Meshach",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 3,
      title: "BridgeGap",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 4,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 5,
      title: "Conduet",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 6,
      title: "Greentrade",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 7,
      title: "RCC",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 8,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 9,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 10,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 11,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 12,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
    {
      id: 13,
      title: "Wavelength",
      content:
        "Lorem ipsum dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed. dolor sit amet consectetur. Arcu vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.",
    },
  ];

  const filteredMessages = messages.filter((message) =>
    message.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gray-100 min-h-screen p-2">
      <div className="mx-auto p-2">
        <div className="bg-white flex items-center justify-between gap-3 px-4 py-2 mb-2 rounded-md">
          <h1 className="text-l font-semibold text-[#467D9A]">Messages</h1>
          <div className="flex items-center justify-between ">
          <IoSearchCircleSharp size={30} color="#467D9A" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full p-1 border border-gray-300 rounded outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
        </div>

        <div className="bg-white p-4 space-y-4 py-4 overflow-y-auto scrollbar-hide rounded-md" style={{height:'85vh'}}>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          ) : (
            <p className="text-gray-500">Not found</p>
          )}

        </div>
      </div>
    </main>
  );
};

export default Messages;
