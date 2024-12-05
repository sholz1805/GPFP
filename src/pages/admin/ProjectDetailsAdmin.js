import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  approveProject,
  rejectProject,
} from "../../redux/actions/fetchSingleProjectActions";
import {
  FaArrowLeft,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaDownload,
} from "react-icons/fa"; // Importing icons
import ApproveProjectModal from "./ApproveProjectModal";
import RejectProjectModal from "./RejectProjectModal";
import FileViewer from "react-file-viewer";
import { fetchSingleProjectAdmin, removePdf } from "../../redux/actions/adminActions";
import jsPDF from "jspdf";

const ProjectDetailsAdmin = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const singleProject = useSelector((state) => state.admin.singleProjectAdmin);
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [docError, setDocError] = useState(null);

  const [removingPdf, setRemovingPdf] = useState(false);
  const [removePdfError, setRemovePdfError] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleProjectAdmin(projectId));
  }, [dispatch, projectId]);

  const handleApproveSubmit = async (data) => {
    await dispatch(approveProject(data));
  };

  const handleRejectSubmit = async (data) => {
    await dispatch(rejectProject(data));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(singleProject.projectName, 14, 22);

    doc.setFontSize(12);

    const projectDetails = [];

    for (const [key, value] of Object.entries(singleProject)) {
      if (
        ![
          "user",
          "isApproved",
          "isReviewed",
          "completionStatus",
          "createdAt",
        ].includes(key)
      ) {
        projectDetails.push({
          key: key.charAt(0).toUpperCase() + key.slice(1),
          value: value || "N/A",
        });
      }
    }

    doc.autoTable({
      head: [["Field", "Value"]],
      body: projectDetails.map((detail) => [detail.key, detail.value]),
      startY: 30,
    });

    doc.save(`${singleProject.projectName}_details.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!singleProject) {
    return <div className="text-center text-gray-700">No project found</div>;
  }

  const documentUrl = singleProject.uploadUrl;
  const fileExtension = documentUrl
    ? documentUrl.split(".").pop().toLowerCase()
    : null;

  const {
    user,
    isApproved,
    isReviewed,
    completionStatus,
    createdAt,
    ...projectDetails
  } = singleProject;

  const handleRemovePdf = async () => {
    setRemovingPdf(true);
    setRemovePdfError(null);
  
    try {
      await dispatch(removePdf(projectId));
      dispatch(fetchSingleProjectAdmin(projectId)); 
    } catch (error) {
      setRemovePdfError(error.message);
    } finally {
      setRemovingPdf(false);
    }
  };

  return (
    <div className="h-screen p-9 bg-white relative">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            {singleProject.projectName}
          </h1>
          <p className="text-primary text-sm font-semibold mb-6">
            {singleProject.projectUniqueId}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
      <p className="text-gray-700 mb-6">
        {singleProject.description || "No description available."}
      </p>

      <div className="bg-blue-50 p-4 rounded mb-4">
        <h2 className="text-xl font-semibold mb-2">Project Details</h2>
        {documentUrl ? (
          <div className="bg-gray-50 p-4 rounded mb-4">
            {["pdf", "png", "jpeg", "jpg"].includes(fileExtension) ? (
              <iframe
                src={documentUrl}
                width="100%"
                height="600px"
                title="Project Document"
                className="border rounded"
              >
                This browser does not support displaying PDFs or images. Please
                download the file to view it:
                <a href={documentUrl} target="_blank" rel="noopener noreferrer">
                  Download File
                </a>
                .
              </iframe>
            ) : fileExtension === "docx" ? (
              <FileViewer
                fileType="docx"
                filePath={documentUrl}
                onError={(error) => setDocError(error)}
              />
            ) : (
              <div className="text-red-500 mt-2">
                Unsupported file type: {fileExtension}
              </div>
            )}
            {docError && (
              <div className="text-red-500 mt-2">
                Error loading document: {docError.message}
              </div>
            )}
          </div>
        ) : (
          <>
            {Object.entries(projectDetails).map(([key, value]) => {
              if (typeof value === "object" && value !== null) {
                return (
                  <div key={key}>
                    <span className="font-semibold text-primary">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <div>
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <p key={subKey} className="text-gray-600">
                          <span className="font-semibold text-primary">
                            {subKey.charAt(0).toUpperCase() + subKey.slice(1)}:
                          </span>{" "}
                          {subValue}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              } else if (value) {
                return (
                  <p key={key} className="text-gray-600">
                    <span className="font-semibold text-primary">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>{" "}
                    {value}
                  </p>
                );
              }
              return null;
            })}
          </>
        )}
      </div>

      {!documentUrl && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
          <button
            onClick={() => setApproveModalOpen(true)}
            className="bg-primary text-white rounded-full p-4 flex items-center justify-center"
          >
            <FaCheck />
          </button>
          <button
            onClick={() => setRejectModalOpen(true)}
            className="bg-red-500 text-white rounded-full p-4 flex items-center justify-center"
          >
            <FaTimes />
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-500 text-white rounded-full p-4 flex items-center justify-center"
          >
            <FaDownload />
          </button>
        </div>
      )}

      {documentUrl && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
          <button
            onClick={handleRemovePdf}
            className="bg-red-500 text-white rounded-full p-4 flex text-xs items-center justify-center"
            disabled={removingPdf}
          >
            {removingPdf ? <FaSpinner className="animate-spin" /> : "Remove PDF"}
          </button>
          {removePdfError && (
            <div className="text-red-500 mt-2">{removePdfError}</div>
          )}
        </div>
      )}

      <ApproveProjectModal
        open={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        projectId={projectId}
        onSubmit={handleApproveSubmit}
      />
      <RejectProjectModal
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        projectId={projectId}
        onSubmit={handleRejectSubmit}
        uploadUrl="some-upload-url"
      />
    </div>
  );
};

export default ProjectDetailsAdmin;
