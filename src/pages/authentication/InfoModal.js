import React from 'react';
import { AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai';

const InfoModal = ({ isOpen, toggle, title, message, buttonText }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-md shadow-md p-4 w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            <AiFillInfoCircle size={24} /> {title}
          </h2>
          <button onClick={toggle} className="text-gray-500 hover:text-gray-700">
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="text-gray-600">
          <p>{message}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={toggle}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;