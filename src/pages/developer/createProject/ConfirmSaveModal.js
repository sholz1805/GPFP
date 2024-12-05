import React from "react";

const ConfirmSaveModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
        Do you want to save your progress?
        </h2>
        {message.text && (
          <div
            className={`mb-4 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmSaveModal;
