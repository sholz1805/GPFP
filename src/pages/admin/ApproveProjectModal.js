import React, { useState } from "react";
import CloudinaryUpload from "../../redux/CloudinaryUpload";

const ApproveProjectModal = ({ open, onClose, projectId, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [reason, setReason] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image", "video", "application"];

    if (allowedTypes.includes(selectedFile.type.split("/")[0])) {
      setFile(selectedFile);
      setUploadStatus("");
      setUploadUrl("");
    } else {
      alert(
        "Unsupported file type. Please upload an image, video, PDF, or document."
      );
    }
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);
      try {
        const url = await CloudinaryUpload(file, "project_documents");
        setUploadUrl(url);
        setUploadStatus("success");
      } catch (error) {
        setUploadStatus("upload failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (uploadStatus === "success") {
      onSubmit({ projectUniqueId: projectId, reason, uploadUrl });
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <h2 className="text-sm font-semibold mb-4 text-primary text-gray-800">
          Approve Project
        </h2>
        <p className="text-gray-600 mb-4 leading-tight">
          Please upload the necessary document for approval.
        </p>

        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
          file:text-sm file:font-semibold file:bg-green-50 cursor-pointer mb-4 file:text-primary hover:file:bg-secondary-100"
        />

        {isLoading && (
          <p className="text-sm text-blue-500 mb-4">Uploading...</p>
        )}

        {uploadStatus && !isLoading && (
          <p
            className={`text-sm ${
              uploadStatus === "success" ? "text-green-500" : "text-red-500"
            } mb-4`}
          >
            {uploadStatus === "success"
              ? "Upload successful!"
              : "Upload failed. Please try again."}
          </p>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-xs text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`px-4 py-2 text-xs ${
              isLoading ? "bg-gray-400" : "bg-green-500"
            } text-white rounded-md hover:bg-green-600`}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploadStatus !== "success"}
            className={`ml-2 px-4 py-2 text-xs ${
              uploadStatus === "success" ? "bg-green-500" : "bg-gray-400"
            } text-white rounded-md hover:bg-green-600`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveProjectModal;
