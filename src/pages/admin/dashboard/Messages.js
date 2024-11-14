import React, { useEffect, useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { fetchAllMessages } from "../../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Message = ({ message, onClick, isLast }) => {
  return (
    <>
      <div
        className="flex flex-col cursor-pointer p-2 hover:bg-gray-200"
        onClick={onClick}
      >
        <div className="flex items-start">
          <input
            type="checkbox"
            className="mr-2 mt-1 outline-none accent-[#467D9A] checked:bg-[#467D9A] checked:border-[#467D9A]"
          />
          <div>
            <h2 className="text-sm font-semibold">
              {message.notificationType}
            </h2>
            <p className="text-gray-600 text-xs leading-tight">
              {message.message || "No message content"}
            </p>
          </div>
        </div>
      </div>
      {!isLast && <hr className="my-2 border-gray-300" />}
    </>
  );
};

export const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allMessages = useSelector(
    (state) => state.admin.allMessages.data || []
  );

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true); 
      await dispatch(fetchAllMessages());
      setLoading(false); 
    };

    fetchMessages();
  }, [dispatch]);

  const filteredMessages = allMessages.filter((message) =>
    message.notificationType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMessageClick = (message) => {
    navigate(`/messages/${message.uniqueId || message.createdTime}`);
  };

  return (
    <main className="bg-gray-100 min-h-screen p-2">
      <div className="mx-auto p-2">
        <div className="bg-white flex items-center justify-between gap-3 px-4 py-2 mb-2 rounded-md">
          <h1 className="text-l font-semibold text-[#467D9A]">Messages</h1>
          <div className="flex items-center justify-between ">
            <IoSearchCircleSharp size={20} color="#467D9A" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full p-1 border border-gray-300 rounded outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div
          className="bg-white p-4 py-4 overflow-y-auto scrollbar-hide rounded-md"
          style={{ height: "85vh" }}
        >
          {loading ? ( 
            <div className="flex items-center justify-center text-[#467D9A] h-full">
              <FaSpinner className="animate-spin h-10" size={30} color="#467D9A" />
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((message, index) => (
              <Message
                key={message.uniqueId || message.createdTime}
                message={message}
                onClick={() => handleMessageClick(message)}
                isLast={index === filteredMessages.length - 1}
              />
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