import React from "react";
import { FaSpinner } from "react-icons/fa";

const ConfirmModal = ({ isOpen, onClose, onSubmit, loading }) => {
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
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to submit?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none"
                onClick={onClose}
              >
                No, Review
              </button>
              <button
                className={`bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-md focus:outline-none ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Yes, Proceed"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;