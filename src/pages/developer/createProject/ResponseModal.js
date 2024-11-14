import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner, FaTimes } from "react-icons/fa";

const ResponseModal = ({ isOpen, onClose, response, error, loading }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center modal-background ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="bg-white rounded-md flex flex-col justify-center items-center p-8 relative">
        {/* X icon positioned at the top-right corner */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {loading ? (
          <div className="flex flex-col items-center p-4">
            <FaSpinner size={24} className="animate-spin" />
            <h2 className="text-sm font-semibold mb-4">Loading...</h2>
          </div>
        ) : response ? (
          <div className="flex flex-col items-center">
            <FaCheckCircle size={24} color="green" />
            <h2 className="text-lg font-semibold mb-2">
              Success!
            </h2>
            <p className="text-sm">
              {response?.payload?.message || "Project created successfully!"}
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center">
            <FaExclamationCircle size={24} color="red" />
            <h2 className="text-lg font-semibold mb-2">Error!</h2>
            <p className="text-sm">
              {error?.message || "Error creating project"}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ResponseModal;
