import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa";

const ResponseModal = ({ isOpen, onClose, response, error, loading }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center modal-background ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="bg-white rounded-md flex flex-col justify-center items-center p-8">
        {loading ? (
          <div className="flex flex-col items-center">
            <FaSpinner size={24} className="animate-spin" />
            <h2 className="text-lg font-semibold mb-4">Loading...</h2>
          </div>
        ) : response ? (
          <div className="flex flex-col items-center">
            <FaCheckCircle size={24} color="green" />
            <h2 className="text-lg font-semibold mb-4">
              Success!
            </h2>
            <p className="text-sm">
              {response?.payload?.message || "Project created successfully!"}
            </p>
            <button
              className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-md focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center">
            <FaExclamationCircle size={24} color="red" />
            <h2 className="text-lg font-semibold mb-4">Error</h2>
            <p className="text-sm">
              {error?.message || "Error creating project."}
            </p>
            <button
              className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-md focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ResponseModal;
