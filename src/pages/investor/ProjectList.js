
//   const mappedProjects = (projects || []).map((project) => ({
//     id: project.projectUniqueId,
//     // logo: "https://placehold.co/50x50?text=Logo",
//     title: project.projectName,
//     description: project.projectDescription,
//     startDate: new Date(project.startDate).toLocaleDateString(),
//     // members: 3, // Placeholder number of members
//     // progress: project.approved ? 100 : 0,
//     pdfLink: project.uploadUrl || "https://example.com",
//   }));

//       <div className="flex-1 overflow-y-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
//           {mappedProjects.map((project) => (
//             <div
//               key={project.id}
//               className="bg-white border hover:border-primary cursor-pointer rounded-lg p-4 m-2 w-100"
//               onClick={() => handleCardClick(project)}
//             >
//               {/* <img src={project.logo} alt={project.title} /> */}
              
//               <h2 className="text-2xl mt-2 text-[#4B4949] font-bold">
//                 {project.title}
//               </h2>
//               <p className="text-xs font-semibold mt-2">{project.id}</p>
//               <p className="text-sm mb-2">{project.description}</p>
//               <p className="text-xs">
//                 Start Date:{" "}
//                 <span className="font-bold"> {project.startDate}</span>
//               </p>

//               <div className="flex items-center justify-between mt-2 gap-4">
//                 {/* <div className="w-2/4 bg-gray-200 rounded-full h-2.5"> */}
//                   {/* <div
//                     className="bg-[#70C3C3] h-2.5 rounded-full"
//                     style={{
//                       width: Math.min(Math.max(project.progress, 0), 100) + "%",
//                     }}
//                   ></div> */}
//                 {/* </div> */}

//                 {/* <div className="flex -space-x-2">
//                   {Array.from({ length: project.members }).map((_, index) => (
//                     <img
//                       key={index}
//                       src="https://placehold.co/20x20?text=Avatar"
//                       alt="Member Avatar"
//                       className="w-6 h-6 rounded-full border-2 border-white"
//                     />
//                   ))}
//                 </div> */}
//               </div>
//             </div>
//           ))}
//         </div>


import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableProjects } from "../../redux/actions/availableProjectActions";
import {
  FaArrowLeft,
  FaCaretLeft,
  FaCaretRight,
  FaSpinner,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import InvestModal from "./InvestModal";
import FurtherInfoModal from "./FurtherInfoModal";
import MeetingModal from "./MeetingModal";

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, projects, error, totalPages } = useSelector(
    (state) => state.availableProjects
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [isFurtherInfoModalOpen, setIsFurtherInfoModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const uniqueId = localStorage.getItem("uniqueId");

  useEffect(() => {
    dispatch(fetchAvailableProjects(currentPage, uniqueId));
  }, [dispatch, uniqueId, currentPage]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleProceed = () => {
    setIsProceedModalOpen(true);
  };

  const handleCloseProceedModal = () => {
    setIsProceedModalOpen(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-lg text-primary" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const mappedProjects = (projects || []).map((project) => ({
    id: project.projectUniqueId,
    title: project.projectName,
    description: project.projectDescription,
    startDate: new Date(project.startDate).toLocaleDateString(),
    pdfLink: project.uploadUrl || "https://example.com",
  }));

  return (
    <div className="p-4 h-screen bg-gray-100">
      <div className="mb-4 flex justify-between items-center px-4">
        <h1 className="text-2xl font-semibold text-primary">Projects List</h1>
        <div className="flex items-center justify-between gap-4 w-60">
          <div className="flex items-center w-full justify-between">
            <button
              onClick={handlePreviousPage}
              className={`bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 0}
            >
              <FaCaretLeft />
            </button>
            <span className="flex items-center text-xs ">
              {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary ${
                currentPage >= totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentPage >= totalPages - 1}
            >
              <FaCaretRight />
            </button>
          </div>

          <button
            onClick={handleBack}
            className="flex items-center bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {mappedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border hover:border-primary cursor-pointer rounded-lg p-4 m-2 w-100"
              onClick={() => handleCardClick(project)}
            >
              <h2 className="text-2xl mt-2 text-[#4B4949] font-bold">
                {project.title}
              </h2>
              <p className="text-xs font-semibold mt-2">{project.id}</p>
              <p className="text-sm mb-2">{project.description}</p>
              <p className="text-xs">
                Start Date:{" "}
                <span className="font-bold"> {project.startDate}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-3/4 h-[95vh] flex flex-col relative">
            <button
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-900 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              <IoMdCloseCircle />
            </button>
            <iframe
              title="projectPdf"
              src={selectedProject.pdfLink}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              className="flex-grow"
            />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={handleProceed}
              >
                Proceed
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isProceedModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-1/2 h-auto overflow-y-auto scrollbar-hide relative">
            <button
              className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-900 transition duration-300"
              onClick={handleCloseProceedModal}
            >
              <IoMdCloseCircle />
            </button>
            <div className="flex flex-col gap-4 p-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setIsMeetingModalOpen(true);
                }}
              >
                Request a Meeting
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setIsFurtherInfoModalOpen(true);
                }}
              >
                Request further Information
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setIsInvestModalOpen(true);
                }}
              >
                Invest
              </button>
            </div>
          </div>
        </div>
      )}
      {isInvestModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <InvestModal onClose={() => setIsInvestModalOpen(false)} />
        </div>
      )}
      {isFurtherInfoModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <FurtherInfoModal onClose={() => setIsFurtherInfoModalOpen(false)} />
        </div>
      )}
      {isMeetingModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <MeetingModal onClose={() => setIsMeetingModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ProjectList;