import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";

const ResponseModal = ({ isOpen, toggle, message, status, isLoading }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center justify-center">
          {isLoading ? (
            <>
            <FaSpinner size={24} className="animate-spin" />
            <p>Loading...</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {status === "success" ? (
                <FaCheckCircle size={24} color="green" />
              ) : (
                <FaExclamationCircle size={24} color="red" />
              )}
              <p className="text-sm font-semibold text-center">
                {status === "success"
                  ? "Successful!"
                  : "An Error Occurred"}
              </p>
              <p className="text-gray-500 mt-2 text-sm text-center leading-tight">
                {message}
              </p>
            </div>
          )}
          <button
            onClick={toggle}
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark mt-4"
          >
            OK
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

export default ResponseModal;
