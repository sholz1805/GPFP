import React, { useState } from 'react';

const RejectProjectModal = ({ open, onClose, projectId, onSubmit, uploadUrl }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onSubmit({ projectUniqueId: projectId, reason, uploadUrl });
    console.log({ projectUniqueId: projectId, reason, uploadUrl })
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reject Project</h2>
        <p className="text-gray-600 mb-4">Project ID: <span className="font-semibold text-gray-800">{projectId}</span></p>
        
        <textarea
          placeholder="Reason for rejection"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectProjectModal;

