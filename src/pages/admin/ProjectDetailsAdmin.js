import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { approveProject, fetchSingleProject, rejectProject } from '../../redux/actions/fetchSingleProjectActions';
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import ApproveProjectModal from './ApproveProjectModal';
import RejectProjectModal from './RejectProjectModal';
import FileViewer from 'react-file-viewer';

const ProjectDetailsAdmin = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { singleProject, loading, error } = useSelector((state) => state.singleProject);
  
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [docError, setDocError] = useState(null); // State for document loading errors

  useEffect(() => {
    dispatch(fetchSingleProject(projectId));
  }, [dispatch, projectId]);

  const handleApproveSubmit = async (data) => {
    await dispatch(approveProject(data));
  };

  const handleRejectSubmit = async (data) => {
    await dispatch(rejectProject(data));
  };

  const handleDownload = () => {
    // Implement download logic here
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-700">
      <FaSpinner />
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!singleProject) {
    return <div className="text-center text-gray-700">No project found</div>;
  }

  const documentUrl = singleProject.uploadUrl;
  const fileExtension = documentUrl && typeof documentUrl === 'string' 
    ? documentUrl.split('.').pop().toLowerCase() 
    : null;


  return (
    <div className="h-screen p-9 bg-white">
      <div className='flex justify-between items-center'>
        <h1 className="text-4xl font-bold mb-3 text-gray-800">{singleProject.projectName}</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
      <p className="text-gray-700 mb-6">{singleProject.projectDescription}</p>
      <div className="bg-green-50 p-4 rounded mb-4">
        <p className="text-gray-600"><span className='font-semibold text-primary'>Location:</span> {singleProject.location}</p>
        <p className="text-gray-600"><span className='font-semibold text-primary'>Start Date:</span> {new Date(singleProject.startDate).toLocaleDateString()}</p>
        <p className="text-gray-600"><span className='font-semibold text-primary'>Approved:</span> {singleProject.approved ? 'Yes' : 'No'}</p>
      </div>
      {documentUrl ? (
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Project Document</h2>
          {['pdf', 'png', 'jpeg', 'jpg'].includes(fileExtension) ? (
            <iframe 
              src={documentUrl} 
              width="100%" 
              height="600px" 
              title="Project Document"
              className="border rounded"
            >
              This browser does not support displaying PDFs or images. Please download the file to view it: 
              <a href={documentUrl} target="_blank" rel="noopener noreferrer">Download File</a>.
            </iframe>
          ) : fileExtension === 'docx' ? (
            <FileViewer
              fileType="docx" // Specify the file type for react-file-viewer
              filePath={documentUrl}
              onError={(error) => setDocError(error)} // Error handling
            />
          ) : (
            <div className="text-red-500 mt-2">Unsupported file type: {fileExtension}</div>
          )}
          {docError && <div className="text-red-500 mt-2">Error loading document: {docError.message}</div>}
        </div>
      ) : (
        <div className="text-gray-600">
          <span className='font-semibold text-primary'> Status: </span> Awaiting Approval
        </div>
      )}
      <div className="flex space-x-4 mt-4">
        <button onClick={() => setApproveModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">Approve Project</button>
        <button onClick={() => setRejectModalOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded">Reject Project</button>
        <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">Download</button>
      </div>

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