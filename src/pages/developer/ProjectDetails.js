import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSingleProject } from '../../redux/actions/fetchSingleProjectActions';
import { FaArrowLeft } from 'react-icons/fa';
import { FaSpinner } from "react-icons/fa6";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const { singleProject, loading, error } = useSelector((state) => state.singleProject);
  
  useEffect(() => {
    dispatch(fetchSingleProject(projectId));
  }, [dispatch, projectId]);
  
  if (loading) {
    return <div className=" flex justify-center items-center h-screen text-gray-700">
      <FaSpinner/>
    </div>;
  }
  
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!singleProject) {
    return <div className="text-center text-gray-700">No project found</div>;
  }

  return (
    <div className="h-screen p-9 bg-white">
     <div className='flex justify-between items-center'>

      <h1 className="text-4xl font-bold mb-3 text-gray-800">{singleProject.projectName}</h1>
      <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
        >
          < FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
      <p className="text-gray-700 mb-6">{singleProject.projectDescription}</p>
      <div className="bg-green-50 p-4 rounded mb-4">
        <p className="text-gray-600"><span className='font-semibold text-primary'>Location:</span> {singleProject.location}</p>
        <p className="text-gray-600"><span className='font-semibold text-primary'>Start Date:</span> {new Date(singleProject.startDate).toLocaleDateString()}</p>
        <p className="text-gray-600"><span className='font-semibold text-primary'>Approved:</span> {singleProject.approved ? 'Yes' : 'No'}</p>
      </div>
      {singleProject.uploadUrl ? (
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Project Document</h2>
          <iframe 
            src={singleProject.uploadUrl} 
            width="100%" 
            height="600px" 
            title="Project Document"
            className="border rounded"
          >
            This browser does not support PDFs. Please download the PDF to view it: 
            <a href={singleProject.uploadUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>.
          </iframe>
        </div>
      ) : (
        <div className="text-gray-600">
          <span className='font-semibold text-primary'>Status: </span >
          Awaiting Approval
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
