import React from 'react';
import { AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai';

const InfoModal = ({ isOpen, toggle, title, message, buttonText }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <AiFillInfoCircle className="text-red-500 text-4xl mb-3" />
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-gray-500 mt-2 text-center leading-tight">
            {message}
          </p>
          <button
            onClick={toggle}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark mt-4"
          >
            {buttonText}
          </button>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700 absolute top-0 right-0 m-4"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;